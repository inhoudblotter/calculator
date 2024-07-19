describe("Ввод значений с клавиатуры.", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document().find("textarea", { timeout: 3000 }).should("be.visible");
    });
  });
  it("Ввод чисел.", () => {
    const numbers = "0987654321";
    cy.document()
      .get("body")
      .type(numbers)
      .then(() => {
        cy.document().get("textarea").should("contain.value", numbers);
      });
  });
  it("Ввод допустимых символов.", () => {
    const symbols = "*^()+-×√%/";
    cy.document()
      .get("body")
      .type(symbols)
      .then(() => {
        cy.document().get("textarea").should("contain.value", symbols);
      });
  });
  it("Ввод недопустимых символов.", () => {
    const symbols = "asdфыв$#\\";
    cy.document()
      .get("body")
      .type(symbols)
      .then(() => {
        cy.document().get("textarea").should("contain.value", "");
      });
  });
});
