import { hexToColor } from "./color.js";
import { CanvasText } from "./text.js";
import { Equation } from "./equation.js";

export class Editor {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.equation = new CanvasText(100, 100, "4*x");
    this.equation.hasBackground = false;
    this.equation.padding = 0;

    this.mode = "N"; // N = Normal, I = Insert, M = Manip
    this.modeText = new CanvasText(100, this.canvas.height, "Normal");
    this.modeText.fontColor = 0x282a36ff;
    // this.parsedEquations = [
    //   newNode(
    //     "MUL",
    //     newAtom("NUM", 4),
    //     newNode("POW", newAtom("VAR", "x"), newAtom("NUM", "2"))
    //   ),
    //   newAtom("NUM", "640"),
    // ]; // 4x=640
    this.parseEquation();
  }

  processKey(e) {
    switch (this.mode) {
      case "N":
        this.processNormalKey(e);
        break;
      case "I":
        this.processInsertKey(e);
        break;
      case "M":
        this.processManipKey(e);
        break;
      default:
        console.log("What mode is this anyway?", this.mode);
    }
    this.draw();
  }
  parseEquation() {
    let equation = new Equation(this.equation.text);
    let parsed = equation.parse();
    if (parsed !== undefined) this.parsedEquations = parsed;
    console.log(equation.equations, equation.tokens, this.parsedEquations);
  }
  processManipKey(e) {
    if (e.ctrlKey && e.key == "c") {
      this.mode = "N";
    }
    switch (e) {
    }
  }
  processNormalKey(e) {
    switch (e.key) {
      case "i":
        this.mode = "I";
        break;
      case "m":
        this.mode = "M";
        break;
    }
  }
  processInsertKey(e) {
    if (e.ctrlKey && e.key == "c") {
      this.mode = "N";
      this.parseEquation();
    } else {
      switch (e.key) {
        case "ArrowLeft":
          this.equation.moveCursor(-1);
          break;
        case "ArrowRight":
          this.equation.moveCursor(1);
          break;
        case "Backspace":
          this.equation.removeCharacter();
          break;
        default: // normal typing key
          if (e.key.length == 1) this.equation.addCharacter(e.key);
          break;
      }
    }
  }

  getModeNameAndColor(mode) {
    switch (mode) {
      case "N":
        return ["NORMAL", 0x50fa7bff];
      case "I":
        return ["INSERT", 0x8be9fdff];
      case "M":
        return ["MANIP", 0xffb86cff];
      default:
        return ["ERROR", 0xff5555ff];
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = hexToColor(this.modeText.fontColor);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "48px RobotoMono";
    this.ctx.fillStyle = hexToColor(0xf8f8f2ff);
    if (this.mode == "N" || this.mode == "M") {
      this.drawEquation(100, 100);
    } else if (this.mode == "I") {
      // this.ctx.fillText(this.equation, 100, 100);
      this.equation.draw(this.ctx, true);
      this.equation.drawCursor(this.ctx);
    }
    [this.modeText.text, this.modeText.backgroundColor] =
      this.getModeNameAndColor(this.mode);
    this.modeText.draw(this.ctx, true);
  }
  drawEquation(x, y) {
    // if (this.parsedEquations.length > 1) this.parsedEquations.shift();
    // console.log(this.parsedEquations);
    for (let i = 0; i < this.parsedEquations.length; i++) {
      let expression = this.parsedEquations[i];
      this.drawExpression(x + 120 * i, y, expression);
    }
  }
  drawExpression(x, y, expression) {
    // console.log(expression);
    switch (expression.internalType) {
      case "Atom":
        return this.drawAtom(x, y, expression);
      case "Node":
        return this.drawNode(x, y, expression);
    }
  }
  drawAtom(x, y, atom) {
    this.ctx.fillText(atom.value, x, y);
    return this.ctx.measureText(atom.value).width;
  }
  drawNode(x, y, node) {
    let leftWidth = this.drawExpression(x, y, node.left);
    let operatorWidth = 0;
    {
      if (node.op.type != "STAR")
        operatorWidth = this.drawOperator(x + leftWidth, y, node.op);
    }
    let rightWidth = this.drawExpression(
      x + leftWidth + operatorWidth,
      y,
      node.right
    );
    return leftWidth + operatorWidth + rightWidth;
  }
  drawOperator(x, y, operator) {
    let symbol = "";
    switch (operator.type) {
      case "PLUS":
        symbol = "+";
        break;
      case "MINUS":
        symbol = "−";
        break;
      case "STAR":
        symbol = "⋅";
        break;
      case "SLASH":
        symbol = "÷";
        break;
    }
    this.ctx.fillText(symbol, x, y);
    return this.ctx.measureText(symbol).width;
  }
}
