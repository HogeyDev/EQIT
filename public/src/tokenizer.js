import { newToken } from "./objects.js";
import { isNumber, isAlpha, isSpace } from "./util.js";

export class Tokenizer {
  constructor(equation = "") {
    this.equation = equation;

    this.index = 0;
    this.currentChar = this.equation[this.index];
    this.currentToken = newToken("");
  }
  4;
  tokenize() {
    let tokenList = [];
    let i = 0;
    while ((this.currentToken = this.getNextToken()).type != "EOF") {
      tokenList.push(this.currentToken);
      i++;
    }
    return tokenList;
  }
  getNextToken() {
    this.skipWhitespace();
    let token = newToken();

    if (this.index >= this.equation.length) return token;

    if (isNumber(this.currentChar)) {
      return this.parseNumber();
    }
    if (isAlpha(this.currentChar)) {
      return this.parseVariable();
    }
    switch (this.currentChar) {
      case "(":
        token.type = "LPAREN";
        token.value = "(";
        break;
      case ")":
        token.type = "RPAREN";
        token.value = ")";
        break;
      case "+":
        token.type = "PLUS";
        token.value = "+";
        break;
      case "-":
        token.type = "MINUS";
        token.value = "-";
        break;
      case "*":
        token.type = "STAR";
        token.value = "*";
        break;
      case "/":
        token.type = "SLASH";
        token.value = "/";
        break;
      case "=":
        token.type = "EQUALS";
        token.value = "=";
        break;
      default:
        throw new Error(
          "Could not find way to tokenize character: '" + this.currentChar + "'"
        );
    }

    this.index++;
    this.currentChar = this.equation[this.index];

    return token;
  }
  parseNumber() {
    let ret = "";
    while (isNumber((this.currentChar = this.equation[this.index]))) {
      ret += this.currentChar;
      this.index++;
    }
    return newToken("NUM", ret);
  }
  parseVariable() {
    let name = this.currentChar;
    let subscript = "";
    this.index++;
    this.currentChar = this.equation[this.index];

    // if (isNumber(this.currentChar)) {
    // 	// has a subscript
    // 	subscript = this.parseNumber().value;
    // }
    return newToken("VAR", name + subscript);
  }
  skipWhitespace() {
    while (isSpace(this.currentChar)) {
      this.index++;
      this.currentChar = this.equation[this.index];
    }
  }
}
