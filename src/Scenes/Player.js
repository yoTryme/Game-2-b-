class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyLeft, keyRight) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add object to existing scene
        // Properties
        this.speed = 3;
        // Key Handling
        this.moveLeft = keyLeft;
        this.moveRight = keyRight; 
    }

    update() {
        // x-axis Movement
        if (this.moveLeft.isDown && this.x >= 0) {
            this.x -= this.speed;
        } else if (this.moveRight.isDown && this.x < this.scene.game.config.width) {
            this.x += this.speed;
        }
    }
}
