const board = document.getElementById("board");
const timeDisplay = document.getElementById("time");
const livesDisplay = document.getElementById("lives");
const difficultySelect = document.getElementById("difficulty");
const splashScreen = document.getElementById("splash-screen"); // KHAI BÁO MỚI

let numbers = [];
let nextNumber = 1;
let lives = 3;
let timer;
let timeLeft = 0;
let difficulty = "easy";

function startGame() {
  difficulty = difficultySelect.value;
  board.innerHTML = "";
  numbers = [];
  nextNumber = 1;
  lives = 3;

  if (difficulty === "easy") timeLeft = 60;
  if (difficulty === "medium") timeLeft = 40;
  if (difficulty === "hard") timeLeft = 25;
  if (difficulty === "superhard") timeLeft = 25;

  livesDisplay.textContent = lives;
  timeDisplay.textContent = timeLeft;
  
  // LOGIC HIỂN THỊ: Ẩn màn hình chờ và hiện bảng chơi/thông tin
  splashScreen.style.display = "none";
  board.style.display = "grid"; 
  document.querySelector(".info").style.display = "flex"; 

  generateNumbers();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏳ Hết giờ! Bạn thua rồi.");
      resetGame();
    }
  }, 1000);
}

function resetGame() {
  clearInterval(timer);
  board.innerHTML = "";
  timeDisplay.textContent = 0;
  livesDisplay.textContent = 3;
  
  // LOGIC HIỂN THỊ: Hiện màn hình chờ và ẩn bảng chơi/thông tin
  splashScreen.style.display = "flex"; // Hiển thị màn hình chờ (theo CSS)
  board.style.display = "none";
  document.querySelector(".info").style.display = "none";
}

function generateNumbers() {
  // Tạo mảng số từ 1 đến 20 và shuffle ngẫu nhiên
  let nums = Array.from({ length: 20 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

  nums.forEach(num => {
    const div = document.createElement("div");
    div.classList.add("number");
    div.textContent = num;
    div.addEventListener("click", () => handleClick(num, div));
    board.appendChild(div);
    numbers.push(div);
  });
}

function handleClick(num, element) {
  if (num === nextNumber) {
    if (difficulty === "easy") {
      element.classList.add("invisible"); // <--- ĐÃ SỬA: Thay vì remove, thêm class "invisible"
    } else if (difficulty === "medium") {
      element.classList.add("highlight");
    }
    if (difficulty === "superhard") {
      shuffleNumbers();
    }

    nextNumber++;
    if (nextNumber > 20) {
      clearInterval(timer);
      alert("🎉 Chúc mừng! Bạn đã thắng!");
      resetGame();
    }
  } else {
    element.classList.add("wrong");
    lives--;
    livesDisplay.textContent = lives;
    if (lives <= 0) {
      clearInterval(timer);
      alert("💀 Bạn đã thua vì hết mạng!");
      resetGame();
    }
  }
}

function shuffleNumbers() {
  let children = Array.from(board.children);
  children.sort(() => Math.random() - 0.5);
  board.innerHTML = "";
  children.forEach(child => board.appendChild(child));
}

// HÀM MỚI: Xử lý sự kiện click vào nút "Bắt đầu" giả
function showFakeStartAlert() {
  alert("😂 Không phải nút này! Nút BẮT ĐẦU xịn ở trên kia cơ. Đừng để bị lừa nhé!");
}

// THIẾT LẬP TRẠNG THÁI BAN ĐẦU KHI TẢI TRANG
resetGame();