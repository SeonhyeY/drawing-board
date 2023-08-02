const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // brush
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const lineWidth = document.querySelector('.line-width');
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

const color = document.querySelector('.color');
const colorOptions = document.querySelectorAll('.color-option');

const modeBtn = document.querySelector('.mode-btn');
const clearBtn = document.querySelector('.clear-btn');
const eraseBtn = document.querySelector('.erase-btn');

const fileInput = document.querySelector('.image');
const textInput = document.querySelector('.text');

let isPainting = false;
let isFilling = false;
let filledColor = 'white';

// eventListenters & functions
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('dblclick', onDoubleClick);

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

function onDoubleClick(event) {
  const text = textInput.value;
  if (text === '') {
    return;
  }
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '48px serif';
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

lineWidth.addEventListener('change', onLineWidthChange);

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

color.addEventListener('change', onColorChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorHex = event.target.dataset.color;
  ctx.strokeStyle = colorHex;
  ctx.fillStyle = colorHex;
  color.value = colorHex;
}

modeBtn.addEventListener('click', onModeClick);
clearBtn.addEventListener('click', onClearClick);
eraseBtn.addEventListener('click', onEraseClick);
fileInput.addEventListener('change', onFileChange);

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerHTML = '🎨 Change BG Color';
  } else {
    isFilling = true;
    modeBtn.innerHTML = '🖌️ To Draw';
  }
}

function onClearClick() {
  ctx.fillStyle = filledColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick() {
  ctx.strokeStyle = filledColor;
  isFilling = false;
  modeBtn.innterHTML = 'Fill';
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
