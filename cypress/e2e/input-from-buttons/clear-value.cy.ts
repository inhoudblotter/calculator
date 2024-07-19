describe("Очистка значения", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document()
        .find("textarea", { timeout: 6000 })
        .then(() => {
          cy.get("body")
            .type("2+2")
            .then(() => {
              cy.get("textarea").should("contain.value", "2+2");
            });
        });
    });
  });
  it("При нажатии на кнопку C", () => {
    cy.document()
      .find("#root > main > div > div > div > button")
      .contains("C")
      .click()
      .then(() => {
        cy.document().get("textarea").should("contain.value", "");
      });
  });
});
