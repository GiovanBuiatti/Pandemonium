class Start extends Phaser.Scene {


    preload(){

        this.load.image('MainScreen', 'assets/images/waiting screen.png');
        this.load.image('Play', 'assets/images/bouton_start.png');
        this.load.image('Credits', 'assets/images/bouton_credits.png');
        this.load.atlas('screen', 'assets/images/screen/screen.png', 'assets/images/screen/screen.json');


    }

    create(){
        const menu = this.add.sprite(600, 375, 'screen')
        this.anims.create({
            key: 'screen',
            frameRate: 60,
            frames: this.anims.generateFrameNames('screen', {start: 1, end: 119, prefix: 'waiting screen/waiting screen',suffix:'.jpg',zeroPad:2}),
            repeat: -1,

        })
        menu.setScale(1.1)
        menu.play('screen', true)

        const buttonStartSprite = this.add.image(380, 500)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0.7);


        const buttonCreditsSprite = this.add.image(560, 600)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0.7);


        this.buttonStart = this.add.rectangle(buttonStartSprite.x, buttonStartSprite.y,500,50,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('Start')
            })
            .on('pointerover',function(){
                buttonStartSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonStartSprite.setAlpha(0.7);
            })

        this.buttonCredits = this.add.rectangle(buttonCreditsSprite.x, buttonCreditsSprite.y,140,50,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('credits')
            })
            .on('pointerover',function(){
                buttonCreditsSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonCreditsSprite.setAlpha(0.7);
            })

    }


}