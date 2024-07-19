import { clearValue } from "../clearValue/clearValue";
import { extraChars } from "./config/extraChars";
import { operators } from "./config/operators";

export function prepare(str: string) {
  const passedChars = [
    ...Object.keys(extraChars),
    ...Object.keys(operators),
  ].join("");
  return clearValue(str, `0-9.,${passedChars}`);
}
