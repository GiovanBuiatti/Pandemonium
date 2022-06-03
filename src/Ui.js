class Ui extends Phaser.Scene {
    constructor() {
        super({key:'Ui'});
    }
    preload(){
        this.load.image('pvu', 'assets/images/pvu.png')
        this.load.image('pvd', 'assets/images/pvd.png')
        this.load.image('point', 'assets/images/points.png')

    }
    create(){


        this.add.sprite(100,120,'point')
            .setDisplaySize(125,64);

        this.count1 = this.add.text(160 ,125 , window.objet_fragment,{
            color: '#ffffff',
            fontFamily: 'American Typewriter, serif',
            fontSize : 25
        })
            .setOrigin(0.5)
            .setAlpha(1);

        //PV
        this.emitter=EventDispatcher.getInstance()
        this.groupeLife=[]
        this.life=5
        for (let i =0;i<this.life;i++) {
            const life=this.add.image(40+i*40, 50, 'pvu')
            this.groupeLife.push(life)
        }
        this.emitter.on("toucher",this.handlelife,this)
        this.emitter.on("respawn",this.handlerespawn,this)




    }
    handlelife(){
        if(this.life>=0) {
            this.life--
            this.groupeLife[this.life].setTexture('pvd')

        }
    }
    handlerespawn(){

        this.life=5

        for (let i =0;i<=this.groupeLife.length-1;i++) {
            this.groupeLife[i].setTexture('pvu')

        }
    }
    update(){
        this.count1.setText(Math.round(window.objet_fragment));
    }
}