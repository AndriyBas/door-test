// Welcome to the test suit for Doorstead!

describe("Input test", () => {
  beforeEach(() => {
    cy.visit("https://doorstead-v3.webflow.io/");

    // intercep regular requests, NOT selected
    //   https://us-autocomplete-pro.api.smartystreets.com/lookup?&key=114303733343874592&search=960%20Pine%20St%20Apt&selected=
    cy.intercept("GET", /\/lookup\?.*selected=$/i, { fixture: "smarty.json" });
    // intercept selected requests (with "more entries")
    //   https://us-autocomplete-pro.api.smartystreets.com/lookup?&key=114303733343874592&search=960%20Pine%20St%20Apt&selected=960%20Pine%20St%20Apt%20(12)%20San%20Francisco%20CA%2094108
    cy.intercept("GET", /\/lookup\?.*selected=.+/i, {
      fixture: "smarty_selected.json",
    });
  });

  it("Displays the placeholder by default", () => {
    cy.get("#autocomplete2").should(
      "have.attr",
      "placeholder",
      "Enter your property address"
    );
  });

  it("Should display multi-apartment address '960 pine str'", () => {
    // used this address cos it's multi-apartment
    cy.get("#autocomplete2").type("960 pine str");
    cy.get("ul.autocomplete-menu li div")
      .first()
      .invoke("text")
      .should("match", /\d+ more entries/i);
    cy.get("#autocomplete2+ul")
      .contains("li", "more entries")
      .click()
      .wait(1000);
    cy.get("ul.autocomplete-menu li div")
      .first()
      .invoke("text")
      .should("match", /960 Pine St Apt \d+ San Francisco/i);
    cy.get("#autocomplete2+ul li").first().click();
    cy.get("#autocomplete2")
      .invoke("val")
      .should("match", /960 Pine St Apt \d+ San Francisco/i);
  });
});
