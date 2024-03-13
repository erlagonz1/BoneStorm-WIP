//***************************************************
// CREATED BY: AYUSH BANDOPADHYAY, ERIC GONZALEZ
// ALL CODE DONE ON ONE COMPUTER, WE ARE ROOMMATES
//*************************************************** 

// COMPONENTS USED: Tween, Animation, Physics, Text Objects, Sound, Timer

// Credits to assets
// Background, Visuals, Characters: Ayush Bandopadhyay
// Font: Google Fonts: Kelly Slab
// Keyboard keycap assets by nartGraphic on Vecteezy.com
// Punch sound 1 by happy? on Youtube
// Punch sound 2 by Pixabay on Pixabay
// Woosh sound by floraphonic on Pixabay
// Sword sound by CPhT Fluke on Youtube
// Click sound from Mixkit
// Background Music: Royalty Free Doom Music by Jacob Lizotte


class Menu extends Phaser.Scene {
    constructor() {
        super("sceneMenu")
    }    

    create() {
        // keys
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(1).setScale(1.5)

        //Title
        let B = this.add.sprite(game.config.width/2 - 211, game.config.height/2 - 58, 'B').setOrigin(0.5).setScale(.4).setAlpha(0)

        let mid = this.add.bitmapText(game.config.width/2, game.config.height/2, 'title-font', 'ONESTOR', 80).setOrigin(.5).setAlpha(0)

        let M = this.add.sprite(game.config.width/2 + 201, game.config.height/2 + 43, 'M').setOrigin(0.5).setScale(.5).setAlpha(0)

        let start = this.add.bitmapText(game.config.width/2, game.config.height/2 + 90, 'reg', '[SPACE] TO START', 20).setOrigin(.5).setAlpha(0)

        let sword = this.add.sprite(game.config.width/2, game.config.height/2 + 10, 'sword').setOrigin(0.5).setScale(1.5).setAlpha(0).setAngle(-45).setDepth(-1)

        let startTween = this.tweens.chain({
            targets: start,
            loop: -1,
            paused: true,
            tweens: [
                {
                    alpha: {from: 0, to: 1},
                    duration: 1000,
                    ease: 'Sine.easeIn'
                },
                {
                    alpha: {from: 1, to: 0},
                    duration: 1000,
                    ease: 'Sine.easeOut'
                }
            ]

        })

        let titleTween = this.tweens.add({
            targets: [B, mid, M, start],
            alpha: {from: 0, to: 1},
            duration: 3000,
            ease: 'Sine.easeIn',
            onComplete: () => {
                startTween.play(true)
            }
        })

        let swordSound = this.sound.add('sword')

        this.swordTween = this.tweens.add({
            targets: sword,
            paused: true,
            alpha: 1,
            y: {from: -400, to: this.game.config.height/2 + 10},
            duration: 1000,
            ease: 'Bounce.easeIn',
            onStart: () => {
                this.time.delayedCall(600, () => {
                    swordSound.play()                
                })
            }
        })

        this.transitionTween = this.tweens.add({
            targets: [start, B, mid, M, sword],
            paused: true,
            alpha: {from: 1, to: 0},
            duration: 2000,
            ease: 'Sine.easeOut',
            onStart: () => { 
                startTween.stop(true)
            },
            onComplete: () => {
                this.scene.start('sceneTutorial')
            }
        })

        // click sound

        this.click = this.sound.add('click')


        // prevent spamming
        this.space = 0
    }

    update() {
        const { KEYS } = this

        if (KEYS.START.isDown && this.space == 0) {
            this.space++
            this.click.play()
            this.swordTween.play(true)
            this.time.delayedCall(1500, () => {
                this.transitionTween.play(true)
            }) 
        }

    }
}