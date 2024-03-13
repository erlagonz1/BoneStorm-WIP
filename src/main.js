let config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    parent: 'gameCanvas',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    render: {
        pixelArt: true
    },
    width: 960,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            debug: true
        }
    },
    scene: [ Load, Keys, Menu, Tutorial, Play, GameOver ]
}

const game = new Phaser.Game(config)
let { height, width } = game.config

