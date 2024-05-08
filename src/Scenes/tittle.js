class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        this.titleText = this.add.text(this.cameras.main.centerX, 150, 'Star Genesis', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.startGamebutton = this.add.text(this.cameras.main.centerX, 250, 'Click Here to Start Game', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.creditsbutton = this.add.text(this.cameras.main.centerX, 300, 'Credits', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.tipText = this.add.text(this.cameras.main.centerX, 350, 'Use Arrow Keys or A/D to move and Space to shoot', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.startGamebutton.setInteractive();
        this.creditsbutton.setInteractive();

        this.startGamebutton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });

        this.creditsbutton.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });
    }
}

window.Title = Title;
