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
            debug: false,
            fps: 140,
        },
    },
    scene: [new Start(), new scene(),new Ui(), new credits()],
};

const game = new Phaser.Game(config);