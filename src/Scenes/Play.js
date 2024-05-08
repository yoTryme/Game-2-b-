class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.my = { sprite: {} };
        this.lives = 3;
        this.score = 0;
        this.isShooting = false;

    }

    preload() {
        //Load assets
        this.load.image('background', 'assets/Backgournd.png');
        this.load.image('ship', 'assets/playerShip1_orange.png');
        this.load.image('bullet', 'assets/Playerlaser.png');
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('enemy2', 'assets/enemy2.png');
        this.load.image('Explosion', 'assets/laserYellow_burst.png');
    //  this.load.image('enemybullet', 'assets/enemylaser.png');
        this.load.audio('explosionSFX', 'assets/explosionCrunch_000.ogg');
        this.load.audio('laser', 'assets/impactMetal_000.ogg');
    }

    create() {
        let my = this.my;

        //Background scrolling logic
        this.background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0);


        // Player move
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create the main sprite and its attributes
        my.sprite.player = new Player(this, this.cameras.main.centerX, 500, 'ship', 0, this.AKey, this.DKey).setScale(2.0);
        my.sprite.bullet = new Bullet(this, my.sprite.player.x, my.sprite.player.y, 'bullet').setOrigin(0.5, 0.5);
        my.sprite.bullet.visible = false;

        // Create enemies
        my.sprite.enemy1 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'enemy1', 1).setScale(2.0).setFlipY(true);
        my.sprite.enemy2 = new Enemy_Rogue(this, Phaser.Math.Between(0, 700), 0, 'enemy2', 1.5).setScale(2.0).setFlipY(true);

        // Create visual effects
        this.anims.create({
            key: 'explosion',
            frames: [{ key: 'Explosion' }],
            frameRate: 20,
            repeat: 0
        });

        // Create sound effects
        this.explosionSFX = this.sound.add('explosionSFX');

        // HP and score tracking
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        this.livesText = this.add.text(16, 48, 'Lives: 3', { fontSize: '32px', fill: '#FFFFFF' });

        // Player and enemy bullet collision logic
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

        // Background scrolling logic
        this.background.tilePositionY -= 2;

        // player move
        my.sprite.player.update();

        // update score and lives
        this.scoreText.setText('Score: ' + this.score);
        this.livesText.setText('Lives: ' + this.lives);

        // update enemies
        my.sprite.enemy1.update(time);
        my.sprite.enemy2.update(time);

        // Bullet position update logic
        if (this.isShooting === true) {
            my.sprite.bullet.update();
        } else {
            my.sprite.bullet.setPosition(my.sprite.player.x, my.sprite.player.y);
        }

        if (my.sprite.bullet.y < 0) {
            my.sprite.bullet.setVisible(false);
            this.isShooting = false;
        }

        // Bullet firing logic
        if (Phaser.Input.Keyboard.JustDown(this.SPACEKey) && this.isShooting === false) {
            my.sprite.bullet.setVisible(true);
            this.isShooting = true;
        }

        // Player and enemy collision logic
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
        

        // Bullet and enemy collision logic
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
        this.lives = 3; // reset lives
        this.score = 0; // reset score
    }
    

    addScore(points) {
        this.score += points;
    }
}

window.Play = Play;
