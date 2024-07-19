describe("Вывод результата", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document()
        .find("textarea", { timeout: 3000 })
        .invoke("val", "(√((1+1)*2))^2")
        .then(() => {
          cy.document().get("textarea").type("=");
        });
    });
  });
  it("Выводится верный результат.", () => {
    cy.document()
      .get("#root > main > div > div > span")
      .should("have.text", "4");
  });
});
