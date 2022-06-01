class Ennemi {


    constructor(scene,x,y) {
        this.scene = scene;
        this.emitter=EventDispatcher.getInstance()
        this.Animations()
        this.sprite=this.scene.physics.add.sprite(x, y,'idleEnnemi','idleE1/idleE1.png')
        this.sprite.play('idleE', true)
        this.sprite.body.setSize(90, 150)
        this.scene.physics.add.collider(this.sprite,this.scene.collide)
       
        this.sprite.body.setAllowGravity(false)
        this.sprite.fire=true
        this.dt=0





    }

    update(){
        this.dt++

        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<400 && this.sprite.fire===true && this.dt>200){
             this.fire()

        }
    }

    fire(){
            this.dt=0
            this.boule = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'boule').play('boule').setSize(230, 230).setDisplaySize(300, 300).setBlendMode("ADD")
            this.boule.body.setAllowGravity(false)
            this.scene.physics.moveTo(this.boule, this.scene.player.player.x,this.scene.player.player.y)
            this.boule.setVelocityX(this.boule.body.velocity.x*5)
            this.boule.setVelocityY(this.boule.body.velocity.y*5)
            const life=this.scene.time.delayedCall(4000,()=>{
                this.boule.destroy()
                

           })
            this.scene.physics.add.overlap(this.boule, this.scene.player.player, (boule, player) => {
                player.life-=1
                console.log('yolo')
                this.emitter.emit("toucher")

                boule.destroy()
                // player.body.enable=false
                // player.visible=false
                life.destroy()
                
            }, null, this)
        
        

    }
    Animations(){
        this.scene.anims.create({
            key: 'boule',
            frames: this.scene.anims.generateFrameNumbers('boule', {start: 0, end: 63}),
            frameRate: 120,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idleE',
            frameRate: 8,
            frames: this.scene.anims.generateFrameNames('idleEnnemi', {start: 1, end: 6, prefix: 'idleE1/idleE',suffix:'.png',zeroPad:1}),
            repeat : -1

        })
    }
}



