class PlayerShip extends Phaser.Scene {
    constructor() {
        super('PlayerShipScene');
        this.bodyX = 400;  
        this.bodyY = 550;  
        this.my = { sprite: {} };
        this.speed = 160;  
        this.frameTime = 0;  
    }

    preload() {
        this.load.setPath('./assets/');
        this.load.image('playership', 'playerShip1_orange.png');
        this.load.image('playerbullet', 'Playerlaser.png');
    }
    
    create() {
        // 添加玩家飞机
        this.my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, 'playership');

        // 添加子弹并隐藏
        this.bullet = this.add.sprite(this.bodyX, this.bodyY - 20, 'playerbullet').setVisible(false);

        // 添加输入控制
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, delta) {
        this.frameTime += delta;
        if (this.frameTime > 16.5) {
            this.frameTime = 0;

            let movementDelta = this.speed * (delta / 1000);

            // 左右移动
            if (this.AKey.isDown) {
                this.my.sprite.body.x -= movementDelta;
            }

            if (this.DKey.isDown) {
                this.my.sprite.body.x += movementDelta;
            }
        }

        // 发射子弹
        if (this.spaceBar.isDown && !this.bullet.visible) {
            this.fireBullet();
        }

        // 更新子弹状态
        if (this.bullet.visible) {
            this.bullet.y -= this.speed * 4 * (delta / 1000);
            if (this.bullet.y < 0) {
                this.bullet.setVisible(false);
            }
        }
    }

    fireBullet() {
        this.bullet.setPosition(this.my.sprite.body.x, this.my.sprite.body.y);
        this.bullet.setVisible(true);
    }
}
