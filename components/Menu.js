import { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "./MenuItem";
import Text from "./Text";
import CONSTANTS from "../globals";
import { withFirebase } from "../firebase";
import { useStateValue } from "../state";

const { API } =
  CONSTANTS.NODE_ENV !== "production" ? CONSTANTS.dev : CONSTANTS.prod;

function MainMenu(props) {
  const [accounts, setAccounts] = useState([]);
  const [{ selectedAccount }, dispatch] = useStateValue();

  const signOut = props => {
    props.firebase.doSignOut();
  };

  const getUserData = async (userUid, idToken) => {
    const { data } = await axios.get(`${API}/v1/subscribers/${userUid}`, {
      headers: {
        Authorization: idToken
      }
    });
    return data?.data;
  };

  useEffect(() => {
    props.firebase.doUpdateUser(async (user, idToken) => {
      const userData = await getUserData(user.id, idToken);

      userData?.accounts?.forEach((item, index) => {
        setAccounts(prevState => [
          ...prevState,
          {
            value: index,
            label: item.name
          }
        ]);
      });
    });
  }, []);

  return (
    <ul>
      <li>
        <MenuItem to="/dashboard">Home</MenuItem>
      </li>
      <li>
        <MenuItem>Your Project</MenuItem>
      </li>
      <li>
        <MenuItem>Your Impact</MenuItem>
      </li>
      <li>
        <MenuItem>Referrals</MenuItem>
      </li>
      <li>
        <MenuItem>Profile</MenuItem>
      </li>

      {accounts.length >= 2 && (
        <li className="account-selector">
          <Text small noMargin>
            Your Accounts
          </Text>
          <select
            name="account"
            className="custom-select"
            placeholder={accounts[selectedAccount.value].label}
            onChange={item => {
              dispatch({
                type: "changeSelectedAccount",
                newValue: { value: item.target.value }
              });
            }}
          >
            {accounts.map((account, index) => (
              <option value={index} key={`account-${index}`}>
                {account.label}
              </option>
            ))}
          </select>
        </li>
      )}

      <li className="sign-out">
        <button onClick={() => signOut(props)}>Sign out</button>
      </li>

      <style jsx>{`
        button {
          border: none;
          background: none;
          padding: 0;
          color: #2479ff;
          cursor: pointer;
        }
        ul {
          position: relative;
          list-style: none;
          padding: 0;
          margin: 0;
          height: calc(100vh - 128px);
        }
        .account-selector {
          margin-top: 50px;
        }
        .sign-out {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
        }

        @media (max-width: 1024px) {
          .sign-out {
            bottom: 100px;
          }
        }
      `}</style>
      <style jsx global>{`
        .select__label {
          pointer-events: none;
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2479ff;
          letter-spacing: 0.7px;
          left: 1.5em;
          text-transform: capitalize;
          z-index: 11;
        }

        .select__wrapper {
          position: relative;
          height: 3.75rem;
          width: 100%;
          max-width: 350px;
          margin: 0.5rem auto;
        }

        .select__control {
          height: 100%;
          border: none;
          border-radius: 3px;
        }

        .select__placeholder {
          color: #000;
          font-weight: 700;
        }

        .select__value-container {
          padding: 0 1em;
          position: relative;
        }

        .select__indicator-separator {
          display: none;
        }

        .select__dropdown-indicator {
          color: #2479ff;
        }

        .select__value-container .select__option {
          position: absolute;
        }

        .select__menu {
          z-index: 1000 !important;
        }

        .select__option {
          display: flex !important;
          align-items: center;
          font-weight: 700;
        }

        .select__option-icon {
          display: inline-block;
          width: 30px;
          margin-right: 1em;
          background-color: #fff;
        }

        .select__placeholder {
          color: hsl(0, 0%, 20%);
          margin-left: 2px;
          margin-right: 2px;
          max-width: calc(100% - 8px);
          overflow: hidden;
          position: absolute;
          text-overflow: ellipsis;
          white-space: nowrap;
          top: 50%;
          transform: translateY(-50%);
          box-sizing: border-box;
        }
      `}</style>
    </ul>
  );
}

export default withFirebase(MainMenu);
