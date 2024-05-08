class Enemy_Rogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.scene = scene;
        this.speed = speed || 1;
    }

    update() {
        // Enemy movement logic
        this.y += this.speed * 1.5;
        if (this.y > this.scene.game.config.height) {
            this.reset();
        }
    }

    reset() {
        this.y = 0;
        this.x = Phaser.Math.Between(0, this.scene.game.config.width - 100);
    }
}

window.Enemy_Rogue = Enemy_Rogue;
