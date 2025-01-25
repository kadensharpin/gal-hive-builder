// TODO: split canvas into its own file (and class?)
// TODO: make bases a class instead of a tuple
// TODO: make a Coordinates class that can convert between game coordinates, screen coordinates, and canvas coordinates
// TODO: add territory building
// TODO: add saving and sharing
// TODO: add instructions
// TODO: add marshal
// TODO: add better zoom controls

const SQUARE_WIDTH = 30;
const OFFSET = SQUARE_WIDTH * 4;
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d")!;

interface Array<T> {
  up(n: number): this;
  down(n: number): this;
  left(n: number): this;
  right(n: number): this;
}

Array.prototype.up = function (this: number[], n: number) {
  this.push(this[this.length - 2], this[this.length - 1] + n);
  return this;
};

Array.prototype.down = function (this: number[], n: number) {
  this.push(this[this.length - 2], this[this.length - 1] - n);
  return this;
};
Array.prototype.left = function (this: number[], n: number) {
  this.push(this[this.length - 2] - n, this[this.length - 1]);
  return this;
};
Array.prototype.right = function (this: number[], n: number) {
  this.push(this[this.length - 2] + n, this[this.length - 1]);
  return this;
};

// prettier-ignore
const capitolTerritory = [
  453, 549,
  453, 548,
  451, 548,
  451, 547,
  450, 547,
  450, 546,
  449, 546,
  449, 543,
  448, 543,
  448, 450,
  449, 450,
  449, 448,
  450, 448,
  450, 447,
  451, 447,
  451, 446,
  453, 446,
  454, 446,
  454, 445,
  547, 445,
  547, 445,
  547, 446,
  550, 446,
  550, 447,
  551, 447,
  551, 448,
  552, 448,
  552, 545,
  551, 545,
  551, 546,
  550, 546,
  550, 547,
  549, 547,
  549, 548,
  547, 548,
  547, 549,
];
const capitol = [499, 497];

const galTerritory = [474, 549]
  .right(73)
  .down(1)
  .right(2)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(35)
  .right(34)
  .down(1)
  .right(3)
  .down(1)
  .right(1)
  .down(1)
  .right(2)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(2)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(2)
  .down(1)
  .right(1)
  .down(1)
  .right(1)
  .down(1)
  .right(4)
  .down(1)
  .right(40)
  .up(1)
  .right(3)
  .up(1)
  .right(2)
  .up(1)
  .right(1)
  .up(1)
  .right(2)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(2)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(1)
  .right(1)
  .up(2)
  .right(1)
  .up(4)
  .left(1)
  .up(3)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(2)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(2)
  .left(1)
  .up(3)
  .left(1)
  .up(52)
  .left(1)
  .up(5)
  .left(1)
  .up(1)
  .left(1)
  .up(2)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(2)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(1)
  .up(1)
  .left(2)
  .up(1)
  .left(1)
  .up(1)
  .left(2)
  .up(1)
  .left(2)
  .up(1)
  .left(2)
  .up(1)
  .left(3)
  .up(1)
  .left(72)
  .down(1)
  .left(5)
  .down(2)
  .left(1)
  .down(2)
  .left(1)
  .down(14)
  .left(1)
  .down(2)
  .left(1)
  .down(2)
  .left(1)
  .down(1)
  .left(33)
  .down(2)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(1)
  .left(1)
  .down(5)
  .right(2)
  .down(2)
  .right(1);

// document.getElementById("share-button")!.addEventListener("click", () => {
//   navigator.clipboard.writeText(window.location.)
// })

canvas.addEventListener("wheel", (ev) => {
  if (ev.ctrlKey) {
    zoom(ev.deltaY > 0 ? 0.01 : -0.01);
  } else if (ev.shiftKey) {
    translate(ev.deltaY / 8, ev.deltaX / 8);
  } else {
    translate(ev.deltaX / 8, ev.deltaY / 8);
  }
});

