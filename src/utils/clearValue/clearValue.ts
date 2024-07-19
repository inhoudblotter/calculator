export function clearValue(value: string, validValues: string) {
  // функция удаляет невалидные символы и пробелы
  validValues = validValues
    .replace(/(\\d)|(0-9)/g, "DIGITS")
    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    .replace("DIGITS", "\\d");
  return value
    .replace(new RegExp(`[^${validValues}]+`, "g"), "")
    .trim()
    .replace(/\s+/, " ");
}
