class GameOver extends Phaser.Scene {
    constructor() {
        super('sceneGameOver')
    }

    create(winner) {
        //init objects
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(2).setScale(1.5)
        
        // title
        let title = this.add.bitmapText(game.config.width/2, 200, 'title-font', 'GAME OVER', 80).setOrigin(.5).setDepth(1).setAlpha(0)

        // winner
        let message = null

        if (winner == 1) {
            message = this.add.bitmapText(game.config.width/2, game.config.height/2, 'title-font', 'P1 WINS!!!', 70).setOrigin(.5).setDepth(1).setAlpha(0)
        } else if (winner == 2) {
            message = this.add.bitmapText(game.config.width/2, game.config.height/2, 'title-font', 'P2 WINS!!!', 70).setOrigin(.5).setDepth(1).setAlpha(0)
        }

        let fight = this.add.bitmapText(game.config.width*2/6, game.config.height - 220, 'reg', '[SPACE] TO FIGHT AGAIN', 20).setOrigin(.5).setAlpha(0)
        let menu = this.add.bitmapText(game.config.width*4/6, game.config.height - 220, 'reg', '[ENTER] TO GO TO START', 20).setOrigin(.5).setAlpha(0)


        let startTween = this.tweens.chain({
            targets: [fight,menu],
            loop: -1,
            paused: true,
            tweens: [
                {
                    alpha: {from: 0, to: 1},
                    duration: 1000,
                    ease: 'Sine.easeInOut'
                },
                {
                    alpha: {from: 1, to: 0},
                    duration: 1000,
                    ease: 'Sine.easeInOut'
                }
            ]

        })


        let fadeIn = this.tweens.add({
            targets: [title, message],
            duration: 2000,
            alpha: {from: 0, to: 1},
            onComplete: () => {
                startTween.play(true)
            }
        })

        this.transitionTween1 = this.tweens.add({
            targets: [title, message, fight, menu],
            paused: true,
            alpha: {from: 1, to: 0},
            duration: 2000,
            ease: 'Sine.easeOut',
            onStart: () => { 
                startTween.stop(true)
            },
            onComplete: () => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scenePlay')
                })
            }
        })


        this.transitionTween2 = this.tweens.add({
            targets: [title, message, fight, menu],
            paused: true,
            alpha: {from: 1, to: 0},
            duration: 2000,
            ease: 'Sine.easeOut',
            onStart: () => { 
                startTween.stop(true)
            },
            onComplete: () => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('sceneMenu')
                })
            }
        })

        this.space = 0
        this.enter = 0
    }

    update() {
        // do this every frame
        const { KEYS } = this

        if (KEYS.START.isDown && this.space == 0) {
            this.space++
            this.transitionTween1.play(true)
        }    

        if (KEYS.MENU.isDown && this.space == 0) {
            this.enter++
            this.transitionTween2.play(true)
        }  
    }
}