const coordinateBuffer: string[] = ["_"];
window.addEventListener("keyup", (ev) => {
  const num = Number(ev.key);
  if (!isNaN(num)) {
    const current = coordinateBuffer[coordinateBuffer.length - 1];
    coordinateBuffer[coordinateBuffer.length - 1] =
      current.slice(0, -1) + num + "_";
  } else if (ev.code == "Enter") {
    coordinateBuffer[coordinateBuffer.length - 1] = coordinateBuffer[
      coordinateBuffer.length - 1
    ].slice(0, -1);
    if (coordinateBuffer.length == 2) {
      const [xPos, yPos] = coordinateBuffer.splice(0, 2);
      translateA(x(Number(xPos)), y(Number(yPos)));
    }
    coordinateBuffer.push("_");
  } else if (ev.code == "Backspace") {
    if (coordinateBuffer[0] === "_") {
      deleteSelectedBases();
    } else {
      const current = coordinateBuffer[coordinateBuffer.length - 1];
      coordinateBuffer[coordinateBuffer.length - 1] =
        current.slice(0, -2) + "_";
    }
  } else if (ev.code == "Escape") {
    coordinateBuffer.length = 0;
    coordinateBuffer.push("_");
  } else if (ev.code == "Delete") {
    if (coordinateBuffer[0] === "_") deleteSelectedBases();
  } else if (ev.code == "KeyA" && ev.ctrlKey) {
    for (let i = 0; i < bases.length; i++) {
      bases[i][3] = true;
    }
  }
});

window.addEventListener("keydown", (ev) => {
  let deltaX = 0;
  let deltaY = 0;
  if (ev.code === "ArrowUp") {
    deltaY = -SQUARE_WIDTH;
  } else if (ev.code === "ArrowDown") {
    deltaY = SQUARE_WIDTH;
  } else if (ev.code === "ArrowRight") {
    deltaX = SQUARE_WIDTH;
  } else if (ev.code === "ArrowLeft") {
    deltaX = -SQUARE_WIDTH;
  } else if (ev.ctrlKey) {
    if (ev.code == "Equal" || ev.code == "NumpadAdd") {
      zoom(0.2);
      ev.preventDefault();
      return;
    } else if (ev.code == "Minus" || ev.code == "NumpadSubtract") {
      zoom(-0.2);
      ev.preventDefault();
      return;
    }
    return;
  } else {
    return;
  }
  if (ev.ctrlKey) {
    deltaX *= 10;
    deltaY *= 10;
  }
  if (ev.shiftKey) {
    deltaX *= 10;
    deltaY *= 10;
  }
  translate(deltaX, deltaY);
});

let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", (ev) => {
  mouseX = ev.x;
  mouseY = ev.y;
});

let clickX: number | null = null;
let clickY: number | null = null;
canvas.addEventListener("mousedown", (ev) => {
  clickX = ev.x;
  clickY = ev.y;
});
const bases: [number, number, string, boolean][] = getBasesFromStorage();
canvas.addEventListener("mouseup", (ev) => {
  const [mouseDownX, mouseDownY] = getTranslatedPosition(clickX!, clickY!);
  clickX = null;
  clickY = null;
  const startX = X(mouseDownX);
  const startY = Y(mouseDownY);
  const [mouseUpX, mouseUpY] = getTranslatedPosition(ev.x, ev.y);
  const endX = X(mouseUpX);
  const endY = Y(mouseUpY);
  if (startX !== endX || startY !== endY) {
    finishSelection(startX, startY, endX, endY);
    return;
  }
  addBase(endX, endY);
});

function getBasesFromStorage() {
  const params = new URLSearchParams(window.location.search);
  let localStorageBases: [number, number, string, boolean][];
  try {
    localStorageBases = JSON.parse(localStorage.getItem("v0.0.1.bases")!);
    localStorageBases.map((el) => ((el[3] = false), el));
  } catch (error) {
    localStorageBases = [];
  }
  try {
    if (
      params.has("bases") &&
      (localStorageBases.length === 0 ||
        confirm("Clicking OK will overwrite your existing bases"))
    ) {
      return JSON.parse(params.get("bases")!);
    }
  } catch (error) {}
  return localStorageBases;
}

