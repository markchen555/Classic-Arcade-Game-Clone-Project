"use strict";
// Initial scoreBoard setting. 

var currentLevel = 0;
var highestLevel = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.direction = "right";

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed);
    this.y = 83*this.row;

    if(this.x > 8 * 83){  //enemy disappeard after col 8
        this.reset();
    }

    if(this.checkCollisions()){
            // player.reset();
            currentLevel = 0;
            current.innerHTML = currentLevel; 
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.col = -1; 
    this.row = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // enemy appeard between row 1 to 4
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // speed between 3 to 7
};

Enemy.prototype.checkCollisions = function(dt) {
        var collision = false;
        allEnemies.forEach(function(enemy) {
            if(enemy.row == player.row){
                if(enemy.x + 83 > player.x && enemy.x < player.x + 83){
                    collision = true;
                    player.reset();
                }
            }
        });
        return collision;
    };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    if(this.moveable) {
        this.x = 101 * this.col;
        this.y = 83 * this.row;
    }

    if(this.y < 83 && this.moveable) {
        this.moveable = false;
        return true;
    }

    return false;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.col = Math.floor(Math.random() * (6 - 0 + 1)) + 0; // give initial random position
    this.row = 5;
    this.moveable = true;
};

Player.prototype.handleInput = function(key) {
    switch (key){
        case 'left':
            this.col--;
            break;
        case 'up':
            this.row--;
            break;
        case 'right':
            this.col++;
            break;
        case 'down':
            this.row++;
            break;
    }
    if(this.col < 0) this.col = 0;
    if(this.col > 6) this.col = 6;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;

    if (this.row === 0) {
        //Call scoreBoard function when reach water side
        this.scoreBoard();
        this.reset();
    }

};

Player.prototype.scoreBoard = function() {
    var current = document.getElementById("current");
    var highest = document.getElementById("highest");
        currentLevel++;
        if(currentLevel > highestLevel){
            highestLevel = currentLevel;
            highest.innerHTML = highestLevel;
        }
        current.innerHTML = currentLevel;
};

// var Collectible = function() {
//     this.x = columnGenerator();
//     this.y = rowGenerator();
// }

// Collectible.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// var BlueGem = function () {
//     Collectible.call(this);
//     this.sprite = 'images/Gem_Blue.png';
//     this.name = "Blue Gem";
// }

// BlueGem.prototype = Object.create(Collectible.prototype);
// BlueGem.prototype.constructor = Collectible;
// BlueGem.prototype.effect = function () {
//     score += (100 * scoreMultiplier);
//     messageUpdater("info-message", "+" + (100 * scoreMultiplier) + " Score!","#34FA6C");
// };


// var GreenGem = function() {
//     Collectible.call(this);
//     this.sprite = 'images/Gem_Green.png';
//     this.name = "Green Gem";
// }

// GreenGem.prototype = Object.create(Collectible.prototype);
// GreenGem.prototype.constructor = Collectible;


// // Spawns a collectible
// var collectibleSpawn = function () {
//     // Checks to see if a collectible will spawn
//     forEach(collectibleList, function (collectible) {
//         var collectibleSpawn = Math.floor(Math.random()*100);
//         if (collectibleSpawn < collectible.rate) {
//             switch(collectible.name) {
//                 case "Blue Gem":
//                     var addItem = new BlueGem;
//                     break;
//                 case "Green Gem":
//                     var addItem = new GreenGem;
//                     break;
//                 // case "Orange Gem":
//                 //     var addItem = new OrangeGem;
//                 //     break;
//                 // case "Ruby Gem":
//                 //     var addItem = new RubyGem;
//                 //     break;
//                 // case "Heart":
//                 //     var addItem = new Heart;
//                 //     break;
//                 // case "Key":
//                 //     var addItem = new Key;
//                 //     break;
//                 // case "Star":
//                 //     var addItem = new Star;
//                 //     break;
//                 default:
//             }

//             var addItemFlag = true;

//             // Prevents additional hearts from spawning if player already has the maximum allowed lives
//             if (collectible["Name"] === "Heart" && lives === MAXIMUM_LIVES) {
//                 addItemFlag = false;
//             }

//             // Sets item flag to false if a collectible already exists or if spawn location is occupied already
//             forEach(allCollectibles, function (powerup) {
//                 if (powerup.name === addItem.name || addItem.x === powerup.x && addItem.y === powerup.y) {
//                     addItemFlag = false;
//                 }
//             });

//             forEach(allObstacles, function (obstacle) {
//                 if (addItem.x === obstacle.x && addItem.y === obstacle.y) {
//                     addItemFlag = false;
//                 }
//             });

//             // Adds the instance of the collectible
//             if (addItemFlag) {
//                 allCollectibles.push(addItem);
//             }
//         }
//     });
// };

// // Helper function to help randomly place objects on different rows
// var rowGenerator = function() {
//     return 61 + Math.floor(Math.random()*3)*83;
// };

// // Helper function to help randomly place objects on different columns
// var columnGenerator = function() {
//     return Math.floor(Math.random()*5)*101;
// };

// var checkCollisions = function () {
//         forEach(allEnemies, function (bug) {
//             if (player.y < enemy.y + 63 && player.y > enemy.y - 77 && player.x < enemy.x + 70 && player.x > enemy.x - 70) {
//                 // Resets player position, applies appropriate penalties and updates the scoreboard
//                 player.reset();
//                 // allCollectibles = [];
//                 // collectibleSpawn();
//             }
//         });
// }

// function checkCollisions(dt) {
//         var collision = false;
//         allEnemies.forEach(function(enemy) {
//             if(enemy.row == player.row){
//                 if(enemy.x + 83 > player.x && enemy.x < player.x + 83){
//                     collision = true;
//                     player.reset();
//                     // enemyRefresh.call(this);
//                 }
//             }
//         });
//         //  allCollectibles.forEach(function(gem) {
//         //     if(collectible.row == player.row){
//         //         if(collectible.x + 83 > player.x && collectible.x < player.x + 83){
//         //             collision = true;
//         //             // allCollectibles = [];
//         //             // collectibleSpawn();
//         //         }
//         //     }
//         // });
//         return collision;
//     }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// var allCollectibles = [];

//how many enemy shows up on the field
for (var i = 0; i < 4; i++){  
    allEnemies.push(new Enemy());
}

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

// Prevents the window from scrolling up and down when the arrow keys are pressed.
window.addEventListener("keydown", function(e) {
    if ([38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

