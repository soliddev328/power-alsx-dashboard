import LogoIcon from "./Icons/LogoIcon";
import ProfilePic from "./ProfilePic";

export default function Header({ first }) {
  return (
    <header>
      {first ? <LogoIcon medium /> : <LogoIcon small />}
      {!first && (
        <div className="bubble">
          <ProfilePic
            image={{
              src: "/static/images/people/martin.jpg",
              altText: "A smiling girl"
            }}
          />
        </div>
      )}
      <style jsx>{`
        header {
          position: relative;
          width: 100%;
          border-bottom: 1px solid #41ef8b;
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
