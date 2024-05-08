class EnemyBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture = 'enemybullet', frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.speed = 2; // Adjust bullet speed
        this.visible = false;
    }

    fire(x, y) {
        this.setPosition(x, y);
        this.visible = true;
        this.setActive(true);
    }

    update() {
        if (this.visible) {
            this.y += this.speed;
            if (this.y > this.scene.game.config.height) {
                this.visible = false;
                this.setActive(false);
            }
        }
    }
}

window.EnemyBullet = EnemyBullet;
