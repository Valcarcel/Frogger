// Enemies our player must avoid

var enemyY = [60, 150, 230];
var enemySpeedIndex = 1;
var speed = 100;
var enemySpeeds =  [100, 150, 200];

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = (Math.random() * 500);
    
    this.speed = enemySpeeds[Math.floor(Math.random() * 3) ];
    console.log("This speed is " + this.speed);


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



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png'; // the other images don't load!?
    this.x = 150;
    this.y = 350;
    this.update = function (dt) {
        this.collision();
    }
    this.render = function (dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    this.handleInput = function (direction) {
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
    }
    this.collision();
};



Player.prototype.reset =function () {
    this.x = 10;
    this.y = 400;
    star.x = 400;
    star.y = 5;
};

Player.prototype.collision = function () {
    //console.log("collision happened");
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            this.x = 200;
            this.y = 400;

        }
    }
};

//draw the player:
//  RW: I'm drawing the player in the render method.

// Now instantiate your objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];

for (enemy in allEnemies) {
    //console.log(allEnemies[enemy]);
    Enemy.prototype.render = function(dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
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
