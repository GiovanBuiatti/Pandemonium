class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('fp', 'assets/tilesets/firstplan.png');
        this.load.image('tp', 'assets/tilesets/thirdplan.png');
        this.load.image('sp', 'assets/tilesets/secondplan.png');
        this.load.image('pp', 'assets/tilesets/playerplan.png');
        this.load.image('tourelle', 'assets/images/tourelle.png');
        this.load.image('pvup', 'assets/images/pvu.png');
        this.load.image('pvdown', 'assets/images/pvd.png');
        this.load.image('tuto1', 'assets/images/tuto1.png');
        this.load.image('tuto2', 'assets/images/tuto2.png');
        this.load.image('tuto3', 'assets/images/tuto3.png');
        for(let i=1;i<=149;i++){
            this.load.image('lumiere'+i, 'assets/images/beam/levelgraph (2)'+i+'.png');
        }



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


        const backgroundImage = this.add.image(0, 600, 'background').setOrigin(0, 0);


        backgroundImage.setScrollFactor(1)

        const map = this.make.tilemap({key: 'map'});


        const tileset1 = map.addTilesetImage('firstplan', 'fp');

        const tileset = map.addTilesetImage('playerplan', 'pp');
        const tileset2 = map.addTilesetImage('thirdplan', 'tp');
        const tileset3 = map.addTilesetImage('secondplan', 'sp');


        this.thirdP = map.createLayer('troisiemeplan', tileset2);
        this.secondP = map.createLayer('secondplan', tileset3);
        this.platforms = map.createLayer('planjoueur', tileset);
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
       this.groupEnnemie=[]
        map.getObjectLayer('ennemi').objects.forEach((obj) => {
             this.tourelleSprite = new Ennemi(this,obj.x,obj.y)
            this.groupEnnemie.push(this.tourelleSprite)
            })

        this.groupEnnemie.push(new Ennemi(this,0,0))

        this.player = new Player(this)


        this.tuto1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Tuto1').objects.forEach((tuto1) => {
            this.tuto1Sprite = this.tuto1.create(tuto1.x , tuto1.y - tuto1.height, 'tuto1').setOrigin(0);
        });

        this.tuto2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Tuto2').objects.forEach((tuto2) => {
            this.tuto2Sprite = this.tuto2.create(tuto2.x , tuto2.y - tuto2.height, 'tuto2').setOrigin(0);
        });

        this.tuto3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Tuto3').objects.forEach((tuto3) => {
            this.tuto3Sprite = this.tuto3.create(tuto3.x , tuto3.y - tuto3.height, 'tuto3').setOrigin(0);
        });






        //CAMERA
        this.cameras.main.startFollow(this.player.player, true, 0.03, 0.03);



        //FONCTIONS
        this.player.initKeyboard()



        console.log('prout')



    }




    update() {

        this.player.move();
        this.player.update()

        this.isolap = this.physics.overlap(this.player.player, this.tuto1) ? true : false;

        switch (true){
            case this.isolap === true:
                this.tuto1Sprite.visible = true;
                break;
            case this.isolap === false:
                this.tuto1Sprite.visible = false;
                break;
        }

        this.isolap1 = this.physics.overlap(this.player.player, this.tuto2) ? true : false;

        switch (true){
            case this.isolap1 === true:
                this.tuto2Sprite.visible = true;
                break;
            case this.isolap1 === false:
                this.tuto2Sprite.visible = false;
                break;
        }

        this.isolap2 = this.physics.overlap(this.player.player, this.tuto3) ? true : false;

        switch (true){
            case this.isolap2 === true:
                this.tuto3Sprite.visible = true;
                break;
            case this.isolap2 === false:
                this.tuto3Sprite.visible = false;
                break;
        }

        this.groupEnnemie.forEach(tourelleSprite => tourelleSprite.update())









    }
}