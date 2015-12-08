// Enemies our player must avoid

// Declare enemy variables:

var enemyY = [60, 150, 230];
var enemySpeeds =  [100, 150, 200];

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.speed = enemySpeeds[Math.floor(Math.random() * 3) ];
    this.enemyY = [60, 150, 230];
    this.enemySpeeds =  [100, 150, 200];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt;
    if (this.x > 500) {
        this.x = 1;
        this.y = enemyY[Math.floor(Math.random() * 3) ]; 
        this.speed= enemySpeeds[Math.floor(Math.random() * 3)];
    }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png'; // the other images don't load!?
    this.x = 200;
    this.y = 350;
};


// Add methods to the Player.prototype:

Player.prototype.render = function (dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
Player.prototype.handleInput = function (direction) {
       if (direction=='up'){
            this.y += -20;
        }
        if (direction=='down'){
            this.y += 20;
        }    
        if (direction=='right'){
            this.x += 20;
        }
        if (direction=='left'){
            this.x += -20;
        }   
        if (this.y < 0) {
            this.reset();
        } 
        if (this.y > 400) {
            this.y = 400;
        } 
        if (this.x < 1 ) {
            this.x = 1;
        } 

        if (this.x > 400 ) {
            this.x = 400;
        } 
    }
Player.prototype.update = function (dt) {
        this.collision();
        /* It was suggested that I "put the collision check in handleInput 
        (since user input is the only way the player's state is going to change). 
        That way, you can avoid doing computation in every frame."" However when I do this, 
        collision detection only happends when I move the player. It doesn't happen if 
        the player is static, and the enemy runs into the player. */
    }


// Reset the players position. This method gets called if the player collides with an enemy, or reaches the water.

Player.prototype.reset =function () {
    this.x = 200;
    this.y = 400;
};

//Detect collision with enemies. If there is a collision, reset.

Player.prototype.collision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 70 &&
            this.x > allEnemies[i].x &&
            this.y < allEnemies[i].y + 80 &&
            this.y + 70 > allEnemies[i].y) {
            this.reset();
        }
    }
};

// Now instantiate your objects.

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];

// Place the player object in a variable called player
var player = new Player();



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
