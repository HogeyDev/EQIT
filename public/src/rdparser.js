import { newToken, newAtom, newNode } from "./objects.js";

export class RDParser {
  // crafting interpreters
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }
  peek(offset = 0) {
    return this.get(this.index + offset);
  }
  isAtEnd() {
    return this.peek().type == "EOF";
  }
  previous() {
    return this.peek(-1);
  }
  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type == type;
  }
  match(...types) {
    for (let type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }
  get(index = this.index) {
    if (index < 0 || index >= this.tokens.length) return newToken();
    return this.tokens[index];
  }
  advance() {
    this.index++;
    return this.tokens[this.index];
  }
  previous() {
    return this.get(this.index - 1);
  }

  parse() {
    return this.expression();
  }
  expression() {
    return this.term();
  }
  term() {
    let expr = this.factor();

    while (this.match("MINUS", "PLUS")) {
      let operator = this.previous();
      let right = this.factor();
      expr = newNode(operator, expr, right);
    }

    return expr;
  }
  factor() {
    let expr = this.unary();

    while (this.match("STAR", "SLASH")) {
      console.log("found a factor");
      let operator = this.previous();
      let right = this.unary();
      expr = newNode(operator, expr, right);
    }

    return expr;
  }
  unary() {
    if (this.match("BANG", "MINUS")) {
      let operator = this.previous();
      let right = this.unary();
      return newNode(operator, right);
    }

    return this.atom();
  }
  atom() {
    this.advance();
    return newAtom(this.previous().type, this.previous().value);
  }
}
