describe("Вывод результата", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document()
        .find("textarea", { timeout: 3000 })
        .then(() => {
          cy.document().get("body").type("2/0=");
        });
    });
  });
  it("Выводится верный результат.", () => {
    cy.document()
      .get("#root > main > div > div > span")
      .should("have.text", "Делить на ноль нельзя.");
  });
});
