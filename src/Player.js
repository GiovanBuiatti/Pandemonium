class Player {


    constructor(scene) {
        this.scene = scene;
        this.cameras = scene;
        this.player = this.scene.physics.add.sprite(50, 600, 'attack').setOrigin(0, 0);
        this.player.body.setSize(50, 112)
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.onWall = false;

        this.d = 1;
        this.lockDash=0;
        this.spaceDown=false;
        this.shiftDown=false;
        this.qDown=false;
        this.dDown=false;
        this.scene.physics.add.collider(this.player, this.scene.collide, this.jumpWall(this.player, this.scene.collide), null, this);
        this.lock=false;
        this.animation();
        this.attaque();
        this.initKeyboardQWERTY()

    }

    animation(){

        this.scene.anims.create({
            key: 'attack',
            frameRate: 14,
            frames: this.scene.anims.generateFrameNames('attack', {start: 1, end: 8, prefix: 'attack_',suffix:'.png',zeroPad:1}),


        })


        this.scene.anims.create({
            key: 'idle',
            frameRate: 4,
            frames: this.scene.anims.generateFrameNames('attack', {start: 1, end: 2, prefix: 'attack_',suffix:'.png',zeroPad:1}),
            repeat: -1,

        })
        this.scene.anims.create({
            key: 'run',
            frameRate: 13,
            frames: this.scene.anims.generateFrameNames('run', {start: 1, end: 13, prefix: 'run_',suffix:'.png',zeroPad:1}),


        })
    }

    attaque(){

        this.attac = this.scene.add.rectangle(this.player.x+this.player.width-40, this.player.y, 100, 40).setOrigin(0, 0)

        this.attac = this.scene.physics.add.existing(this.attac)
        this.attac.body.setAllowGravity(false);
        this.attac.body.setVelocityY(700);


        console.log(this.attac.x, this.attac.y, this.player.x, this.player.y)
    }

    //ICI ON MET NOS RACCOURCIS !
  dashR(){
      if(this.dDown && this.shiftDown) {
          if (this.lockDash == 0) {
              this.lockDash = 1
              let me = this;
              this.tween = this.scene.tweens.add({
                  targets: this,
                  d: '+=10',
                  ease: 'Circ.easeInOut',
                  duration: 250,
                  onComplete: function () {
                      me.d = 1
                      me.shiftDown = false;
                      me.lockDash = 0
                  }
              });
          }
      }
      console.log('dash');
  }
    dashL() {
        if (this.qDown && this.shiftDown) {
            if (this.lockDash == 0) {
                this.lockDash = 1
                let me = this;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    d: '+=10',
                    ease: 'Circ.easeInOut',
                    duration: 250,
                    onComplete: function () {
                        me.d = 1
                        me.shiftDown = false;
                        me.lockDash = 0
                    }
                });
            }
            console.log('dash');
        }
    }

    initKeyboard() {
        let me = this;

        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown = true;

                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=false;
                    me.lock=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=false;
                    break;
            }
        });
    }
    initKeyboardQWERTY() {
        let me = this;
        this.scene.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {

                me.leftMouseDown = true;

            }
        });
    }



    //TOUTES LES FONCTIONS JUSQU'A **MOVE** CONCERNENT LES DEPLACEMENTS !

    //SAUT
    jumpWall(player, collider){
        let me = this;
        if(player.body.onWall() && me.spaceDown && !me.lock){

            this.player.setVelocityY(450);

            me.lock=true;
        }
        console.log('oeee', player.body.onWall());

    }
    jump() {
        this.player.setVelocityY(-450);
        console.log('jump');
    }

    //DEPLACEMENT VERS LA DROITE
    moveRight() {

        this.player.setVelocityX(300*this.d);
        this.player.setFlipX(false);

        if (this.player.body.onFloor()) {

            // this.player.play('walk', true)
        }
    }

    moveRightRelease() {
        // ralenti droite
        switch (true) {
            case this.flagright:
                // fais rien
                break;
            case !this.dDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagright = true;
                break;
            default:
                break;
        }
    }


    //DEPLACEMENT VERS LA GAUCHE
    moveLeft() {
        this.player.setVelocityX(-300*this.d);
        this.player.setFlipX(true)
        if (this.player.body.onFloor()) {
            // this.player.play('walk', true)
        }
        this.player.setFlipX(true);
    }

    moveLeftRelease() {
        // ralenti gauche
        switch (true) {
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagleft = true;
                break;
            default:
                break;
        }
    }

    //CETTE FONCTION SERT A ARRETER LE JOUEUR QUAND ON VA VERS LA DROITE/GAUCHE. SINON ON COURS SANS S'ARRETER QUAND ON KEYUP.
    stop() {
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            //this.player.play('idle',true)
        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }


    //CETTE FONCTION INITIALISE TOUS LES DEPLACEMENTS
    move() {

            if (this.spaceDown && this.player.body.onFloor()) {
                this.jump();

                this.flag = false;
            }

            if (this.qDown && this.shiftDown){
                this.dashL();
            }
            if (this.dDown && this.shiftDown){

                this.dashR();
             }
            if (this.leftMouseDown){
                this.player.play('attack', true)
                this.attaque();
                this.leftMouseDown=false;
                console.log('ouoi')
            }

            switch (true) {
                case this.qDown:
                    this.player.play('run', true)

                    this.moveLeft()
                    this.flagleft = false;
                    break;
                case this.dDown:
                    this.player.play('run', true)
                    this.moveRight();
                    this.flagright = false;
                    break;
                case this.player.body.onFloor():
                    this.stop();
                    break;
            }
        this.moveRightRelease();
        this.moveLeftRelease();
        }

        update(){
            if(this.attac.y>this.player.y+this.player.height){
                this.attac.destroy()
            }


        }



}



