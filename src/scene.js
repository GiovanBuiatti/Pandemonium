class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('fp', 'assets/tilesets/firstplan.png');
        this.load.image('tp', 'assets/tilesets/thirdplan.png');

        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.atlas('attack', 'assets/animation/attack.png', 'assets/animation/attack.json');
        this.load.atlas('run', 'assets/animation/run.png', 'assets/animation/run.json');
        this.load.atlas('idle', 'assets/animation/idle.png', 'assets/animation/idle.json');
        this.load.atlas('jump', 'assets/animation/jump.png', 'assets/animation/jump.json');
        this.load.atlas('attackD', 'assets/animation/attackD.png', 'assets/animation/attackD.json');
        this.load.atlas('dash', 'assets/animation/dash.png', 'assets/animation/dash.json');
        this.load.atlas('wallslide', 'assets/animation/wallslide.png', 'assets/animation/wallslide.json');
        this.load.atlas('falling', 'assets/animation/falling.png', 'assets/animation/falling.json');
        this.load.atlas('idleEnnemi', 'assets/animation/idleE.png', 'assets/animation/idleE.json');
        this.load.spritesheet('boule', 'assets/fx/boule.png',{ frameWidth: 1024, frameHeight: 1024 });
        this.load.spritesheet('beam', 'assets/fx/beam.png',{ frameWidth: 1024, frameHeight: 1024 });

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {

        this.input.mouse.disableContextMenu();








        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);

        backgroundImage.setScale(1.5, 1);
        backgroundImage.setScrollFactor(0)

        const map = this.make.tilemap({key: 'map'});


        const tileset1 = map.addTilesetImage('firstplan', 'fp');
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        const tileset2 = map.addTilesetImage('thirdplan', 'tp');


        this.thirdP = map.createLayer('troisiemeplan', tileset2);
        this.platforms = map.createLayer('Sol', tileset);
        this.firstP = map.createLayer('premierplan', tileset1);







        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Collide').objects.forEach((col) => {
            const collider = this.add.rectangle(col.x, col.y, col.width, col.height).setOrigin(0,0)
            if(col.name==="stick"){
                collider.name=col.name
            }
            this.collide.add(collider)

        });
        this.ennemi = new Ennemi(this)
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
        this.ennemi.update()









    }
}