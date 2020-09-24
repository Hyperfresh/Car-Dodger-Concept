class enemy {
    constructor() {
        this.avpos = [120, 220, 320]; // The X positions the enemy can be in.
        this.x = this.avpos[int(random(0,3))];
        this.y = 10;
    }
    move() { // As it only spawns twice, this is basically a loop
        if (this.y > 300) {
            this.x = this.avpos[int(random(0,3))];
            this.y = 10;
            Score += 1 * Multiplier;
        } else {
            this.y += 0.5 * Difficulty;
        }
        if (collideRectRect(this.x, this.y, 30, 30, player.x, player.y, 30, 30)) {
            Lives -= 1
            this.x = this.avpos[int(random(0,3))];
            this.y = 10;
        }
    }
    display() {
        fill(255,0,0);
        rect(this.x,this.y,30,30);
    }
}