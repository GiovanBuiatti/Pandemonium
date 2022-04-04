class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {



        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(1, 0.8);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createStaticLayer('Sol', tileset);
        this.mur = map.createStaticLayer('mur', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.mur.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)

        this.cameras.main.startFollow(this.player.player,false);
        this.initKeyboard()

    }
    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    me.dash=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;

                    if (me.player.player.body.onFloor())
                    {
                        me.player.jump();//LE JOUR VA A UNE VITESSE DE 330 VERS LE HAUT
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rightDown=true;
                    me.player.moveRight();//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE
                    //ET ON LUI DEMANDE DE LANCER L'ANIMATION RIGHT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.leftDown=true;
                    me.player.moveLeft();//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A GAUCHE
                    //ET ON LUI DEMANDE DE LANCER L'ANIMATION LEFT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.player.stop()
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.player.stop()
                    break;

            }
        });
    }


    update() {
        console.log(this.player.player.body.onWall())








    }
}