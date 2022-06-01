class Ui extends Phaser.Scene {
    constructor() {
        super({key:'Ui'});
    }
    preload(){
        this.load.image('pvu', 'assets/images/pvu.png')
        this.load.image('pvd', 'assets/images/pvd.png')
    }
    create(){
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

    }
}