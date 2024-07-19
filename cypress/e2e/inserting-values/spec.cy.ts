describe("Вставка значений", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document().find("textarea", { timeout: 3000 }).should("be.visible");
    });
  });
  it("В поле ввода", () => {
    cy.document()
      .get("textarea")
      .invoke("val", "2+2")
      .should("contain.value", "2+2");
  });
  it("Находясь на странице", () => {
    cy.document()
      .get("body")
      .invoke("val", "2+2")
      .should("contain.value", "2+2");
  });
});
