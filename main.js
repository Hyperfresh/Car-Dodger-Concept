/* 
Hy's P5.js Car Dodger | Year 11 Digital Technologies 2020
Paul "Hy" Asencion | SACE 740975X

Timers for spawning enemies/collectibles on the canvas.
The first two timers (timer1 and timer2) are for spawning enemies, while the next two
timers (timer3 and timerR) decide on when each collectible should spawn.
timerC determines when a powerup should end.
*/

var timer1 = 0;
var timer2 = 0;
var timer3 = 0;
var timerR = 0;
var timerC = 0;

function setup() {
    console.log("Setting up...")
    createCanvas(480,360); // That's the Scratch canvas size!
    //background(128)
    player = new player();
    // This make it so that the timers are set to the current time in milliseconds.
    timer1 = millis();
    timer2 = millis() ;
    timer3 = millis();
    timerR = (random(0,30000)) // Rolls a random timer of 0 to 30 seconds.
    console.log("Collectible timer is",timerR,"ms.");
    
}

// Declare variables
var Score = 0;
var Lives = 3;
var Difficulty = 1;
var change = 1; // Change of difficulty multiplier: (Score > (10 * change))
var Break = false; // For the KeyboardInterrupt function
var powerup = 0; // Player's current power-up.
var Multiplier = 1; // Score multiplier. Self-explanatory.
var slow = false; // Delay before moving lanes
// Declare class arrays
var enemies = [];
var collectibles = [];
// This array just lists the types of collectibles
var collectibleType = ["None","Repair Kit","Tire Spikes","Traffic Jam","Nitrogen","Multiplier"];

// Movement functionality
function keyPressed() { 
    // uses a seperate move function for setTimeout and the slow effect
    if (keyCode == LEFT_ARROW && player.carPos != 1) {
        if (slow == true) {setTimeout(movePlayer,500,-1)}
        else{movePlayer(-1)}
    } else if (keyCode == RIGHT_ARROW && player.carPos != 3) {
        if (slow == true) {setTimeout(movePlayer,500,1)}
        else{movePlayer(1)}
    } else if (keyCode == 27) {Break = true;}
}
// There are only three lanes. Each are approximately 100px apart.
function movePlayer(dir){
    if ((dir == 1 && player.carPos == 3) || (dir == -1 && player.carpos == 1)){return}
    console.log("Moving")
    player.carPos += dir;
    player.x += dir*100
}

function draw() {
    // Canvas
    background(128);
    fill(255);
    // Draw variables like score, lives, etc.
    textSize(11);
    text("Score: " + Score + " ✕" + Multiplier, 20, 20);
    text("Lives: " + Lives, 100, 20);
    text("Difficulty: 10/" + Difficulty, 20, 40);
    text("Applied Collectible: " + collectibleType[powerup], 20, 60);
    // Update class displays
    player.display();
    updateEnemy();
    updateCollectible();
    updateConsequence();
    // Spawn classes if criteria met
    if (millis() >= 10 + timer1) {
        createEnemy();
        timer1 += 99999999999999999999999999999999999999999;
    }
    if (millis() >= 3000 + timer2) {
        createEnemy();
        timer2 += 99999999999999999999999999999999999999999;
    }
    if (Score >= 5 && millis() >= timerR + timer3) { // Score must be 5 to spawn collectible
        createCollectible();
        timer3 = millis();
        timerR = (random(0,30000)) // Rolls a random timer of 0 to 30 seconds.
        console.log("Collectible timer is",timerR,"ms.");
    }
    if (Lives <= 0) { // Stop the game if player loses all lives.
        // Game Over text
        fill(0);
        textSize(32);
        text("Game over!", 150, 180);
        // Subtitle asking player to refresh
        textSize(16);
        text("Refresh the page to play again.", 130, 200);
        // Crash the game
        throw new Error("Game over! Your score was " + Score);
    }
    if (Break == true) { // Debug purposes only to crash game
        fill(0);
        textSize(32); // text size
        text("Keyboard interrupt!", 101, 180);
        throw new Error("KeyboardInterrupt!");
    }
}

// Refer to enemy.js
function updateEnemy() {
    for(var i =0;i<enemies.length;i++) {
        enemies[i].move();
        enemies[i].display();
        /* Enemy class updates score. This code checks if the score is a factor of 10
        (as set by var change). If so, increase the difficulty by 0.25. */
        if (Score > (10 * change)) {
            Difficulty += 0.25;
            change += 1;
            print(Difficulty);
        }
    }
}
function createEnemy(){
    console.log("Spawn enemy!")
    d = new enemy();
    enemies.push(d);
}

// Refer to collectible.js
function updateCollectible() {
    for(var i =0;i<collectibles.length;i++) {
        collectibles[i].move();
        collectibles[i].display();
    }
}
function createCollectible(){
    print("Spawn collectible!");
    d = new collectible();
    collectibles.push(d);
}
function createConsequence(collType){
    if (powerup != 0) {return;} // If powerup already active
    powerup = collType;
    // As a reminder, here are the types (0 to 5):
    // ["None","Repair Kit","Tire Spikes","Traffic Jam","Nitrogen","Multiplier"]
    if (collType == 1) {
        Lives += 1;
        console.log("Repair kit get! Lives =",Lives);
        powerup = 0;
    }
    else if (collType == 2) {
        console.log("Tire spikes!");
        slow = true;
        timerC = millis();
    }
    else if (collType == 3) {
        console.log("Traffic jam!");
        if (Difficulty >= 4) {
            Difficulty -= 3;
            timerC = millis();
        } else {
            console.log("Unable to jam traffic. Difficulty too low!");
            powerup = 0;
        }
    }
    else if (collType == 4) {
        console.log("Nitrogen!");
        Difficulty += 3;
        Multiplier = 4;
        timerC = millis();
    }
    else if (collType == 5) {
        console.log("Multiplier!")
        Multiplier = 2;
        timerC = millis();
    }
} 
function updateConsequence() { // Runs every draw() call to update the length of the powerup.
    if (powerup == 2) {
        if (!(millis() >= 10000 + timerC)) {
            console.log("Waiting for millis",millis(),"to reach",(10000)+timerC);
        } else {
            slow = false;
            powerup = 0;
            console.log("Tire spikes over!");
        }
    }
    if (powerup == 3) {
        if (!(millis() >= 10000 + timerC)) {
            console.log("Waiting for millis",millis(),"to reach",(10000)+timerC);
        } else {
            Difficulty += 3;
            powerup = 0;
            console.log("Traffic jam over!");
        }
    }
    else if (powerup == 4) {
        if (!(millis() >= 10000 + timerC)) {
            console.log("Waiting for millis",millis(),"to reach",(10000)+timerC);
        } else {
            Difficulty -= 3;
            Multiplier = 1;
            powerup = 0
            console.log("Nitrogen over!");
        }
    }
    else if (powerup == 5) {
        if (!(millis() >= 10000 + timerC)) {
            console.log("Waiting for millis",millis(),"to reach",(10000)+timerC);
        } else {
            Multiplier = 1;
            powerup = 0
            console.log("Multiplier over!");
        }
    }
}
