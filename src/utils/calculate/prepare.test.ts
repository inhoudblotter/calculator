import { describe, expect, test } from "vitest";
import { prepare } from "./prepare";

describe("utils: calculate/prepare", () => {
  test("Очистка ввода от лишних символов", () => {
    expect(prepare("aaaa")).toBe("");
    expect(prepare("aa00aa")).toBe("00");
    expect(prepare("aaa100%aaa*100")).toBe("100%*100");
    expect(prepare("DaAA100%aaa*100")).toBe("100%*100");
  });
});
