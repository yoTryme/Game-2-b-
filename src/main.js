let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 650,
    height: 600,
    scene: [GameScene]
}

const game = new Phaser.Game(config);