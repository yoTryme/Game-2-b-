class StarGenesis extends Phaser.Scene {
    constructor() {
        super("PlayScene");

        this.my = { sprite: {} };
        this.my.sprite.bullets = [];
        this.my.sprite.enemies = [];
        this.lives = 3;
        this.score = 0;
        this.isShooting = false;
        this.playerSpeed = 10;
        this.bulletSpeed = 10;
        this.enemySpeed = 1.5;

        this.scoreText = null;
        this.livesText = null;

        // Timer
        this.enemyTimer = 0;
        this.enemyInterval = 100; //Increase the spawn interval between enemies. The larger the value, the greater the interval.
    }

    preload() {
        // preload assets
        this.load.setPath("./assets/");
        this.load.image("background", "Backgournd.png");
        this.load.image("ship", "playerShip1_orange.png");
        this.load.image("bullet", "Playerlaser.png");
        this.load.image("enemy1", "enemy1.png");
        this.load.image("enemy2", "enemy2.png");
        this.load.image("Explosion", "laserYellow_burst.png");
        this.load.audio("explosionSFX", "explosionCrunch_000.ogg");
        this.load.audio("laser", "impactMetal_000.ogg");
    }

    create() {
        // set background
        this.background = this.add.tileSprite(0, 0, 800, 600, "background").setOrigin(0, 0);

        // set animation
        this.anims.create({
            key: "explosion",
            frames: [{ key: "Explosion" }],
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        // Player movement controls
        this.leftKey = this.input.keyboard.addKey("A");
        this.rightKey = this.input.keyboard.addKey("D");
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create player
        this.my.sprite.player = this.add.sprite(this.cameras.main.centerX, 500, "ship").setScale(1.5);

        // Show score and lives
        this.scoreText = this.add.text(16, 16, "Score: " + this.score, { fontSize: "32px", fill: "#FFFFFF" });
        this.livesText = this.add.text(16, 48, "Lives: " + this.lives, { fontSize: "32px", fill: "#FFFFFF" });

        // reset game
        this.init_game();
    }

    update(time, delta) {
        // Background scrolling logic
        this.background.tilePositionY -= 2;

        // Player movement logic
        if (this.leftKey.isDown) {
            this.my.sprite.player.x = Math.max(0, this.my.sprite.player.x - this.playerSpeed);
        }
        if (this.rightKey.isDown) {
            this.my.sprite.player.x = Math.min(800, this.my.sprite.player.x + this.playerSpeed);
        }

        // fire bullets
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && !this.isShooting) {
            this.my.sprite.bullets.push(this.add.sprite(this.my.sprite.player.x, this.my.sprite.player.y - 20, "bullet"));
            this.isShooting = true;
        }

        // move bullet
        for (let bullet of this.my.sprite.bullets) {
            bullet.y -= this.bulletSpeed;
        }

        // Clear off-screen bullets
        this.my.sprite.bullets = this.my.sprite.bullets.filter(bullet => bullet.y > -bullet.height);

        if (this.my.sprite.bullets.length === 0) {
            this.isShooting = false;
        }

        // Enemy spawn timer logic
        this.enemyTimer += delta;
        if (this.enemyTimer >= this.enemyInterval) {
            this.enemyTimer = 0;
            if (Phaser.Math.Between(0, 100) < 30) { // Adjust spawn probability to prevent too many
                const enemyType = Phaser.Math.Between(1, 2) === 1 ? "enemy1" : "enemy2";
                this.my.sprite.enemies.push(this.add.sprite(Phaser.Math.Between(50, 750), 0, enemyType).setScale(1.5));
            }
        }

        // Enemies Move 
        for (let enemy of this.my.sprite.enemies) {
            enemy.y += this.enemySpeed;
        }

        // Clear off-screen enemies
        this.my.sprite.enemies = this.my.sprite.enemies.filter(enemy => enemy.y < 700); // 700 可以确保敌人离开屏幕

        // Check bullet and enemy collision
        for (let bullet of this.my.sprite.bullets) {
            for (let enemy of this.my.sprite.enemies) {
                if (this.collides(bullet, enemy)) {
                    bullet.y = -100;
                    enemy.y = 700;
                    this.score += 100;
                    this.sound.play("explosionSFX");
                    this.add.sprite(enemy.x, enemy.y, "Explosion").play("explosion");
                }
            }
        }

        //Check player and enemy collisions
        for (let enemy of this.my.sprite.enemies) {
            if (this.collides(this.my.sprite.player, enemy)) {
                enemy.y = 700;
                this.loseLife();
                this.sound.play("explosionSFX");
                this.add.sprite(this.my.sprite.player.x, this.my.sprite.player.y, "Explosion").play("explosion");
            }
        }

        // Updated score and lives display
        this.scoreText.setText("Score: " + this.score);
        this.livesText.setText("Lives: " + this.lives);
    }

    collides(a, b) {
        return Math.abs(a.x - b.x) < (a.displayWidth / 2 + b.displayWidth / 2) &&
            Math.abs(a.y - b.y) < (a.displayHeight / 2 + b.displayHeight / 2);
    }

    loseLife() {
        this.lives -= 1;
        if (this.lives <= 0) {
            this.scene.start("Over", { score: this.score });
        }
    }

    init_game() {
        this.score = 0;
        this.lives = 3;
        this.isShooting = false;
        this.my.sprite.bullets = [];
        this.my.sprite.enemies = [];
        this.enemyTimer = 0;
    }
}

window.StarGenesis = StarGenesis;
