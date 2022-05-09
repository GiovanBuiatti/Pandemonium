const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
            fps: 140,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);