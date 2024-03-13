class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('screen' ,'ScreenOut.png')
        this.load.image('sword', 'sword.png')
        this.load.image('W', 'W.png')
        this.load.image('A', 'A.png')
        this.load.image('S','S.png')
        this.load.image('D', 'D.png')
        this.load.image('UP', 'UP.png')
        this.load.image('DOWN', 'DOWN.png')
        this.load.image('LEFT', 'LEFT.png')
        this.load.image('RIGHT', 'RIGHT.png')
        this.load.image('fly', 'fly.png')

        this.load.spritesheet('P1Health', 'P1Health.png', {
            frameWidth: 32,
            frameHeight: 20
        })

        this.load.spritesheet('P2Health', 'P2Health.png', {
            frameWidth: 32,
            frameHeight: 20
        })

        this.load.spritesheet('stage','FightStage.png', {
            frameWidth: 1956, 
            frameHeight: 1436
        })

        this.load.spritesheet('lava','lava.png', {
            frameWidth: 1904, 
            frameHeight: 1420
        })

        this.load.spritesheet('p1', 'Character_002.png', {
            frameWidth: 48
        })

        this.load.path = './assets/Fonts/'
        this.load.bitmapFont('reg', 'WhiteBone.png', 'WhiteBone.xml')
        this.load.bitmapFont('title-font', 'BoneFont.png', 'BoneFont.xml')
        this.load.image('M', 'M.png')
        this.load.image('B', 'B.png')


        this.load.path = './assets/Audio/'
        this.load.audio('background', 'Background.mp3')
        this.load.audio('FacePunch', 'FacePunch.mp3')
        this.load.audio('sword', 'sword.mp3')
        this.load.audio('click', 'click.wav')
        this.load.audio('Punch', 'punch.mp3')
        this.load.audio('swish', 'swish.mp3')

    }

    create() {
        // animation definitions

        this.anims.create({
            key: 'stageLava',
            frameRate: 2,
            repeat: -1,
            repeatDelay: 3000,
            frames: this.anims.generateFrameNumbers('stage', { frames: [ 0, 1, 0]} )
        })

        this.anims.create({
            key: 'fallingLava',
            frameRate: 2,
            repeat: -1,
            repeatDelay: 3000,
            frames: this.anims.generateFrameNumbers('lava', { frames: [ 0, 1, 2, 0]} )
        })

        //player animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 3,
                end: 5
            })
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 6,
                end: 8
            })
        })

        this.scene.start('sceneKeys')
    }
}