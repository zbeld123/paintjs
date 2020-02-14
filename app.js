const canvas = document.getElementById("js-Canvas");

canvas.width = 500;
canvas.height = 500;

let painting = false;

const ctx = canvas.getContext("2d");

ctx.lineWidth = 2.5;
ctx.strokeStyle = "#272627";

function onMouseMove(event) {
  //offsetX, offsetY : canvas 내에서의 x,y좌표값
  //windowX, windowY  : 전체 스크린에서의 x,y좌표값
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

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
