class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.speed = 5;
        this.SFXPlayed = false;
        this.ShootSFX = scene.sound.add('laser');
    }

    update() {
        // Remove bullet if it goes out of bounds
        this.y -= this.speed;
        if (this.y < 0) {
            this.visible = false;
        }
    }
}