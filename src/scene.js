class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.atlas('attack', 'assets/animation/attack.png', 'assets/animation/attack.json');
        this.load.atlas('run', 'assets/animation/run.png', 'assets/animation/run.json');
        this.load.atlas('idle', 'assets/animation/idle.png', 'assets/animation/idle.json');
        this.load.atlas('attackD', 'assets/animation/attackD.png', 'assets/animation/attackD.json');
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



        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Collide').objects.forEach((col) => {
            const collider = this.add.rectangle(col.x, col.y, col.width, col.height).setOrigin(0,0)
            this.collide.add(collider)

        });

        this.player = new Player(this)













        //CAMERA
        this.cameras.main.startFollow(this.player.player, true, 0.03, 0.03);



        //FONCTIONS
        this.player.initKeyboard()



        console.log('prout')



    }




    update() {

        this.player.move();
        this.player.update()
        console.log(this.player.player.body.onWall())



    }
}