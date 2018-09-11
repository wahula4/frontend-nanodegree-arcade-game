// Enemies class
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // Variables applied to each of our instances go here

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
         // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        if (this.x > 510)
            this.x = -125;
       
        // 2D collision logic from MDN https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (player.x < this.x + 60 &&
            player.x + 35 > this.x &&
            player.y < this.y + 25 &&
            player.y + 40 > this.y) {
              this.x = -125;
                player.x = 202;
                player.y = 405;
      }
    }
    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//player class
class Player {
    constructor(x, y) {
        // Variables applied to each of our instances go here
        this.x = x;
        this.y = y;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';
    }
    // Update the player's position
    update() {
        if (this.x < 2)
            this.x = 2;
        else if ( this.x > 402)
            this.x = 402;
        else if (this.y > 405)
            this.y = 405;
        else if (this.y < 0) {
            // FIXME
            // setTimeout(function(){
                 this.x = 202;
                 this.y = 405;
            //   }, 500);
        }
    }
    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // if player tries to move outside the board, keep player in place
    handleInput(input){
       switch(input) {
           case "left":
                this.x -= 100;
                break;
           case "right":
                this.x += 100;
                break;
           case "up":
                this.y -= 83;
                break;
           case "down":
                this.y += 83;
                break;
       }
    }
}

// enemy array
const allEnemies = [];

// add feature
// change enemy speed every time player reaches the water

//enemy x and y coordinates and speed between 100 and 200
const enemy1 = new Enemy(-100, 310, Math.floor(Math.random()*(200 - 100 + 1) + 100));
const enemy2 = new Enemy(-300, 225, Math.floor(Math.random()*(200 - 100 + 1) + 100));
const enemy3 = new Enemy(-200, 145, Math.floor(Math.random()*(200 - 100 + 1) + 100));
const enemy4 = new Enemy(-400, 60, Math.floor(Math.random()*(200 - 100 + 1) + 100));

allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// player beginning coordinates
const player = new Player(202, 405);

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});