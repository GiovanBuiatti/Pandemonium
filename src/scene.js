class scene extends Phaser.Scene {

constructor() {
    super('Start');
}
    preload() {
        this.load.image('background', 'assets/images/background.png');


        this.load.image('fp', 'assets/tilesets/firstplan.png');
        this.load.image('tp', 'assets/tilesets/thirdplan.png');
        this.load.image('sp', 'assets/tilesets/secondplan.png');
        this.load.image('pp', 'assets/tilesets/playerplan.png');
        this.load.image('tourelle', 'assets/images/tourelle.png');
        this.load.image('pvup', 'assets/images/pvu.png');
        this.load.image('pvdown', 'assets/images/pvd.png');
        this.load.image('tuto1', 'assets/images/tuto1.png');
        this.load.image('tuto2', 'assets/images/tuto2.png');
        this.load.image('end', 'assets/images/tuto2.png');
        this.load.image('tuto3', 'assets/images/tuto3.png');
        this.load.image('dk', 'assets/animation/damagetaken.png');
        this.load.image('cricri', 'assets/images/cricri.png');
        this.load.image('sav', 'assets/images/save.png');
        this.load.image('part', 'assets/images/truc.png');




        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.atlas('attack', 'assets/animation/attack.png', 'assets/animation/attack.json');
        this.load.atlas('run', 'assets/animation/run.png', 'assets/animation/run.json');
        this.load.atlas('idle', 'assets/animation/idle.png', 'assets/animation/idle.json');
        this.load.atlas('jump', 'assets/animation/jump.png', 'assets/animation/jump.json');
        this.load.atlas('attackD', 'assets/animation/attackD.png', 'assets/animation/attackD.json');
        this.load.atlas('dash', 'assets/animation/dash.png', 'assets/animation/dash.json');
        this.load.atlas('wallslide', 'assets/animation/wallslide.png', 'assets/animation/wallslide.json');
        this.load.atlas('death', 'assets/animation/death.png', 'assets/animation/death.json');
        this.load.atlas('falling', 'assets/animation/falling.png', 'assets/animation/falling.json');
        this.load.atlas('idleEnnemi', 'assets/animation/idleE.png', 'assets/animation/idleE.json');
        this.load.atlas('ennemiLaser', 'assets/animation/attackA.png', 'assets/animation/attackA.json');
        this.load.atlas('lights', 'assets/images/animlight/light.png', 'assets/images/animlight/light.json');
        this.load.atlas('deathE', 'assets/animation/idleE.png', 'assets/animation/idleE.json');
        this.load.atlas('fxd', 'assets/animation/fx.png', 'assets/animation/fx.json');
        this.load.spritesheet('boule', 'assets/fx/boule.png',{ frameWidth: 1024, frameHeight: 1024 });
        this.load.spritesheet('beam', 'assets/fx/beam.png',{ frameWidth: 1024, frameHeight: 1024 });

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
        this.load.audio('music',['assets/musique.mp3']);
    }


    create() {
        this.scene.launch('Ui')
        this.input.mouse.disableContextMenu();

        this.started = false;

        this.currentSaveX = 1500;
        this.currentSaveY = 3350;


        this.bt=this.sound.add('music',{ loop: true });
        this.bt.play()
        this.bt.volume=0.4

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

        const lumiere = this.add.sprite(650,400,'lights').setOrigin(0, 0).setBlendMode('ADD')

        this.anims.create({
            key: 'lights',
            frameRate: 24,
            frames: this.anims.generateFrameNames('lights', {start: 1, end: 119, prefix: 'Composition 1/Fog_',suffix:'.jpg',zeroPad:5}),
            repeat: -1

        })

        lumiere.play('lights', true)
        lumiere.setScrollFactor(0,0);
        lumiere.setScale(1.2)
        lumiere.setAlpha(0.65)


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
            if(obj.name==='ennemie') {
                this.tourelleSprite = new Ennemi(this, obj.x, obj.y)
                this.groupEnnemie.push(this.tourelleSprite)
            }
            if(obj.name==='ennemielaser'){

                this.tourelleSprite = new Ennemilaser(this, obj.x, obj.y)
                this.tourelleSprite.sprite.name=obj.name
                this.groupEnnemie.push(this.tourelleSprite)
            }
        })




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
            this.tuto2Sprite.setScale(0.7)
        });

        this.tuto3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Tuto3').objects.forEach((tuto3) => {
            this.tuto3Sprite = this.tuto3.create(tuto3.x , tuto3.y - tuto3.height, 'tuto3').setOrigin(0);
            this.tuto3Sprite.setScale(0.7)
        });

        this.groupEnnemie.push(new Ennemi(this,0,0))
        this.player = new Player(this)

        this.End = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('EndGame').objects.forEach((End) => {
            this.EndSprite = this.End.create(End.x , End.y , 'end').setOrigin(0).setVisible(false);
        });
        this.physics.add.overlap(this.player.player, this.EndSprite, this.Credits, null, this);

        //save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Save').objects.forEach((save) => {
            this.saves.create(save.x, save.y- save.height, 'sav').setOrigin(0);
            this.saves.setAlpha(0)
        });
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this);

        this.TourCrist = this.add.particles('part');
        this.TourCrist.createEmitter({
            lifespan: 300,
            speed: 150,
            quantity: 200,
            scale: { start: 0.3, end: 0 },
            on: false
        });

        //collectible
        this.collect = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collectible').objects.forEach((collect) => {
            this.collect.create(collect.x, collect.y- collect.height, 'cricri').setOrigin(0);
        });
        this.physics.add.overlap(this.player.player, this.collect, this.collectible, null, this);



        //CAMERA
        this.cameras.main.startFollow(this.player.player, true, 0.03, 0.03);



        //FONCTIONS
        this.player.initKeyboard()



        console.log('prout')




    }

    collectible(player, collect) {
        collect.destroy();
        this.TourCrist.emitParticleAt(collect.x,collect.y-23);
        window.objet_fragment += 10;
        console.log( window.objet_fragment);
    }

    sauvegarde(player, saves) {
        this.currentSaveX = player.x;
        this.currentSaveY = player.y-10;
        saves.body.enable = false;
        console.log(this.currentSaveX)
    }

    Credits(){
        if (this.started){

        } else {

            this.scene.start('credits')
            this.started = true ;
        }
    }

    update() {

        this.player.move();
        this.player.update()

        // this.isolap = this.physics.overlap(this.player.player, this.tuto1) ? true : false;
        //
        // switch (true){
        //     case this.isolap === true:
        //         this.tuto1Sprite.visible = true;
        //         break;
        //     case this.isolap === false:
        //         this.tuto1Sprite.visible = false;
        //         break;
        // }
        //
        // this.isolap1 = this.physics.overlap(this.player.player, this.tuto2) ? true : false;
        //
        // switch (true){
        //     case this.isolap1 === true:
        //         this.tuto2Sprite.visible = true;
        //         break;
        //     case this.isolap1 === false:
        //         this.tuto2Sprite.visible = false;
        //         break;
        // }
        //
        // this.isolap2 = this.physics.overlap(this.player.player, this.tuto3) ? true : false;
        //
        // switch (true){
        //     case this.isolap2 === true:
        //         this.tuto3Sprite.visible = true;
        //         break;
        //     case this.isolap2 === false:
        //         this.tuto3Sprite.visible = false;
        //         break;
        // }

        this.groupEnnemie.forEach(tourelleSprite => tourelleSprite.update())









    }
}