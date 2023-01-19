function GameObject(x, y, img) {
    this.x = x; 
    this.y = y; 
    this.img = img; 
    this.active = true;
}

GameObject.prototype.draw = function (ctx) {
    this.active && ctx.drawImage(this.img, this.x, this.y, 40, 40)
}
GameObject.prototype.move = function(dx, dy) {
    this.x += dx; this.y += dy
}

function init() {
    let img = document.querySelector(".alien ")
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 8; x++) {
            invaders.push(new GameObject(50 + x * 50, 20 + y * 50, img))
        }
    }
}
function draw() {
    ctx.drawImage(background, 0, 0, 500, 600)
    invaders.forEach(inv => inv.draw(ctx));
    player.draw(ctx);
}

function move() {
    let leftX = invaders[0].x, rightX = invaders[invaders.length-1].x
    if (leftX <= 20 || rightX >= 440) {
        invadersDx = -invadersDx
    }
    invaders.forEach(inv => inv.move(invadersDx, 0.5))
}

function game() {
    draw();
    move();
}

function gamestart() {
    init()
    document.addEventListener("keydown", function (e) {
        if (e.key ==="a" && player.x > 40){
            player.move(-20,0)
        }
        if (e.key ==="d" && player.x < 420){
            player.move(20,0)
        }
     })
    interval = setInterval(game, 50);
    startMessage.classList.remove("show")
}
