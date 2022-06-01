const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,
    pixelArt:true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
            fps: 140,
        },
    },
    scene: [new scene(),new Ui()],
};

const game = new Phaser.Game(config);