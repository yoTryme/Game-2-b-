class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.playerShipScene = new PlayerShip();
    }

    preload() {
        this.load.setPath('./assets/');
        this.load.image('background', 'Backgournd.png');

    }

    create() {
        this.add.image(325, 300, 'background').setDisplaySize(650, 600);

        this.scene.add('PlayerShipScene', this.playerShipScene, true);
    }

    update(time, delta) {
        this.playerShipScene.update(time, delta);
    }
}
