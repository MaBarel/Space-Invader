function GameObject(x, y, img) {
    this.x = x; this.y = y; this.img = img; this.active = true;
}
GameObject.prototype.draw = function (ctx) {
    this.active && ctx.drawImage(this.img, this.x, this.y, 40, 40)
}

function init() {
    let img = document.querySelector(".alien ")
    for (let y = 0; y < 3; y++) {
        for (var x = 0; x < 8; x++) {
            invaders.push(new GameObject(50 + x * 50, 20 + y * 50, img))
        }
    }
}
function draw() {
    ctx.fillstyle = "#ddd"
    ctx.fillRect(0, 0, 0, 0)
    invaders.forEach(inv => inv.draw(ctx))
    player.draw(ctx)
}
function move() {

}

function game() {
    draw()
    move()
}
function gamestart() {
    init()
    document.addEventListener("keydown", function (e) { })
    interval = setInterval(game, 50);
    startMessage.classList.remove("show")
}
