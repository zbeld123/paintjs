const canvas = document.getElementById("js-Canvas");

// background-color속성을 지닌 div를 갖는 컨테이너
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-Range");
const mode = document.getElementById("js-Mode");
const save = document.getElementById("js-Save");

const DEFAULT_COLOR = "#272627";
const CANVAS_SIZE = 500;
let painting = false; // painting되어야 할 때와 filling되어야 할 때 구분
let current_mode = false; // paint가 눌렸을 때 true , fill이 눌렸을 때 false

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 2.5; // 선 굵기
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;

// mousemove event
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

// color-div event
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// range event
function handleRangeChange(event) {
  //console.log(event.target.value);
  const range = event.target.value;
  ctx.lineWidth = range;
}

// mode event
function handleModeClick(event) {
  if (current_mode === true) {
    mode.innerText = "Fill";
    current_mode = false;
  } else {
    mode.innerText = "Paint";
    current_mode = true;
  }
}

// filling event
function handleCanvasClick() {
  if (current_mode) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 움직이는 경우
  canvas.addEventListener("mousedown", startPainting); // 마우스가 눌릴 때 painting = true
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// Array.from(obj) : obj를 Array값으로 반환
// forEach문을 통해 각각의 div에 접근해서 모든 요소에 click 이벤트 적용
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

// 이벤트 타입이 input임에 주의
if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
