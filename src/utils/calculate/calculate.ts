import { extraChars } from "./config/extraChars";
import { operators } from "./config/operators";
import { IOperator } from "./types/IOperator";

export function calculate(str: string) {
  const numbers: number[] = [];
  const actions: IOperator[] = [];
  let tempNum = "";
  function addNum() {
    if (!tempNum || tempNum === "-")
      throw new Error("Математический оператор должен стоять после числа.");
    if (/[.,].?[.,]/.test(tempNum))
      throw new Error("Разделитель у дробного числа должен быть один.");
    numbers.push(Number(tempNum));
    tempNum = "";
  }
  function backPropagation(threshold: number = -Infinity) {
    for (let i = actions.length; --i >= 0; ) {
      const action = actions[i];
      if (action.order <= threshold) {
        break;
      }
      if (i > 0 && action.order > actions[i - 1].order) {
        let acc: number | null = null;
        for (let n = i - 1; ++n < numbers.length - 1; ) {
          acc = actions[n].func(acc || numbers[n], numbers[n + 1]);
        }
        numbers.splice(i);
        actions.splice(i, actions.length - i);
        if (acc) numbers.push(acc);
      } else if (i === 0) {
        let acc: number | null = null;
        for (let n = -1; ++n < numbers.length - 1; ) {
          acc = actions[n].func(acc || numbers[n], numbers[n + 1]);
        }
        numbers.splice(0, numbers.length);
        actions.splice(0, actions.length);
        if (!acc) throw new Error("Чисел для вычеслений не хватило.");
        numbers.push(acc);
      }
    }
  }
  for (const key in extraChars) {
    if (new RegExp(`[${key}]`).test(str))
      str = extraChars[key as keyof typeof extraChars](str);
  }
  for (let s = -1; ++s < str.length; ) {
    const symbol = str[s];
    if (isNaN(Number(symbol))) {
      if (/[.,]/.test(symbol)) {
        tempNum += ".";
        continue;
      }
      if (symbol === " ") continue;
      if (symbol === "-" && !tempNum) {
        tempNum = "-";
        continue;
      }
      addNum();

      const newAction = operators[symbol];
      if (!newAction)
        throw new Error("Используется неизвестный математический оператор.");

      backPropagation(newAction.order);

      actions.push(newAction);
    } else tempNum += symbol;
  }
  if (!tempNum && actions.length) throw new Error("Добавьте в конец число.");
  if (!tempNum) return 0;
  addNum();

  backPropagation();
  if (numbers.length !== 1) throw new Error("Логическая ошибка.");
  return Math.floor(numbers[0] * 10e7) / 10e7;
}
