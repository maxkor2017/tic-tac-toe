const switchTheme = document.querySelector(".header__btn");
const body = document.body;
const modal = document.querySelector(".modal");
const scoreX = document.querySelector("#score-x");
const scoreD = document.querySelector("#score-d");
const scoreO = document.querySelector("#score-o");
const cards = document.querySelectorAll(".card");
const modalTitle = document.querySelector(".modal__title");
const cancel = document.querySelector(".cancel");
const apply = document.querySelector(".apply");
const winPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let theme = "white";
let player = "x";
let gameEnd = false;
getTheme();

cards.forEach((card) => {
  card.onclick = function () {
    handleClick(card);
  };
});

switchTheme.onclick = toggleTheme;
cancel.onclick = closeModal;
apply.onclick = restartGame;

function openModal() {
  modal.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("modal-open");
}

function toggleTheme() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    theme = "dark";
  } else {
    theme = "white";
  }
  saveTheme();
}

function saveTheme() {
  localStorage.setItem("theme", theme);
}

function getTheme() {
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    if (theme == "white") {
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
    }
  } else {
    theme = "white";
  }
}

function handleClick(card) {
  if (card.innerHTML == "" && !gameEnd) {
    card.innerHTML = player;
    card.classList.add(player);
    checkWin();
    checkDraw();
    if (player == "x") {
      player = "o";
    } else {
      player = "x";
    }
  }
}

function checkWin() {
  winPositions.forEach((winPosition) => {
    const id1 = winPosition[0];
    const id2 = winPosition[1];
    const id3 = winPosition[2];
    const card1 = document.getElementById(id1);
    const card2 = document.getElementById(id2);
    const card3 = document.getElementById(id3);
    if (
      card1.innerHTML == player &&
      card2.innerHTML == player &&
      card3.innerHTML == player
    ) {
      gameEnd = true;
      card1.classList.add("win");
      card2.classList.add("win");
      card3.classList.add("win");
      handleWin(player);
    }
  });
}

function restartGame() {
  gameEnd = false;
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove("win", "o", "x");
  });
  closeModal();
}

function handleWin(player) {
  modalTitle.innerHTML = `player ${player} win!!!`;
  if (player == "x") {
    scoreX.innerHTML = +scoreX.innerHTML + 1;
  } else if (player == "o") {
    scoreO.innerHTML = +scoreO.innerHTML + 1;
  } else {
    modalTitle.innerHTML = `Draw!!!`;
    scoreD.innerHTML = +scoreD.innerHTML + 1;
  }
  openModal();
}

function checkDraw() {
  if (!gameEnd) {
    let isDraw = true;
    cards.forEach((card) => {
      if (card.innerHTML == "") {
        isDraw = false;
      }
    });
    if (isDraw) {
      handleWin();
    }
  }
}
