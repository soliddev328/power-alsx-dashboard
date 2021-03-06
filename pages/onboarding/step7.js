import { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import RadioCard from "../../components/RadioCard";
import SingleStep from "../../components/SingleStep";
import Button from "../../components/Button";

function Step7() {
  const router = useRouter();

  useEffect(() => {
    global.analytics.page("Step 7");
  }, []);

  return (
    <main>
      <Header />
      <SingleStep title="Going forward, instead of paying your utility you will pay Common Energy a lower amount for your electricity:">
        <Formik
          initialValues={{
            paymentMethod: ""
          }}
          onSubmit={values => {
            localStorage.setItem("paymentMethod", JSON.stringify(values));
            router.push({
              pathname: "/onboarding/step8",
              query: {
                next: true
              }
            });
          }}
        >
          {props => (
            <Form>
              <RadioCard
                number="3"
                name="paymentMethod"
                value="manualBanking"
                heading="Automatic Payment via ACH"
                content="Receive an additional $25 credit with automatic deductions from your bank account"
                highlight="$25 credit"
              />
              <RadioCard
                number="1"
                name="paymentMethod"
                value="automatic"
                heading="Automatic Payment via Bank Link"
                content="Receive an additional $25 credit with automatic deductions from your bank account"
                highlight="$25 credit"
              />
              <RadioCard
                number="2"
                name="paymentMethod"
                value="creditCard"
                heading="Credit Card"
                content="A 2.9% processing fee is applied to cover transaction costs."
                highlight="2.9%"
              />
              <Button primary disabled={!!props.values.paymentMethod !== true}>
                Next
              </Button>
              <p className="small">
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.9952011 10.470321c0-.92422-.7617776-1.67188-1.7018596-1.67032h-.5030834l-.0015915-3.9382c-.0023882-2.682-2.2256466-4.863999-4.957474-4.861799C4.0985501.002346 1.876979 2.184401 1.876979 4.865601l.0023882 3.9382h-.1775076C.7625723 8.806145 0 9.553801 0 10.475681l.0039798 5.853999C.0039798 17.25156.7657573 18 1.7058393 18l10.5923011-.00625C13.2374277 17.99375 14 17.24609 14 16.32343l-.0047989-5.853109zm-10.2882666-1.6664l-.0023883-3.9382c-.0023862-1.69376 1.4017601-3.0718 3.1259332-3.0742 1.7257401 0 3.1298028 1.37812 3.1322481 3.0704l.0023863 3.9382-6.2581793.0038z"
                    fill="#2479FF"
                    fillRule="evenodd"
                  />
                </svg>
                All your information is 128 bit encrypted
              </p>
            </Form>
          )}
        </Formik>
      </SingleStep>
      <style jsx>{`
        main {
          display: block;
          height: 88vh;
          max-width: 700px;
          margin: 0 auto;
        }
        p.small {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        p svg {
          margin-right: 10px;
        }

        @media (max-width: 1024px) {
          main {
            padding: 0 15px;
          }
        }
      `}</style>
    </main>
  );
}

export default Step7;