function finishSelection(x1: number, y1: number, x2: number, y2: number) {
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const maxX = Math.max(x1, x2);
  const maxY = Math.max(y1, y2);
  for (let i = 0; i < bases.length; i++) {
    const [x, y] = bases[i];
    bases[i][3] = x >= minX && x <= maxX && y >= minY && y <= maxY;
  }
}

function addBase(x: number, y: number) {
  if (x === 0 || x === 999 || y === 0 || y === 999) return;
  for (let i = 0; i < bases.length; i++) {
    const [baseX, baseY] = bases[i];
    if (Math.abs(x - baseX) < 3 && Math.abs(y - baseY) < 3) return;
  }
  const distanceToCapitol = distance(x, y, capitol[0], capitol[1]);
  bases.push([x, y, distanceToCapitol.toFixed(1), false]);
  localStorage.setItem("v0.0.1.bases", JSON.stringify(bases));
}

function deleteSelectedBases() {
  for (let i = 0; i < bases.length; i++) {
    const [_x, _y, _d, selected] = bases[i];
    if (selected) {
      bases.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem("v0.0.1.bases", JSON.stringify(bases));
}

function renderGrid() {
  if (scale < 0.2) {
    context.save();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(SQUARE_WIDTH * 1000, 0);
    context.lineTo(SQUARE_WIDTH * 1000, SQUARE_WIDTH * 1000);
    context.lineTo(0, SQUARE_WIDTH * 1000);
    context.closePath();
    context.lineWidth = 10;
    context.stroke();
    context.restore();
    return;
  }
  context.beginPath();
  for (let x = 0; x < 1001; x++) {
    context.moveTo(SQUARE_WIDTH * x, 0);
    context.lineTo(SQUARE_WIDTH * x, SQUARE_WIDTH * 1000);
  }
  for (let y = 0; y < 1001; y++) {
    context.moveTo(0, SQUARE_WIDTH * y);
    context.lineTo(SQUARE_WIDTH * 1000, SQUARE_WIDTH * y);
  }
  context.closePath();
  context.stroke();
}

function renderOutline(outline: number[], colour: string) {
  context.save();
  context.lineWidth = Math.min(10 / scale, 50);
  context.strokeStyle = colour;
  context.beginPath();
  context.moveTo(x(outline[0]), y(outline[1]));
  for (let i = 2; i < outline.length; i += 2) {
    context.lineTo(x(outline[i]), y(outline[i + 1]));
  }
  context.closePath();
  context.clip();
  context.stroke();
  context.restore();
}

function fillSquare(xPos: number, yPos: number, colour: string) {
  context.save();
  context.fillStyle = colour;
  context.fillRect(x(xPos), y(yPos), SQUARE_WIDTH, SQUARE_WIDTH);
  context.restore();
}

function renderCapitol() {
  // renders capitol outline
  renderOutline(capitolTerritory, "#FFC107");
  // renders capitol dot
  fillSquare(capitol[0], capitol[1], "#FFC107");
}

function renderMouseCoordinates() {
  const [mousex, mousey] = getTranslatedPosition(mouseX, mouseY);
  if (mousex > 0 && mousex < scale * SQUARE_WIDTH * 1000)
    if (mousey > 0 && mousey < scale * SQUARE_WIDTH * 1000)
      context.strokeText(`(${X(mousex)}, ${Y(mousey)})`, mousex, mousey);
}

function renderDragSelection() {
  if (clickX === null || clickY === null) return;
  const [x1, y1] = getTranslatedPosition(clickX, clickY);
  const [x2, y2] = getTranslatedPosition(mouseX, mouseY);

  context.save();
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x1, y2);
  context.lineTo(x2, y2);
  context.lineTo(x2, y1);
  context.closePath();
  context.fillStyle = "#2196f320";
  context.fill();
  context.strokeStyle = "#2196f3";
  context.stroke();
  context.restore();
}

function renderGoToBox() {
  if (coordinateBuffer[0] === "_") return;
  const [xPos, yPos] = getTranslatedPosition(10, canvas.height - 40);
  context.fillRect(xPos, yPos, 150, 30);
  context.save();
  context.fillStyle = "#fff";
  context.fillText(
    `x: ${coordinateBuffer[0]}, y: ${coordinateBuffer[1] ?? ""}`,
    xPos + 10,
    yPos + 20
  );
  context.restore();
}

function renderBases() {
  context.save();
  for (let i = 0; i < bases.length; i++) {
    const [xPos, yPos, distance, selected] = bases[i];
    context.beginPath();
    context.ellipse(
      x(xPos) + SQUARE_WIDTH / 2,
      y(yPos) + SQUARE_WIDTH / 2,
      SQUARE_WIDTH * 1.25,
      SQUARE_WIDTH * 1.25,
      0,
      0,
      360
    );
    context.closePath();
    context.fillStyle = "#000";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "#2196f3";
    if (selected) context.stroke();
    if (scale < 0.5) continue;
    context.fillStyle = "#fff";
    context.fillText(
      distance,
      x(xPos) + SQUARE_WIDTH / 2 - 10,
      y(yPos) + SQUARE_WIDTH / 2
    );
    context.fillText(
      `\nx: ${xPos}, y: ${yPos}`,
      x(xPos) + SQUARE_WIDTH / 2 - 32,
      y(yPos) + SQUARE_WIDTH / 2 + 10
    );
  }
  context.restore();
}

function render() {
  context.clearRect(
    -OFFSET,
    -OFFSET,
    scale * SQUARE_WIDTH * 1000 + 2 * OFFSET,
    scale * SQUARE_WIDTH * 1000 + 2 * OFFSET
  );
  context.scale(scale, scale);
  renderGrid();
  renderCapitol();
  renderOutline(galTerritory, "#2196F3");
  renderBases();
  context.scale(1 / scale, 1 / scale);
  renderMouseCoordinates();
  renderDragSelection();
  renderGoToBox();
  requestAnimationFrame(render);
}

requestAnimationFrame(render);

let translationX = 0;
let translationY = 0;
const MAX_X = () => scale * SQUARE_WIDTH * 1000 + OFFSET - canvas.width;
const MAX_Y = () => scale * SQUARE_WIDTH * 1000 + OFFSET - canvas.height;
function translateA(x: number, y: number) {
  translate(x - translationX, y - translationY);
}
function translate(deltaX: number, deltaY: number) {
  const beforeX = translationX;
  translationX = Math.round(
    Math.max(-OFFSET, Math.min(MAX_X(), translationX + deltaX))
  );
  const beforeY = translationY;
  translationY = Math.round(
    Math.max(-OFFSET, Math.min(MAX_Y(), translationY + deltaY))
  );
  context.translate(beforeX - translationX, beforeY - translationY);
}

function getTranslatedPosition(x: number, y: number): [number, number] {
  return [x + translationX, y + translationY];
}

setInterval(
  () => (window.location.hash = `${translationX},${translationY},${scale}`),
  500
);
setTimeout(() => {
  const [startX, startY, startScale] = window.location.hash.slice(1).split(",");
  zoom((Number(startScale) || 1) - scale);
  translateA(Number(startX) || 0, Number(startY) || 0);
});

let scale = 1;
function zoom(deltaZ: number) {
  let [x, y] = getTranslatedPosition(0, 0);
  x += mouseX;
  y += mouseY;
  x /= scale;
  y /= scale;
  scale = Math.max(0.05, Math.min(2.5, scale + deltaZ));
  translateA(0, 0);
  translateA(scale * x - mouseX, scale * y - mouseY);
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/** Translate game coords to JS coords */
function x(x: number): number {
  return x * SQUARE_WIDTH;
}

/** Translate JS coords to game coords */
function X(x: number) {
  return Math.floor(x / SQUARE_WIDTH / scale);
}

/** Translate game coords to JS coords */
function y(y: number): number {
  return (999 - y) * SQUARE_WIDTH;
}

/** Translate JS coords to game coords */
function Y(y: number): number {
  return 999 - Math.floor(y / SQUARE_WIDTH / scale);
}
