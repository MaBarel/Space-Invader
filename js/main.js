const canvas = document.querySelector(".gameboard");
const ctx = canvas.getContext("2d");
const player = new GameObject(230, 550, document.querySelector(".playerblack"));
const startButton = document.querySelector("#startbutton");
const startMessage = document.querySelector(".startmessage");
let interval = {};
let invaders = [];
startButton.addEventListener("click", gamestart)
