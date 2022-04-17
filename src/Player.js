class Player {


    constructor(scene) {
        this.scene = scene;
        this.cameras = scene;
        this.player = this.scene.physics.add.sprite(50, 300, 'player');
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.onWall = false;


    }


    //ICI ON MET NOS RACCOURCIS !
  dash(){
      this.tween = this.scene.tweens.add({

          targets: this.player,
          ease: 'Circ.easeInOut',
          duration: 250,
          x: 200,


      });
      console.log('dash');
  }

    initKeyboard() {
        let me = this;

        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;
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



    //TOUTES LES FONCTIONS JUSQU'A **MOVE** CONCERNENT LES DEPLACEMENTS !

    //SAUT
    jump() {
        if (this.player.body.onFloor()){
            this.player.setVelocityY(-450);
            console.log('jump');
        }
    }

    //DEPLACEMENT VERS LA DROITE
    moveRight() {
        this.player.setVelocityX(300);
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
        this.player.setVelocityX(-300);
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

            if (this.spaceDown) {
                this.jump();
                this.flag = false;
            }
            if (this.shiftDown){
                this.dash();

            }

            switch (true) {
                case this.qDown:
                    this.moveLeft()
                    this.flagleft = false;
                    break;
                case this.dDown:
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



}



