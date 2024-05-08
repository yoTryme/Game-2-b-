class GG extends Phaser.Scene {
    constructor() {
        super({ key: 'Over' });
    }

    create(data) {
        this.ggText = this.add.text(this.cameras.main.centerX, 120, 'Game Over', {
            font: '60px Arial',
            fill: '#ffffff',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        this.scoreText = this.add.text(this.cameras.main.centerX, 200, 'Score: ' + data.score, {
            font: '30px Arial',
            fill: '#ffffff',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#000000',
                blur: 2,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        this.returnButton = this.add.text(this.cameras.main.centerX, 300, 'Click Here to Return to Title', {
            font: '25px Arial',
            fill: '#ffffff',
            backgroundColor: '#007BFF',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        this.returnButton.on('pointerdown', () => {
            this.scene.start('TitleScene');
            this.scene.get('PlayScene').scene.restart(); // 重启 PlayScene 场景
        });

        this.returnButton.on('pointerover', () => {
            this.returnButton.setStyle({ fill: '#ff0' });
        });

        this.returnButton.on('pointerout', () => {
            this.returnButton.setStyle({ fill: '#ffffff' });
        });
    }
}

window.GG = GG;
