class Ennemilaser {


    constructor(scene,x,y) {
        this.scene = scene;
        this.emitter=EventDispatcher.getInstance()
        this.Animations()
        this.sprite=this.scene.physics.add.sprite(x, y,'ennemiLaser','attackA1/attackA1.png')
        this.sprite.play('ennemieAttack', true)
        this.sprite.body.setSize(90, 150)
        this.scene.physics.add.collider(this.sprite,this.scene.collide)

        this.sprite.body.setAllowGravity(false)
        this.sprite.fire=true
        this.dt=0
        this.sprite.setVelocityX(200)
        let flip = false
        this.sprite.time=this.scene.time.addEvent(
            {
                delay: 1000,
                callback: () =>
                {
                    this.sprite.setVelocityX(-this.sprite.body.velocity.x)
                    flip=!flip
                    this.sprite.setFlipX(flip)
                },
                repeat:-1,
            })





    }

    update(){
        this.dt++

        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<600 && this.sprite.fire===true && this.dt>200){
            this.fire()

        }
    }

    fire(){
        this.dt=0
        this.boule = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'beam').play('beam').setSize(400, 150).setDisplaySize(400, 400).setBlendMode("ADD")
        this.boule.body.setAllowGravity(false)
        this.scene.physics.moveTo(this.boule, this.scene.player.player.x,this.sprite.y)
        this.boule.setVelocityX(this.boule.body.velocity.x*4)
        this.boule.setVelocityY(this.boule.body.velocity.y*5)
        const life=this.scene.time.delayedCall(4000,()=>{
            this.boule.destroy()


        })
        this.scene.physics.add.overlap(this.boule, this.scene.player.player, (boule, player) => {
            player.life-=1
            console.log('yolo')
            this.emitter.emit("toucher")
            const fxd = this.scene.add.sprite(player.x, player.y, 'fxd').play('fxd', true).scene.time.delayedCall(1000,() => {

                fxd.destroy()


            });
            boule.destroy()
            // player.body.enable=false
            // player.visible=false
            life.destroy()

        }, null, this)



    }
    Animations(){
        this.scene.anims.create({
            key: 'ennemieAttack',
            frameRate: 8,
            frames: this.scene.anims.generateFrameNames('ennemiLaser', {start: 1, end: 5, prefix: 'attackA1/attackA',suffix:'.png',zeroPad:1}),
            repeat : -1

        })
        this.scene.anims.create({
            key: 'beam',
            frameRate: 30,
            frames:this.scene.anims.generateFrameNumbers('beam', {start: 0, end: 63}),


        })

    }
}



