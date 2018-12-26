import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import CTA from './CTA';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

const getNavStates = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('doing');
    } else {
      styles.push('todo');
    }
  }
  return { current: indx, styles: styles };
};

const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showNextBtn: true
    };
  } else if (currentStep === 0) {
    return {
      showNextBtn: true
    };
  } else {
    return {
      showNextBtn: false
    };
  }
};

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);

    this.state = {
      values: props.initialValues,
      page: 0,
      navState: getNavStates(0, this.props.steps.length)
    };

    this.validationSchema = [
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().required('Email is required')
      }),
      Yup.object().shape({
        mobilePhone: Yup.string().required('Phone is required')
      }),
      Yup.object().shape({
        address: Yup.string().required('Address is required'),
        postalCode: Yup.string().required('Postal Code is required'),
        utility: Yup.string().required('Utility is required')
      }),
      Yup.object().shape({
        termsAndConditions: Yup.string().required(
          'Please accept terms and conditions'
        )
      }),
      Yup.object().shape({
        utilityUserName: Yup.string().required('Utility user name is required'),
        utilityPassword: Yup.string().required('Utility password is required')
      }),
      Yup.object().shape({
        paymentMethod: Yup.string().required('Please choose a payment method')
      })
    ];
  }

  previous = () => {
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));
  };

  next = values => {
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
    this.setNavState(this.state.page);
  };

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  setNavState = next => {
    this.setState({
      navState: getNavStates(next, this.props.steps.length)
    });
    if (next < this.props.steps.length) {
      this.setState({ page: next });
    }
    this.setState(checkNavState(next, this.props.steps.length));
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      this.next(values);
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  };

  handleKeyDown = evt => {
    if (evt.which === 13) {
      this.next();
    }
  };

  handleOnClick = evt => {
    if (
      evt.currentTarget.value === this.props.steps.length - 1 &&
      this.state.page === this.props.steps.length - 1
    ) {
      this.setNavState(this.props.steps.length);
    } else {
      this.setNavState(evt.currentTarget.value);
    }
  };

  getClassName = (className, i) => {
    return className + '-' + this.state.navState.styles[i];
  };

  renderSteps = () => {
    return this.props.steps.map((s, i) => (
      <li
        className={this.getClassName('steplist', i)}
        onClick={this.handleOnClick}
        key={i}
        value={i}
      >
        {/* <span
          className={`steplist__step ${this.getClassName('steplist__step', i)}`}
        >
          {i + 1}
          {this.state.navState.current === i && ` / ${this.props.steps.length}`}
        </span> */}
        <p className="steplist__name">{this.props.steps[i].name}</p>
        <style jsx>{`
          li {
            position: relative;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            flex: 0 0 auto;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            pointer-events: none;
          }

          li:before,
          li:after {
            position: absolute;
            top: 30%;
            width: 40px;
            height: 2px;
            background-color: var(--color-secondary);
          }

          li:before {
            left: -5%;
          }

          li:after {
            right: -23%;
          }

          li:first-child:before {
            content: none;
          }

          li:last-child:after {
            content: none;
          }

          .steplist__step {
            display: none;
            justify-content: center;
            position: relative;
            width: 2.4em;
            height: 2.4em;
            line-height: 2.2em;
            margin: 0.65em 1.5em;
            background-color: var(--color-bg-primary);
            color: var(--color-secondary);
            font-weight: 700;
            font-feature-settings: 'tnum';
            border: 2px solid var(--color-secondary);
            border-radius: 50%;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }

          .steplist__name {
            display: block;
            width: 100vw;
            margin-bottom: 5px;
            position: absolute;
            left: 50%;
            bottom: 0;
            text-align: center;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 200ms ease-in;
          }

          .steplist-doing .steplist__name {
            opacity: 0.5;
          }

          .steplist__step-doing {
            margin-top: 5px;
            margin-bottom: 0;
            width: 3.2em;
            height: 3.2em;
            line-height: 3.1em;
            border-color: var(--color-primary);
          }

          .steplist__step:before {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 130%;
            height: 130%;
            background-color: var(--color-secondary);
            transform: translate(-50%, -50%);
            opacity: 0;
          }

          .steplist__step:after {
            position: absolute;
            left: 50%;
            opacity: 0;
            transform: translateX(-50%);
            content: url('/static/icon/check.svg');
          }

          .steplist__step-done.steplist__step:after,
          .steplist__step-done.steplist__step:before {
            opacity: 1;
          }
        `}</style>
      </li>
    ));
  };

  renderErrors(errors) {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      return;
    } else {
      return errors[Object.keys(errors)[0]];
    }
  }

  shouldBeDisabled(errors) {
    return !(Object.keys(errors).length === 0 && errors.constructor === Object);
  }

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        <div className="steplist__wrapper">
          <ul
            className="steplist"
            // style={{
            //   transform: `translateX(-${75 * this.state.page}px)`,
            //   transition: 'transform ease-out 0.45s'
            // }}
          >
            {this.renderSteps()}
          </ul>
        </div>
        <Formik
          initialValues={values}
          enableReinitialize={false}
          validationSchema={this.validationSchema[page]}
          onSubmit={this.handleSubmit}
          render={({
            values,
            handleSubmit,
            isSubmitting,
            dirty,
            handleReset,
            errors,
            touched
          }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                {activePage}
                <p className="error">{this.renderErrors(errors)}</p>
                {!isLastPage && (
                  <Button
                    arrow
                    primary
                    onClick={this.next}
                    disabled={this.shouldBeDisabled(errors) || !dirty}
                  >
                    Next step
                  </Button>
                )}
                {page > 0 && !isLastPage && (
                  <CTA type="button" onClick={this.previous}>
                    Back
                  </CTA>
                )}
                {isLastPage && (
                  <React.Fragment>
                    <Button arrow primary onClick={this.next}>
                      Finish!
                    </Button>
                    <CTA onClick={this.next}>Skip this step</CTA>
                  </React.Fragment>
                )}
              </form>
            </React.Fragment>
          )}
        />

        <style jsx>{`
          .steplist {
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-family: var(--font-primary);
            list-style: none;
            padding: 0;
            margin: 0;
            height: 2.5em;
          }

          form {
            width: 305px;
            margin: 0 auto;
          }

          .steplist__wrapper {
            background-color: var(--color-bg-primary);
          }

          .error {
            height: 1em;
            font-size: 0.7rem;
            color: var(--color-error);
            margin-top: 0;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Wizard;
