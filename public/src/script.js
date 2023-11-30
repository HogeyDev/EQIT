import { Editor } from "./editor.js";

function main() {
  let editor = new Editor();

  document.onkeydown = (e) => {
    if (!(e.key == "r" && e.ctrlKey)) e.preventDefault();
    editor.processKey(e);
    // console.log(editor.equation);
  };

  let i = 0;
  let drawingInterval = setInterval(function () {
    if (i == 2) window.clearInterval(drawingInterval);
    i++;
    editor.draw();
  }, 20);
}

window.onload = preload;

function preload() {
  let robotoMonoFont = new FontFace(
    "RobotoMono",
    "url(res/Roboto_Mono/static/RobotoMono-Regular.ttf)"
  );
  let jbmFont = new FontFace(
    "JetBrainsMono",
    "url(res/JetBrains_Mono/static/JetBrainsMono-Regular.ttf)"
  );
  document.fonts.add(robotoMonoFont);
  document.fonts.add(jbmFont);

  main();
}
