import { expect, test, describe, suite } from "vitest";
import { clearValue } from "./clearValue";

describe("utils: clearValue", () => {
  test("Значение очищается от невалидных символов", () => {
    expect(clearValue("adsfasdf420√", "\\d√")).toBe("420√");
  });
  suite("Значение очищается от лишних пробелов", () => {
    test("Удаляет в начале и в конце строки", () => {
      expect(clearValue("  000  ", "0-9")).toBe("000");
    });
    test("Удаляет между символами", () => {
      expect(clearValue("00  0", "\\d")).toBe("000");
    });
    test("Удаляет дубликаты пробелов после очистки невалидных символов", () => {
      expect(clearValue("00 a 0", "\\d")).toBe("000");
    });
  });
});
