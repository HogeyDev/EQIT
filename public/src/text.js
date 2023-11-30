import { hexToColor } from "./color.js";

export class CanvasText {
  constructor(x, y, text = "") {
    this.text = text;
    this.cursorPosition = this.text.length;
    this.padding = 4;
    this.backgroundColor = 0xff0000ff;
    this.hasBackground = true;
    this.fontColor = 0xf8f8f2ff;

    this.x = x;
    this.y = y;
  }
  removeCharacter() {
    this.text =
      this.text.slice(0, this.cursorPosition - 1) +
      this.text.slice(this.cursorPosition);
    this.moveCursor(-1);
  }
  addCharacter(c) {
    this.text =
      this.text.slice(0, this.cursorPosition) +
      c +
      this.text.slice(this.cursorPosition);
    this.moveCursor(1);
  }
  moveCursor(offset) {
    if (this.cursorPosition + offset < 0) {
      this.cursorPosition = 0;
    } else if (this.cursorPosition + offset >= this.text.length) {
      this.cursorPosition = this.text.length;
    } else {
      this.cursorPosition += offset;
    }
  }
  draw(ctx, useBottom = false) {
    let metrics = ctx.measureText(this.text);
    let height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    let x = this.x + this.padding;
    let y;
    if (useBottom) {
      y = this.y - this.padding;
    } else {
      y = this.y + this.padding * 2 + height;
    }
    ctx.fillStyle = hexToColor(this.backgroundColor);
    if (this.hasBackground) {
      ctx.fillRect(
        this.x,
        this.y - height - this.padding * 2,
        metrics.width + this.padding * 2,
        height + this.padding * 2
      );
    }
    ctx.fillStyle = hexToColor(this.fontColor);
    ctx.fillText(this.text, x, y);
  }
  drawCursor(ctx) {
    let textWidth = ctx.measureText(
      this.text.slice(0, this.cursorPosition)
    ).width;
    let heightMetrics = ctx.measureText("0");
    let textHeight =
      heightMetrics.actualBoundingBoxAscent +
      heightMetrics.actualBoundingBoxDescent;
    ctx.fillRect(100 + textWidth + 1, 100 - textHeight - 2, 2, textHeight + 4);
  }
}
