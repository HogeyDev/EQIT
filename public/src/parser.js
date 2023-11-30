export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
    this.currTok = this.tokens[this.index];
  }
  next(n = 1) {
    this.currTok = this.peek(n);
    this.index += n;
  }
  peek(n = 1) {
    if (this.index + n >= this.tokens.length) return { type: "EOF", value: "" };
    return this.tokens[this.index + n];
  }
  parse() {
    let tree = newNode();
    while (this.currTok.type != "EOF") {
      if (this.currTok.type == "VAR" && this.peek().type == "STAR") {
        console.log("Matched VAR and STAR as coefficient");
        let node = newNode();
        node.op = "MUL";
        node.left = this.currTok.value;
        this.next();
        this.next();
        node.right = this.currTok.value;
        this.next();
      } else if (this.currTok.type == "EQUALS") {
        console.log("Matched EQUALS as equation");
        // equation
        let node = newNode();
        node.op = "EQ";
        node.left = tree;
        tree = node;
        this.next();
      } else if (this.currTok.type == "NUM") {
        console.log("Matched NUM as number");
        let node = newNode();
        this.next();
      } else {
        // wtf is this thing???
        throw new Error(
          "Could not parse tokens: " +
            JSON.stringify(this.tokens) +
            "\n\nIndex: " +
            this.index +
            "\n"
        );
      }
    }
    return tree;
  }
}
