class Tutorial extends Phaser.Scene {
    constructor() {
        super('sceneTutorial')
    }

    create() {
        //init objects
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(1).setScale(1.5)

        //Title

        let title = this.add.bitmapText(game.config.width/2, 150, 'title-font', 'TUTORIAL', 80).setOrigin(.5).setAlpha(0)

        //P1 controls

        let  p1Label = this.add.bitmapText(game.config.width*3/10, game.config.height/2 + 70, 'title-font', 'P1', 40).setOrigin(.5).setAlpha(0)

        let W = this.add.sprite(game.config.width*3/10, game.config.height/2 - 80, 'W').setOrigin(.5).setScale(.5).setAlpha(0)
        let A = this.add.sprite(game.config.width/5 + 15, game.config.height/2, 'A').setOrigin(.5).setScale(.5).setAlpha(0)
        let S = this.add.sprite(game.config.width* 3/10, game.config.height/2, 'S').setOrigin(.5).setScale(.5).setAlpha(0)
        let D = this.add.sprite(game.config.width*4/10 - 15, game.config.height/2, 'D').setOrigin(.5).setScale(.5).setAlpha(0)

        let  p2Label = this.add.bitmapText(game.config.width*7/10, game.config.height/2 + 70, 'title-font', 'P2', 40).setOrigin(.5).setAlpha(0)

        let UP = this.add.sprite(game.config.width*7/10, game.config.height/2 - 80, 'UP').setOrigin(.5).setScale(.5).setAlpha(0)
        let DOWN = this.add.sprite(game.config.width*7/10, game.config.height/2, 'DOWN').setOrigin(.5).setScale(.5).setAlpha(0)
        let LEFT = this.add.sprite(game.config.width*3/5 + 15, game.config.height/2, 'LEFT').setOrigin(.5).setScale(.5).setAlpha(0)
        let RIGHT = this.add.sprite(game.config.width*4/5 - 15, game.config.height/2, 'RIGHT').setOrigin(.5).setScale(.5).setAlpha(0)

        // Instruction text
        let  p1Text = this.add.bitmapText(game.config.width*3/10, game.config.height/2 + 160, 'reg', '[A] and [D] to move\n[W] to attack\n[S] to grab', 25, 1).setOrigin(.5).setAlpha(0)
        let  p2Text = this.add.bitmapText(game.config.width*7/10, game.config.height/2 + 160, 'reg', '[LEFT] and [RIGHT] to move\n[UP] to attack\n[DOWN] to grab', 25, 1).setOrigin(.5).setAlpha(0)

        let start = this.add.bitmapText(game.config.width/2, game.config.height - 110, 'reg', '[SPACE] TO FIGHT', 20).setOrigin(.5).setAlpha(0)


        let startTween = this.tweens.chain({
            targets: start,
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

        let introTween = this.tweens.add({
            targets: [title, p1Label, W, A, S, D, p2Label, UP, DOWN, LEFT, RIGHT, p1Text, p2Text, start],
            alpha: {from: 0, to: 1},
            duration: 2000,
            ease: 'Sine.easeIn',
            onComplete: () => {
                startTween.play(true)
            }
        })

        
        this.transitionTween = this.tweens.add({
            targets: [W,A,S,D, p2Label, p1Label, p1Text, p2Text, UP, DOWN, LEFT, RIGHT, title, start],
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

        // click sounc
        this.click = this.sound.add('click')

        // prevent spamming
        this.space = 0
    }

    update() {
        const { KEYS } = this

        if (KEYS.START.isDown && this.space == 0) {
            this.space++
            this.click.play()
            this.transitionTween.play(true)
        }    
    }
}