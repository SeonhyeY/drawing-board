const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // brush
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const lineWidth = document.querySelector('.line-width');
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

let isPainting = false;
let isFilling = false;

function onCanvasClick() {
  if (!isFilling) {
    return;
  } else {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    filledColor = ctx.fillStyle;
  }
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

lineWidth.addEventListener('change', onLineWidthChange);

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
