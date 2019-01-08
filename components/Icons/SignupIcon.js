import React from 'react';

export default class DiscountIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="wrapper">
        <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFF">
            <path d="M24.9368871 22.293129c0 1.6987226-.3980516 2.6626936-2.0967742 3.1451613-.1883826-2.2221613-2.07547096-3.9624838-4.3401129-3.9624838s-4.15182258 1.7404903-4.3401129 3.9624838c-1.69872258-.4824258-2.0967742-1.4464387-2.0967742-3.1451613 0-1.9706322 1.57258065-4.63429029 3.83730645-5.89235481-.92224516-.75517419-1.50950967-1.9084-1.50950967-3.18688709 0-2.26472581 1.84532903-4.11009678 4.11009677-4.11009678 2.26472581 0 4.11009675 1.84532903 4.11009675 4.11009678 0 1.27936774-.5872645 2.43267742-1.50950965 3.18688709C23.3646419 17.65965645 24.9372226 20.322371 24.9372226 22.293129h-.0003355z" />
            <path d="M18.5 22.6290323c-1.76095484 0-3.20827419 1.4259742-3.20827419 3.2082742 0 1.7822997 1.44725645 3.186887 3.20827419 3.186887s3.1868871-1.4259741 3.1868871-3.186887c0-1.7617726-1.4259742-3.2082742-3.1868871-3.2082742zm1.29983226 3.627629h-.86001291v.8600129c0 .2309806-.18838258.4406583-.44065806.4406583-.23098064 0-.44065806-.1883828-.44065806-.4406583v-.8600129h-.86001291c-.23098064 0-.44065806-.1883826-.44065806-.4406581 0-.2309806.18838258-.440658.44065806-.440658h.86001291v-.8600129c0-.2309807.18838258-.4406581.44065806-.4406581.23098065 0 .44065806.1883826.44065806.4406581v.8600129h.86001291c.23098064 0 .44065806.1883825.44065806.440658-.02129484.2514452-.20967742.4406581-.44065806.4406581z" />
          </g>
        </svg>
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 2.3rem;
            height: 2.3rem;
            margin: 0;
            background-color: var(--color-primary);
            font-weight: 700;
            border-radius: 50%;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }
        `}</style>
      </span>
    );
  }
}
