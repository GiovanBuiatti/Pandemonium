class Player {


    constructor(scene) {
        this.scene = scene;
        this.cameras = scene;
        this.player = this.scene.physics.add.sprite(-1100, 450, 'attack').setOrigin(0, 0);
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
        this.scene.physics.add.collider(this.player, this.scene.collide, this.jumpWall, null, this);
        this.lock=false;
        this.animation();
        this.attaque();
        this.attaqueD();
        this.initKeyboardQWERTY()
        this.direction='droite'
        this.directionjump=1
        this.canJump=true
        this.compteur=0
        this.jumpWallon=false


    }

    animation(){

        this.scene.anims.create({
           key: 'attack',
           frameRate: 14,
           frames: this.scene.anims.generateFrameNames('attack', {start: 1, end: 8, prefix: 'Attack/attack_',suffix:'.png',zeroPad:1}),


        })
        this.scene.anims.create({
            key: 'jump',
            frameRate: 18,
            frames: this.scene.anims.generateFrameNames('jump', {start: 1, end: 7, prefix: 'jump/jump_',suffix:'.png',zeroPad:1}),
        })

        this.scene.anims.create({
            key: 'idle',
            frameRate: 8,
            frames: this.scene.anims.generateFrameNames('idle', {start: 1, end: 8, prefix: 'idle/idle_',suffix:'.png',zeroPad:1}),
            repeat: -1,
        })
        //this.scene.anims.create({
        //  key: 'attackD',
        //   frameRate: 14,
        //   frames: this.scene.anims.generateFrameNames('attackD', {start: 1, end: 9, prefix: 'attackD_',suffix:'.png',zeroPad:1}),


        //})
        this.scene.anims.create({
            key: 'falling',
            frameRate: 12,
            frames: this.scene.anims.generateFrameNames('falling', {start: 1, end: 3, prefix: 'falling/falling_',suffix:'.png',zeroPad:1}),


        })
        this.scene.anims.create({
            key: 'run',
            frameRate: 13,
            frames: this.scene.anims.generateFrameNames('run', {start: 1, end: 13, prefix: 'Run/run_',suffix:'.png',zeroPad:1}),


        })
        this.scene.anims.create({
            key: 'wallslide',
            frameRate: 12,
            frames: this.scene.anims.generateFrameNames('wallslide', {start: 1, end: 3, prefix: 'wallslide/wallslide_',suffix:'.png',zeroPad:1}),
            repeat: -1,

        })
    }

    attaque(direction){

        if(direction==='droite'){
            this.attac = this.scene.add.rectangle(this.player.x+this.player.width-40, this.player.y+this.player.height, 60, 40).setOrigin(0, 0)
        }
        else{
            this.attac = this.scene.add.rectangle(this.player.x-this.player.width+110, this.player.y+this.player.height, 60, 40).setOrigin(0, 0)
        }


        this.attac = this.scene.physics.add.existing(this.attac)
        this.attac.body.setAllowGravity(false);
        this.attac.body.setVelocityY(-700);




        this.scene.time.delayedCall(1000, () => {
            this.attac.destroy()

        });
    }
    attaqueD(){

        this.attacD = this.scene.add.rectangle(this.player.x+40, this.player.y, 50, 40).setOrigin(0, 0)
        this.attacD = this.scene.physics.add.existing(this.attacD)
        this.attacD.body.setAllowGravity(false);
        this.attacD.body.setVelocityY(500);
        this.scene.time.delayedCall(1000, () => {
        this.attacD.destroy()

         });
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
        this.scene.input.on('pointerup', function (pointer) {
            if (pointer.rightButtonReleased()) {
                me.rightMouseDown = true;
            }
        });
    }



    //TOUTES LES FONCTIONS JUSQU'A **MOVE** CONCERNENT LES DEPLACEMENTS !

    //SAUT
    jumpWall(player, collider){

        if(collider.name==="stick")
        {

            this.jumpWallon=true
            this.player.setFlipX(true)
            this.player.play('wallslide', true)


            if(this.jumpWallon===true && this.player.body.velocity.y!=0 && this.spaceDown){
                this.scene.tweens.addCounter(
                    {
                        from: 0,
                        to: 100,
                        duration: 100,
                        ease: 'linear',
                        onUpdate: tween => {this.player.setVelocityX(-700*this.directionjump)},
                        onComplete: tween => {this.jumpWallon=false
                            this.canJump=true
                            this.player.setVelocityX(0)
                        }

                    })
            }
        }


        }


    jump() {

            this.canJump = false
        this.player.play('jump',true)
            this.player.setVelocityY(-500);
    }

    //DEPLACEMENT VERS LA DROITE
    moveRight() {
        this.directionjump=1
        this.player.setVelocityX(300*this.d);
        this.player.setFlipX(false);

        if (this.player.body.onFloor()) {


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
        this.directionjump=-1
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
        if (this.player.body.onFloor()) {
            this.player.setVelocityX(0);
            if(this.canJump===true) {
                this.player.play('idle', true)
            }

        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }


    //CETTE FONCTION INITIALISE TOUS LES DEPLACEMENTS
    move() {
            if(this.player.body.onFloor()){
                this.canJump=true
            }
            if (this.spaceDown && this.canJump) {

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
                this.player.play('attack')
                this.attaque(this.direction);
                this.leftMouseDown=false;
            }
            if (this.rightMouseDown){
                //this.player.play('attackD')
                this.attaqueD();
                this.rightMouseDown=false;

            }
            if(this.player.body.velocity.y > 0){
                this.player.play('falling', true)
            }

            switch (true) {
                case this.qDown:
                    if(this.canJump===true) {
                        this.player.play('run', true)
                    }
                    this.moveLeft()
                    this.direction='gauche'
                    this.flagleft = false;
                    break;
                case this.dDown:
                    if(this.canJump===true) {
                        this.player.play('run', true)
                    }
                    this.moveRight();
                    this.direction='droite'
                    this.flagright = false;
                    break;
                case this.player.body.onFloor():
                    this.stop();
                    break;
                case this.player.body.onFloor(false):
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



