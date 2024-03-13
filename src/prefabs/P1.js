class P1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)
       
        
        this.P1HealthCount = 0
    }

    getHealthCount() {
        return this.P1HealthCount
    }

    subHealthCount() {
        this.P1HealthCount += 1
    }

    checkGameOver() {
        if (this.P1HealthCount > 9 ){
            return true
        }

    }
}

