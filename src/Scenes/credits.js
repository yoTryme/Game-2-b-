class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    create() {
        this.creditsTitle = this.add.text(this.cameras.main.centerX, 80, 'Credits', {
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

        this.designByText = this.add.text(this.cameras.main.centerX, 180, 'Game Design by', {
            font: '30px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.designerNameText = this.add.text(this.cameras.main.centerX, 230, 'Jinghang Li', {
            font: '30px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.emailText = this.add.text(this.cameras.main.centerX, 280, 'jli758@ucsc.edu', {
            font: '25px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.returnButton = this.add.text(this.cameras.main.centerX, 500, 'Click Here to Return to Title', {
            font: '25px Arial',
            fill: '#ffffff',
            backgroundColor: '#007BFF',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        this.returnButton.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });

        this.returnButton.on('pointerover', () => {
            this.returnButton.setStyle({ fill: '#ff0' });
        });

        this.returnButton.on('pointerout', () => {
            this.returnButton.setStyle({ fill: '#ffffff' });
        });
    }
}

window.Credits = Credits;
