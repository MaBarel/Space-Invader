const canvas = document.querySelector(".gameboard");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#startbutton");
const startMessage = document.querySelector(".startmessage");
const player = new GameObject(230, 550, document.querySelector(".playerblack"));
const background = document.querySelector(".backdrop");
const bullet = document.querySelector(".bullet");
let invaders = [];
let invadersDx = -5
let interval = {};
let invaderShot, cannonShot;
startButton.addEventListener("click", gamestart);