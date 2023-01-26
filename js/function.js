function GameObject(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.active = true;
}

GameObject.prototype.draw = function (ctx) {
    this.active && ctx.drawImage(this.img, this.x, this.y, 40, 40)
}
GameObject.prototype.move = function (dx, dy) {
    this.x += dx; this.y += dy
}
GameObject.prototype.fire = function(dy){
    return new shot (this.x+20, this.y+20, dy )
}
GameObject.prototype.isHitBy = function(shot) {
    function between(x, a, b) { return a < x && x < b}
    return this.active && between(shot.x, this.x, this.x+40) && between(shot.y+10, this.y, this.y+20)
}
function shot(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
}
shot.prototype.move = function() {
    this.y += this.dy
    return this.y > 0 && this.y < 600
}
shot.prototype.draw = function(ctx){
    ctx.fillStyle = "#A020F0"
    ctx.fillRect(this.x-1, this.y, 3, 20)
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
    invaderShot && invaderShot.draw(ctx);
    cannonShot && cannonShot.draw(ctx);
}

function move() {
    let leftX = invaders[0].x, rightX = invaders[invaders.length - 1].x
    if (leftX <= 20 || rightX >= 440) {
        invadersDx = -invadersDx
    }
    invaders.forEach(inv => inv.move(invadersDx, 0.5))
    if(invaderShot && !invaderShot.move()){
       invaderShot = null
    }
    if(!invaderShot) {
        let active = invaders.filter(i => i.active)
        let r =active[Math.floor(Math.random()*active.length)]
        invaderShot = r.fire(20)
    }
    if(cannonShot) {    
        let hit = invaders.find(inv => inv.isHitBy(cannonShot))
        if (hit) {
            hit.active = false
            cannonShot = null
        } else{
            if (!cannonShot.move()){
                cannonShot = null
            }
        }
    }
}

function game() {
    draw();
    move();
}

function gamestart() {
    init()
    document.addEventListener("keydown", function (e) {
        if (e.key === "a" && player.x > 40) {
            player.move(-20, 0)
        }
        if (e.key === "d" && player.x < 420) {
            player.move(20, 0)
        }
        if (e.key === " " && !cannonShot) {
            cannonShot = player.fire(-30)
        }
    })
    interval = setInterval(game, 50);
    startMessage.classList.remove("show")
}
