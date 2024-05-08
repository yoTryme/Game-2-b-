// main.js
window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Title, StarGenesis, Credits, GG],
        parent: "phaser-game"
    };

    const game = new Phaser.Game(config);
};
