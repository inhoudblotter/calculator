describe("Вычисление уравнений", () => {
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
  it("При нажатии на кнопку Enter", () => {
    cy.document()
      .get("body")
      .type("{enter}")
      .then(() => {
        cy.document()
          .get("#root > main > div > div > span")
          .should("contain.text", "4");
      });
  });
  it("При нажатии на кнопку =", () => {
    cy.document()
      .get("body")
      .type("=")
      .then(() => {
        cy.document()
          .get("#root > main > div > div > span")
          .should("contain.text", "4");
      });
  });
});
