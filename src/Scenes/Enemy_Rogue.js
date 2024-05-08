class Enemy_Rogue extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.scene = scene;
        this.speed = speed || 1;
        this.bullets = scene.enemyBullets;
        this.lastFired = 0;

    }

    update(time) {
        // 降低敌人移动速度
        this.y += this.speed * 0.5;
        if (this.y > this.scene.game.config.height) {
            this.reset();
        }

        // 敌人子弹射击逻辑
        if (time > this.lastFired) {
            let bullet = this.bullets.get();
            if (bullet) {
                bullet.fire(this.x, this.y);
                this.lastFired = time + Phaser.Math.Between(1000, 2000); // 调整射击频率
            }
        }
    }

    reset() {
        this.y = 0;
        this.x = Phaser.Math.Between(0, this.scene.game.config.width - 100);
    }
}

window.Enemy_Rogue = Enemy_Rogue;
