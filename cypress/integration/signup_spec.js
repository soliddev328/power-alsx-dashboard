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
      .find('input[name="currentUtility"]')
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
