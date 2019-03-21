import React from "react";
import LogoIcon from "./Icons/LogoIcon";
import ProfilePic from "./ProfilePic";

export default class Header extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <header>
        {this.props.first ? <LogoIcon /> : <LogoIcon small />}
        {!this.props.first && (
          <div className="bubble">
            <ProfilePic
              image={{
                src: "/static/images/people/scott.jpg",
                altText: "A smiling girl"
              }}
            />
          </div>
        )}
        <style jsx>{`
          header {
            position: relative;
            width: 100%;
            border-bottom: 1px solid var(--color-secondary);
            padding: 0 1.25rem;
            margin-bottom: 2.2rem;
          }

          .bubble {
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translateY(50%);
          }
        `}</style>
      </header>
    );
  }
}
