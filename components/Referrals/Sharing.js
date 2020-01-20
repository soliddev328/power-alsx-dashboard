import Button from "../../components/Button";
import SegmentedInput from "../../components/SegmentedInput";
import ReferralsList from "../../components/Dashboard/ReferralsList";

const FacebookShare = username => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https%3A//www.commonenergy.us/referrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

const TwitterShare = username => {
  window.open(
    `https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.commonenergy.us%2Freferrals?advocate=${username}`,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=600"
  );
};

function Sharing() {
  return (
    <div className="sharing">
      <div className="sharing-actions">
        <div className="email">
          <SegmentedInput
            hasBorder
            inputLabel="Enter Your Friends' Email Addresses Here"
            buttonText="send"
          />
        </div>
        <div className="social">
          <Button
            maxWidth="65px"
            style={{
              height: "50px"
            }}
            secondary
            transparent
            share="facebook"
            onClick={() => {
              FacebookShare(userData.username);
              global.analytics.track("Referral Link Clicked", {
                Platform: "Facebook"
              });
            }}
          />
          <Button
            maxWidth="65px"
            style={{
              height: "50px"
            }}
            secondary
            transparent
            share="twitter"
            onClick={() => {
              TwitterShare(userData.username);
              global.analytics.track("Referral Link Clicked", {
                Platform: "Twitter"
              });
            }}
          />
        </div>
        <div className="link">
          <SegmentedInput buttonText="Copy Referral Link" referral hasBorder />
        </div>
      </div>
      <div className="sharing-list">
        <ReferralsList />
      </div>
      <style jsx>{`
        .sharing-actions {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr;
          align-items: center;
        }

        .social {
          display: flex;
          padding: 0 1em;
        }

        @media (max-width: 700px) {
          .sharing-actions {
            grid-template-columns: 1fr;
            justify-content: center;
          }
          .social {
            padding-top: 2em;
            padding-bottom: 1em;
          }
        }
      `}</style>
    </div>
  );
}

export default Sharing;
