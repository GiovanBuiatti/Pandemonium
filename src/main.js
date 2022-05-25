const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1920,
    heigth: 1080,
    pixelArt:true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
            fps: 140,
        },
    },
    scene: new scene(),
};

const game = new Phaser.Game(config);