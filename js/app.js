/**
* @description Arcade Game Frogger
* @description Udacity FEWD project
* @description Author: Sašo Kunčič
*/

// Globals
const PLAYER_STARTING_X = 200;
const PLAYER_STARTING_Y = 390;
const ENEMY_WIDTH = 80;
const ENEMY_HEIGHT = 60;
// row hight = 83 see engine.js
const RAW_HEIGHT = 83;
// column width = 100 see engine.js
const COLUMN_WIDTH = 100;

// Statistic
let gameCollisions = 0;
let gameScore = 0;

/**
* @description Enemies class our 
* @description Player must avoid collision with them
*/
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.speed = Math.floor(Math.random() * 100 + 100);
};

/**
 * @description Update the enemy's position
 * @description When an enemy collides with the player, the game is reset.
 * @param {dt} dt a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if (this.x > 400) {
        this.x = 0;
        this.speed = Math.floor(Math.random() * 100 + 100);
    };
    /* If the horizontal distance between an enemy and the player is less
     * than enemy width or the vertical distance is less than enemy height,
     * there was a collision between the enemy and the player.
     * Reference: https://www.w3schools.com/graphics/game_obstacles.asp
     */
    if (Math.abs(Math.floor(player.x) - Math.floor(this.x)) <= ENEMY_WIDTH &&
       Math.abs(Math.floor(player.y) - Math.floor(this.y)) <= ENEMY_HEIGHT) {
        //gameCollisions +=10;
        //console.log('Collisions: ' + gameCollisions);
        //if (gameCollisions > gameScore) {
            // new game
            //alert('Score:<'+ gameScore + '> Collisions:<'+ gameCollisions + '>' + 'Gameover.');
            window.location.reload();
        //}
    }
};

/**
 * @description Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Player class
* @description Have to closs bricks with enemies and jump into the water
*/
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_STARTING_X;
    this.y = PLAYER_STARTING_Y;
    this.score = 0;
};

/**
 * @description Update the playser's position
 * @description Required by game engine. Without functionality. 
 */
// Update the player's position according to pressed arrow keys
Player.prototype.update = function() {
};

/**
 * @description Render the playser's position
 * @param {dt} dt a time delta between ticks
 */
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Update the player's position
 * @description Player is using arrow keys to move.
 * @param {keyPressed} key pressed
 */
// Change the player's position according to pressed arrow keys 
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'up') {
        if (this.y < RAW_HEIGHT) {
            // Success.  Player jumped into water. Start again. 
            setTimeout(function () {
                player.y = PLAYER_STARTING_Y;
                player.x = PLAYER_STARTING_X;
                gameScore += 10;
                console.log('Score: ' + gameScore);
            }, 200);
        } 
        this.y -= RAW_HEIGHT;
    } else if (keyPressed == 'down') {
        this.y += RAW_HEIGHT;
        if (this.y > PLAYER_STARTING_Y) {
            this.y = PLAYER_STARTING_Y;
        };
    } else if (keyPressed == 'left') {
        this.x -= COLUMN_WIDTH;
        if (this.x < 0) {
            this.x = 0;
        };
    } else if (keyPressed == 'right') {
        this.x += COLUMN_WIDTH;
        if (this.x > 400) {
            this.x = 400;
        };
    };
};

// Instances of enemies
const allEnemies = [];
for (var stoneRaw = 0; stoneRaw < 3; stoneRaw++) {
    allEnemies.push(new Enemy());
    allEnemies[stoneRaw].y = stoneRaw * RAW_HEIGHT + 61;
};

// Instances of player's
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