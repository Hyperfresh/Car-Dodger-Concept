class collectible {
    constructor() {
        this.avpos = [120, 220, 320]; // The X positions the collectible can be in.
        this.x = this.avpos[int(random(0,3))];
        this.y = 10;
        this.ID= 0;
        this.break=false;
        // Determine the type of collectible.
        // As a reminder, here are the types (0 to 5):
        // ["None","Repair Kit","Tire Spikes","Traffic Jam","Nitrogen","Multiplier"]
        print(this.roll = int(random(1,20)))
        if (this.roll == 1) {this.ID = 1}
        else if (this.roll >= 1 && this.roll <= 5) {this.ID=2}
        else if (this.roll >= 6 && this.roll <= 10) {this.ID=3}
        else if (this.roll >= 11 && this.roll <= 13) {this.ID=4}
        else if (this.roll >= 14 && this.roll <= 20) {this.ID=5}
        /* It might be out of range - who knows. This code will check.
        I'm not sure what happens if the roll goes out of range, so to
        be safe than sorry, I'm crashing the game here  . */
        else {throw new Error("Roll was out of range 1-20! I got " + str(this.roll));}
        print("New collectible ID is",this.ID)
    }
    move() {
        // this.break - if colliding, or over the canvas, go to 0,0 and don't draw.
        // This is probably very memory-INefficient, but it works, okay?
        if (this.y > 300) {
            this.x = 0;
            this.y = 0;
            this.break=true;
        } else if (this.break == false) {
            this.y += 0.5 * Difficulty;
        }
        if (collideRectRect(this.x, this.y, 30, 30, player.x, player.y, 30, 30)) {
            this.x = 0;
            this.y = 0;
            createConsequence(this.ID)
            this.break=true;
        }
    }
    display() {
        if (this.break == false) {
            fill(255,255,0);
            rect(this.x,this.y,30,30);
            fill(0);
            text(collectibleType[this.ID],this.x,this.y,this.x+30,this.y+30)
        }
    }
}