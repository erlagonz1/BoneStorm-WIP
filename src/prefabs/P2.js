class P2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)
       
        
        this.P2HealthCount = 0
    }

    getHealthCount() {
        return this.P2HealthCount
    }

    subHealthCount() {
        this.P2HealthCount += 1
    }

    checkGameOver() {
        if (this.P2HealthCount > 9 ){
            return true
        }

    }
}
