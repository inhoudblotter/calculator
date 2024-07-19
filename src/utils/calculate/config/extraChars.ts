import { calculate } from "../calculate";

export const extraChars = {
  "()": (str: string) => {
    const stack: number[] = [];
    let i = 0;
    while (i < str.length) {
      const k = str[i];
      if (k === "(") {
        if (i > 0 && /[\d,.]/.test(str[i - 1]))
          throw new Error(
            "Добавьте математический оператор перед открывающей скобкой."
          );
        stack.push(i);
      } else if (k === ")") {
        const openingBracket = stack.pop();
        if (typeof openingBracket === "undefined")
          throw new Error("Не поставлена открывающая скобка.");
        if (i < str.length - 1 && /[\d,.]/.test(str[i + 1]))
          throw new Error(
            "Добавьте математический оператор после закрывающей скобкой."
          );
        const slice = str.slice(openingBracket, i + 1);
        const result = calculate(slice.slice(1, slice.length - 1)).toString();
        str = str.replace(slice, result);
        i -= slice.length - result.length;
      }
      ++i;
    }
    if (stack.length) throw new Error("Не поставлена закрывающая скобка.");
    return str;
  },
  "%": function (str: string) {
    if (/\(.+\)/.test(str)) str = this["()"](str);
    for (const match of str.matchAll(
      /\d+([.,]\d+)?\s*[+-]\s*\d+([.,]\d+)?\s*%/g
    )) {
      const percent = match[0].match(/[+-]\s*\d+([.,]\d+)?\s*%/)?.[0];
      if (!percent) throw new Error("Логическая ошибка.");
      str = str.replace(
        percent,
        `*${calculate(
          `1${percent[0]}${percent.match(/\d+([.,]\d+)?/)?.[0]}/100`
        )}`
      );
    }
    for (const match of str.matchAll(
      /\d+([.,]\d+)?\s*[/*]\s*\d+([.,]\d+)?\s*%/g
    )) {
      const expression = match[0];
      const digits = expression.matchAll(/\d+([.,]\d+)?/g);
      const quantity = digits.next().value;
      const percent = digits.next().value;
      const action = expression.match(/[/*]/)?.[0];
      let result: string | null = null;
      if (action === "/") {
        result = calculate(
          `${quantity}${action}(${quantity}*${percent}/100)`
        ).toString();
      } else if (action === "*") {
        result = calculate(
          `${quantity}*(${quantity}/100)*${percent}`
        ).toString();
      }
      if (!result) throw new Error(`Не добавлен обработчик для ${action}.`);
      str = str.replace(expression, result);
    }
    if (/%/g.test(str)) throw new Error("Неизвестная операция с процентами.");
    return str;
  },
  "√": function (str: string) {
    if (/\(.+\)/.test(str)) str = this["()"](str);
    for (const match of str.matchAll(/√\s*\d+([.,]\d+)?/g)) {
      str = str.replace(match[0], match[0].slice(1) + "^0.5");
    }
    if (/√/.test(str))
      throw new Error(
        "Корень можно извлечь только от числа или выражения в скобках."
      );
    return str;
  },
};
