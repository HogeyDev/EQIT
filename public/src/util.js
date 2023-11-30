export function isNumber(s) {
  return !isNaN(s - parseFloat(s));
}
export function isAlpha(c) {
  try {
    return c.toLowerCase() != c.toUpperCase();
  } catch {
    // console.log(`'${c}' is not an alphabetic character.`);
    return false;
  }
}
export function isSpace(c) {
  return /\s/.test(c);
}
