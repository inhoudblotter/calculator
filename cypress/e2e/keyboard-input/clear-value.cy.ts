describe("Очистка значения в поле ввода", () => {
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
  it("При нажатии Esc значение очищается.", () => {
    cy.document()
      .get("body")
      .type("{esc}")
      .then(() => {
        cy.document().get("textarea").should("contain.value", "");
      });
  });
  it("При нажатии на Backspace стирается последний символ.", () => {
    cy.document()
      .get("body")
      .type("{backspace}")
      .then(() => {
        cy.document().get("textarea").should("contain.value", "2+");
      });
  });
});
