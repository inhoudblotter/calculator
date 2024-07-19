describe("Ввод символов", () => {
  beforeEach(() => {
    cy.visit("/").then(() => {
      cy.document().find("textarea", { timeout: 6000 }).should("be.visible");
    });
  });
  it("При нажатии на кнопку C", () => {
    let values = "";
    cy.document()
      .find("#root > main > div > div > div > button")
      .each((btn) => {
        if (btn.text() && /(×)?(√)?[0-9*^(),+\-%/]+/.test(btn.text())) {
          cy.document()
            .find("#root > main > div > div > div > button")
            .contains(
              new RegExp(
                `^${btn.text().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}$`
              )
            )
            .click();
          values += btn.text();
        }
      })
      .then(() => {
        cy.document().get("textarea").should("contain.value", values);
      });
  });
});
