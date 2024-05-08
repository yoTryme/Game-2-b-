let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        window.Title,
        window.Play,
        window.Credits,
        window.GG
    ]
};
let game = new Phaser.Game(config);
