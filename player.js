class player {
    constructor() {
        this.x = 220;
        this.y = 300;
        this.carPos = 2; // lane of car, pretty simple
    }
    display() {
        //draw Rectangle in updated position
        fill(0,255,0);
        rect(this.x,this.y,30,30);
        text(collectibleType[powerup.id],this.x,this.y,this.x+30,this.y+30)
    }
}