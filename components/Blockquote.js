import React from 'react';

export default class Blockquote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.cite && (
          <blockquote>
            <img
              src={this.props.cite.image.src}
              srcSet={this.props.cite.image.srcSet}
              alt={`${this.props.cite.name} profile image`}
            />
            <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
              <text
                transform="translate(-134 -11)"
                fill="var(--color-primary)"
                fillRule="evenodd"
                fontFamily="Montserrat-Medium, Montserrat"
                fontSize="54"
                fontWeight="400"
              >
                <tspan x="132.268" y="52">
                  “
                </tspan>
              </text>
            </svg>
            <p>{this.props.cite.text}</p>
          </blockquote>
        )}
        {this.props.cite && (
          <cite>
            {this.props.cite.name} - {this.props.cite.city},{' '}
            {this.props.cite.state}
          </cite>
        )}
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 290px;
            margin: 0 auto;
          }

          blockquote {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
          }

          blockquote p {
            text-align: center;
            margin-top: 0;
            margin-bottom: 2em;
          }

          blockquote svg {
            margin: 1.4em 0;
          }

          cite {
            font-family: var(--font-primary);
            font-size: 12px;
            font-weight: 800;
            font-style: normal;
            line-height: 1.2em;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: var(--color-primary);
          }
        `}</style>
      </div>
    );
  }
}
