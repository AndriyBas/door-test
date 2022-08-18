// Welcome to the test suit for Doorstead!

describe("Input test", () => {
  beforeEach(() => {
    cy.visit("https://doorstead-v3.webflow.io/");
  });

  it("displays the placeholder by default", () => {
    cy.get("input.autocomplete-input#autocomplete2").should(
      "have.attr",
      "placeholder",
      "Enter your property address"
    );
  });

  it("Should display multi-apartment address '960 pine str'", () => {
    cy.get("input.autocomplete-input#autocomplete2").type("960 pine str");

    cy.get("ul.autocomplete-menu li div")
      .first()
      .invoke("text")
      .should("match", /\d+ more entries/i);

    cy.get("ul.autocomplete-menu li div").first().parent().click().wait(1000);

    cy.get("ul.autocomplete-menu li div")
      .first()
      .invoke("text")
      .should("match", /960 Pine St Apt \d+ San Francisco/i);
  });
});
