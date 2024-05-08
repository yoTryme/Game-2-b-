// main.js
window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Title, StarGenesis, Credits, GG], // 引用新的 `StarGenesis` 场景
        parent: "phaser-game"
    };

    const game = new Phaser.Game(config);
};
