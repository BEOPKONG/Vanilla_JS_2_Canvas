const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("js-controls_color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".js-controls_btn_fill");
const current_mode = document.querySelector(".js-current_mode");
const save = document.querySelector(".js-controls_btn_save");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function handleSave() {
  const imageURL = canvas.toDataURL("image/PNG");
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "Success";
  link.click();
}

function handleCM(event) {
  event.preventDefault();
}

function handleModeChange(event) {
  if (filling) {
    mode.innerText = "Change to Fill";
    current_mode.innerHTML = "Status : Paint";
    filling = false;
  } else {
    mode.innerText = "Change to Paint";
    current_mode.innerHTML = "Status : Fill";
    filling = true;
  }
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  if (filling) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 700, 700);
    painting = false;
  } else {
    ctx.strokeStyle = color;
  }
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function stopPainting() {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeChange);
}

if (save) {
  save.addEventListener("click", handleSave);
}
