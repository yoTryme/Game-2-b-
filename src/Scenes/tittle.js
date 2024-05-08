class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        // 标题文本
        this.titleText = this.add.text(this.cameras.main.centerX, 100, 'Star Genesis', {
            font: '60px Arial',
            fill: '#ffffff',
            align: 'center',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        // 开始游戏按钮
        this.startGameButton = this.add.text(this.cameras.main.centerX, 250, 'Click Here to Start Game', {
            font: '30px Arial',
            fill: '#ffffff',
            backgroundColor: '#007BFF',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        // 查看Credits按钮
        this.creditsButton = this.add.text(this.cameras.main.centerX, 320, 'You can click here to check Credits', {
            font: '25px Arial',
            fill: '#ffffff',
            backgroundColor: '#28A745',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        // 游戏提示文本
        this.tipText = this.add.text(this.cameras.main.centerX, 400, 'Use Arrow Keys or A/D to move and Space to shoot', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // 按钮事件
        this.startGameButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });

        this.creditsButton.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });

        // 鼠标悬停效果
        this.startGameButton.on('pointerover', () => {
            this.startGameButton.setStyle({ fill: '#ff0' });
        });

        this.startGameButton.on('pointerout', () => {
            this.startGameButton.setStyle({ fill: '#ffffff' });
        });

        this.creditsButton.on('pointerover', () => {
            this.creditsButton.setStyle({ fill: '#ff0' });
        });

        this.creditsButton.on('pointerout', () => {
            this.creditsButton.setStyle({ fill: '#ffffff' });
        });
    }
}

window.Title = Title;
