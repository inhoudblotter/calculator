import { IOperator } from "../types/IOperator";

export const operators: { [key: string]: IOperator } = {
  "+": { order: 1, func: (a, b) => a + b },
  "-": { order: 1, func: (a, b) => a - b },
  "/": {
    order: 2,
    func: (a, b) => {
      if (b === 0) throw new Error("Делить на ноль нельзя.");
      return a / b;
    },
  },
  "*": { order: 2, func: (a, b) => a * b },
  "×": { order: 2, func: (a, b) => a * b },
  "^": { order: 3, func: (a, b) => Math.pow(a, b) },
};
