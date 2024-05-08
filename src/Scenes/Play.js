class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.my = { sprite: {} };
        this.lives = 3;
        this.score = 0;
        this.isShooting = false;

    }

    preload() {
        // 加载资源
        this.load.image('background', 'assets/Backgournd.png');
        this.load.image('ship', 'assets/playerShip1_orange.png');
        this.load.image('bullet', 'assets/Playerlaser.png');
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('enemy2', 'assets/enemy2.png');
        this.load.image('Explosion', 'assets/laserYellow_burst.png');
//        this.load.image('enemybullet', 'assets/enemylaser.png');
        this.load.audio('explosionSFX', 'assets/explosionCrunch_000.ogg');
        this.load.audio('laser', 'assets/impactMetal_000.ogg');
    }

    create() {
        let my = this.my;

        // 背景滚动逻辑
        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0);

        // 创建敌人子弹组
        this.enemyBullets = this.physics.add.group({
            classType: EnemyBullet,
            maxSize: 10,
            runChildUpdate: true
        });

        // 玩家移动控制
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // 创建主要精灵及其属性
        my.sprite.player = new Player(this, this.cameras.main.centerX, 500, 'ship', 0, this.AKey, this.DKey).setScale(2.0);
        my.sprite.bullet = new Bullet(this, my.sprite.player.x, my.sprite.player.y, 'bullet').setOrigin(0.5, 0.5);
        my.sprite.bullet.visible = false;

        // 创建敌人
        my.sprite.enemy1 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'enemy1', 1).setScale(2.0).setFlipY(true);
        my.sprite.enemy2 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'enemy2', 1.5).setScale(2.0).setFlipY(true);
        my.sprite.enemy1.bullets = this.enemyBullets;
        my.sprite.enemy2.bullets = this.enemyBullets;

        // 创建视觉效果
        this.anims.create({
            key: 'explosion',
            frames: [{ key: 'Explosion' }],
            frameRate: 20,
            repeat: 0
        });

        // 创建音效
        this.explosionSFX = this.sound.add('explosionSFX');

        // HP 和得分跟踪
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        this.livesText = this.add.text(16, 48, 'Lives: 3', { fontSize: '32px', fill: '#FFFFFF' });

        // 玩家与敌人子弹碰撞逻辑
        this.physics.add.overlap(my.sprite.player, this.enemyBullets, (player, bullet) => {
            bullet.setVisible(false);
            bullet.setActive(false);
            this.loseLife();
            let boom = this.add.sprite(player.x, player.y, 'Explosion').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
        });
    }

    update(time) {
        let my = this.my;

        // 背景滚动逻辑
        this.background.tilePositionY -= 2;

        // 玩家移动逻辑
        my.sprite.player.update();

        // 更新分数和生命显示
        this.scoreText.setText('Score: ' + this.score);
        this.livesText.setText('Lives: ' + this.lives);

        // 更新玩家和敌人的状态
        my.sprite.enemy1.update(time);
        my.sprite.enemy2.update(time);

        // 子弹位置更新逻辑
        if (this.isShooting === true) {
            my.sprite.bullet.update();
        } else {
            my.sprite.bullet.setPosition(my.sprite.player.x, my.sprite.player.y);
        }

        if (my.sprite.bullet.y < 0) {
            my.sprite.bullet.setVisible(false);
            this.isShooting = false;
        }

        // 子弹发射逻辑
        if (Phaser.Input.Keyboard.JustDown(this.SPACEKey) && this.isShooting === false) {
            my.sprite.bullet.setVisible(true);
            this.isShooting = true;
        }

        // 玩家与敌人碰撞逻辑
        if (Phaser.Geom.Intersects.RectangleToRectangle(my.sprite.player.getBounds(), my.sprite.enemy1.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(my.sprite.player.x, my.sprite.player.y, 'Explosion').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            my.sprite.enemy1.reset();
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(my.sprite.player.getBounds(), my.sprite.enemy2.getBounds())) {
            this.loseLife();
            let boom = this.add.sprite(my.sprite.player.x, my.sprite.player.y, 'Explosion').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            my.sprite.enemy2.reset();
        }
        

        // 子弹与敌人碰撞逻辑
        if (Phaser.Geom.Intersects.RectangleToRectangle(my.sprite.bullet.getBounds(), my.sprite.enemy1.getBounds())) {
            this.addScore(100);
            let boom = this.add.sprite(my.sprite.enemy1.x, my.sprite.enemy1.y, 'Explosion').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            my.sprite.enemy1.reset();
            my.sprite.bullet.setVisible(false);
            this.isShooting = false;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(my.sprite.bullet.getBounds(), my.sprite.enemy2.getBounds())) {
            this.addScore(200);
            let boom = this.add.sprite(my.sprite.enemy2.x, my.sprite.enemy2.y, 'Explosion').setOrigin(0.5, 0.5);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                boom.destroy();
            });
            this.explosionSFX.play();
            my.sprite.enemy2.reset();
            my.sprite.bullet.setVisible(false);
            this.isShooting = false;
        }
    }

    loseLife() {
        this.lives -= 1;
        this.livesText.setText('Lives: ' + this.lives);

        if (this.lives <= 0) {
            this.scene.start('Over', { score: this.score });
        }
    }

    resetGame() {
        this.lives = 3; // 重置生命值
    }
    

    addScore(points) {
        this.score += points;
    }
}

window.Play = Play;
