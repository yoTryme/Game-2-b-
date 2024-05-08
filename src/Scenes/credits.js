class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    create() {
        this.creditsText = this.add.text(this.cameras.main.centerX, 50, 'Credits', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.creditsText = this.add.text(this.cameras.main.centerX, 150, 'Game Design by', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.creditsText = this.add.text(this.cameras.main.centerX, 200, 'Jinghang Li', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.creditsText = this.add.text(this.cameras.main.centerX, 250, 'jli758@ucsc.edu', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.returnButton = this.add.text(this.cameras.main.centerX, 550, 'Click Here to Return to Title', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.returnButton.setInteractive();
        this.returnButton.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });
    }
}

window.Credits = Credits;

