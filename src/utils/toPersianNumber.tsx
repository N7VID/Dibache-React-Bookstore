export function toPersianNumber(number: number) {
  const formattedNumber = number.toLocaleString("en-US");
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return formattedNumber.replace(
    /\d/g,
    (digit) => persianDigits[Number(digit)]
  );
}
