import Router from "next/router";

export default function routeUser(user) {
  const { query } = Router;
  localStorage.setItem(
    "username",
    JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName
    })
  );
  localStorage.setItem("leadId", user?.leadId);
  localStorage.setItem("email", user?.email);

  // retrieve utility information
  const utility = user?.milestones?.utility;
  const imageName = utility?.replace(/\s/g, "") || false;
  const utilityInfo = {
    image: {
      src: imageName
        ? `/static/images/utilities/${imageName}.png`
        : "/static/images/utilities/placeholder.png",
      altText: "Utility logo"
    },
    label: utility
  };

  localStorage.setItem("utility", JSON.stringify(utilityInfo));

  // retrieve postalcode
  if (user?.milestones?.address?.postalCode) {
    const postalCode = user?.milestones?.address?.postalCode;
    localStorage.setItem("postalCode", JSON.stringify(postalCode));
  }

  const storedBillingMethod = JSON.parse(localStorage.getItem("billingMethod"));

  if (
    (utility?.paperOnly || user?.milestones?.utilityPaperOnly) &&
    !storedBillingMethod
  ) {
    localStorage.setItem("billingMethod", JSON.stringify("paper"));
  } else if (query.affiliate && !storedBillingMethod) {
    localStorage.setItem("billingMethod", JSON.stringify("online"));
  }

  const userStillNeedstoAddPwd =
    !user?.milestones?.bankInfoCompleted && user?.isAnonymous;

  const userStillNeedsToAddUtilityInfo = !user?.milestones
    ?.utilityInfoCompleted;

  const userStillNeedstoAddBankInfo =
    (user?.milestones?.utilityInfoCompleted &&
      user?.milestones?.utilityLoginSuccessful) ||
    !user?.milestones?.bankInfoCompleted;

  const userStillNeedsToAddAddressInfo =
    user?.milestones?.utilityInfoCompleted &&
    !user?.milestones?.addressInfoCompleted;

  const manualOnboarding = query.next;

  // forward to the right page
  if (user.signupCompleted) {
    Router.push({
      pathname: "/dashboard"
    });
  } else {
    if (userStillNeedsToAddUtilityInfo && !manualOnboarding) {
      Router.push({
        pathname: "/onboarding/step2",
        query: {
          onboardingNotFinished: true
        }
      });
    } else if (userStillNeedsToAddAddressInfo && !manualOnboarding) {
      Router.push({
        pathname: "/onboarding/step4.2",
        query: {
          onboardingNotFinished: true
        }
      });
    } else if (userStillNeedstoAddPwd && !manualOnboarding) {
      Router.push({
        pathname: "/onboarding/step5",
        query: {
          onboardingNotFinished: true
        }
      });
    } else if (userStillNeedstoAddBankInfo && !manualOnboarding) {
      Router.push({
        pathname: "/onboarding/step7",
        query: {
          onboardingNotFinished: true
        }
      });
    }
  }
}
