// Signup Flow Testing

describe("Signup Step1: Check if there is one utility, it is seleted automatically", () => {
  it("Step1 page should have Zipcode and Utility inputs.", () => {
    cy.visit("/onboarding/step1");
    cy.get("#__next .content").contains("form");
    cy.get(".content form").should("have", "#postalCode");
    cy.get("#postalCode").should($el => {
      expect($el).to.be.empty;
    });
    cy.get(".content form").should("have", "#currentUtility");
    cy.get("#currentUtility")
      .find("input")
      .should($el => {
        expect($el).not.to.be.visible;
        expect($el).to.have.prop("disabled", true);
        expect($el).to.have.prop("readonly", true);
      });
    cy.get("#currentUtility")
      .find(".select__placeholder")
      .should("have.contain", "Select your utility");
  });

  it("Input Zipcode = 10128. Coned should be automatically selected as the utlility", () => {
    cy.get("#postalCode").type(10128);
    cy.wait(1500);
    cy.get("#currentUtility")
      .find(".select__value-container")
      .should("has.class", "select__value-container--has-value");
    cy.get("#currentUtility .select__value-container")
      .find(".select__option")
      .should($el => {
        expect($el).to.have.length(1);
        expect($el[0]).to.have.descendants("img.select__option-icon");
        expect($el[0]).to.have.contain("ConEd");
      });
    cy.get("#currentUtility")
      .find("input[name='currentUtility']")
      .should("have.value", "1");
  });

  it("Input Zipcode = 10128. Utility selector should have one utility", () => {
    cy.get("#postalCode").clear();
    cy.get("#postalCode").type(10128);
    cy.wait(1500);
    cy.get("#currentUtility").click();
    cy.get("#currentUtility")
      .find(".select__menu")
      .should("be.visible");
    cy.get("#currentUtility")
      .find(".select__menu-list")
      .should("be.visible");
    cy.get("#currentUtility .select__menu-list")
      .find(".select__option")
      .should($el => {
        expect($el).to.have.length(1);
        expect($el[0]).to.have.contain("ConEd");
        expect($el[0]).to.have.descendants("img.select__option-icon");
      });
  });
});

describe("Signup Step2: Check when multiple utilities are populated", () => {
  it("Step1 page should have Zipcode and Utility inputs.", () => {
    cy.visit("/onboarding/step1");
    cy.get("#__next .content").contains("form");
    cy.get(".content form").should("have", "#postalCode");
    cy.get("#postalCode").should($el => {
      expect($el).to.be.empty;
    });
    cy.get(".content form").should("have", "#currentUtility");
    cy.get("#currentUtility")
      .find("input")
      .should($el => {
        expect($el).not.to.be.visible;
        expect($el).to.have.prop("disabled", true);
        expect($el).to.have.prop("readonly", true);
      });
    cy.get("#currentUtility")
      .find(".select__placeholder")
      .should("have.contain", "Select your utility");
  });

  it("Input Zipcode = 02461. National Grid and Eversource should be populated as utilities", () => {
    cy.get("#postalCode").clear();
    cy.get("#postalCode").type("02461");
    cy.wait(1500);
    cy.get("#currentUtility").click();
    cy.get("#currentUtility")
      .find(".select__menu")
      .should("be.visible");
    cy.get("#currentUtility")
      .find(".select__menu-list")
      .should("be.visible");
    cy.get("#currentUtility .select__menu-list")
      .find(".select__option")
      .should($el => {
        expect($el).to.have.length(2);
        expect($el[0]).to.have.contain("National Grid");
        expect($el[0]).to.have.descendants("img.select__option-icon");
        expect($el[1]).to.have.contain("Eversource");
        expect($el[1]).to.have.descendants("img.select__option-icon");
      });
  });
});

describe("Signup Step3: Check signup with invalid email", () => {
  it("Step1 page should have FirstName, LastName and Email inputs.", () => {
    cy.visit("/onboarding/step1");
    cy.get("#__next .content").contains("form");
    cy.get(".content form").should("have", "#firstName");
    cy.get("#firstName").should($el => {
      expect($el).to.be.visible;
      expect($el).to.be.empty;
    });
    cy.get(".content form").should("have", "#lastName");
    cy.get("#lastName").should($el => {
      expect($el).to.be.visible;
      expect($el).to.be.empty;
    });
    cy.get(".content form").should("have", "#emailAddress");
    cy.get("#emailAddress").should($el => {
      expect($el).to.be.visible;
      expect($el).to.be.empty;
    });
  });

  it("While use an invalid email, user should not be able to go to the next step.", () => {
    cy.get("#postalCode").clear();
    cy.get("#postalCode").type("10128");
    cy.wait(1500);
    cy.get("#firstName").clear();
    cy.get("#firstName").type("AAA");
    cy.get("#lastName").clear();
    cy.get("#lastName").type("aaa");
    cy.get("#emailAddress").clear();
    cy.get("#emailAddress").type("aaa.com");
    cy.get(".content form")
      .find("button[type='submit']")
      .click();
    cy.wait(1500);
    cy.url().should("not.include", "/onboarding/step2");
    cy.url().should("include", "/onboarding/step1");
  });
});

describe("Signup Step4: Check signup when zipcode is out of region", () => {
  it("User should be moved to a 'Out of region page'", () => {
    cy.visit("/onboarding/step1");
    cy.get("#__next .content").contains("form");
    cy.get("#postalCode").clear();
    cy.get("#postalCode").type("9000");
    cy.wait(1500);
    cy.get("#firstName").clear();
    cy.get("#firstName").type("John");
    cy.get("#lastName").clear();
    cy.get("#lastName").type("Major");
    cy.get("#emailAddress").clear();
    cy.get("#emailAddress").type("a@badpassword.com");
    cy.get(".content form")
      .find("button[type='submit']")
      .click();
    cy.wait(1500);
    cy.url().should("not.include", "/onboarding/step1");
    cy.url().should("include", "/onboarding/sorry?next=true");
    cy.get(".content .heading .title").should($el => {
      expect($el).to.be.length(2);
      expect($el[1]).to.have.contain(
        "We don't have a project in your area at this time. Join our subscriber list and help us get one!"
      );
    });
    cy.get(".content form").find("#email");
    cy.get(".content form #email").should("be.visible");
  });
});
