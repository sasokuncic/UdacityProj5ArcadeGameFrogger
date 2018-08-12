// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player who have to avoid enemies and jump into the water
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
    this.score = 0;

};

// Update the player's position according to pressed arrow keys
Player.prototype.update = function() {
    // TODO check for the collison
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Change the player's position according to pressed arrow keys 
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'up') {
        // row hight = 83 see engine.js
        this.y = this.y - 83;
        if (this.y < 0) {
            // Success.  Player jumped into water. Start again.
            this.y = 390;
            this.x = 200;
            this.score += 10;
            console.log(this.score);
        };
    } else if (keyPressed == 'down') {
        this.y = this.y + 83;
        if (this.y > 390) {
            this.y = 390;
        };
    } else if (keyPressed == 'left') {
        // column width = 100 see engine.js
        this.x = this.x - 100;
        if (this.x < 0) {
            this.x = 0;
        };
    } else if (keyPressed == 'right') {
        this.x = this.x + 100;
        if (this.x > 400) {
            this.x = 400;
        };
    };
};
// Now instantiate your objects.

// Place all enemy objectsvar allEnemies = []; in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

// Instantiate the player's object.
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
