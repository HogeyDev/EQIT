import { Tokenizer } from "./tokenizer.js";
import { RDParser } from "./rdparser.js";

export class Equation {
  constructor(equation = "") {
    this.equations = equation.split("=");
    this.tokens = [];
  }
  parse() {
    let parsed = [];
    for (let equation of this.equations) {
      let tokens = new Tokenizer(equation).tokenize();
      this.tokens.push(...tokens);
      parsed.push(new RDParser(tokens).parse());
    }
    return parsed;
  }
}
