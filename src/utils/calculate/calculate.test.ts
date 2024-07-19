import { expect, test, describe } from "vitest";
import { calculate } from "./calculate";

describe("utils: calculate", () => {
  test("Простое вычисление.", () => {
    expect(calculate("2*2")).toBe(4);
    expect(calculate("2+2-3")).toBe(1);
    expect(calculate("2/2*2")).toBe(2);
  });
  test("Вычисление со скобками.", () => {
    expect(calculate("(2+2)*3")).toBe(12);
    expect(calculate("2/(1-3)")).toBe(-1);
  });
  test("Вычисление процентов.", () => {
    expect(calculate("100-30%")).toBe(70);
    expect(calculate("100+30%")).toBe(130);
    expect(calculate("25*45%")).toBe(281.25);
    expect(calculate("100/10%")).toBe(10);
  });
  test("Вычисление корня.", () => {
    expect(calculate("√4")).toBe(2);
    expect(calculate("√9*3")).toBe(9);
    expect(calculate("√(2+2)")).toBe(2);
  });
  test("Обработка пустых значений.", () => {
    expect(calculate("")).toBe(0);
  });
  test("Обработка ввода процентов в начале строки", () => {
    expect(() => calculate("100%")).toThrowError(
      new Error("Неизвестная операция с процентами.")
    );
    expect(() => calculate("+100%")).toThrowError(
      new Error("Неизвестная операция с процентами.")
    );
    expect(() => calculate("√+100%")).toThrowError(
      new Error("Неизвестная операция с процентами.")
    );
  });
  test("Обработка деления на ноль.", () => {
    expect(() => calculate("1/0")).toThrowError(
      new Error("Делить на ноль нельзя.")
    );
  });
  test("Обработка незаконченного выражения.", () => {
    expect(() => calculate("2+")).toThrowError(
      new Error("Добавьте в конец число.")
    );
  });
  test("Обработка ввода последовательности математических операций.", () => {
    expect(calculate("1+2-3*10/10*4^0.5*√4")).toBe(-9);
    expect(calculate("10*((1^5-10)*10/5-25)/√1")).toBe(-430);
    expect(calculate("10*((1^5-10)*10/5-25)/√1/100%")).toBe(-430);
  });
  test("Обработка ввода неизвестного метода.", () => {
    expect(() => calculate("1000$")).toThrowError(
      new Error("Используется неизвестный математический оператор.")
    );
  });
  test("Обработка ввода чисел с плавующей запятой.", () => {
    expect(calculate("1000*0,001")).toBe(1);
    expect(calculate("1000*0.001")).toBe(1);
    expect(() => calculate("1000*0.0.01")).toThrowError(
      new Error("Разделитель у дробного числа должен быть один.")
    );
  });
});
