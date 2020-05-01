var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
	 
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('pic', 'assets/backgrounds/taikodrummaster.jpg');
    this.load.image('mask', 'assets/sprites/ultrasound_beam.png');
    this.load.image('probe', 'assets/sprites/probe.png');
    this.load.spritesheet('speckle',
                'assets/sprites/speckle.png',
                { frameWidth: 80, frameHeight: 101 });
    this.load.image('logo', 'assets/sprites/phaser.png');
}

function create ()
{
    this.add.image(100, 60, 'logo');

    var pic = this.add.image(400, 300, 'pic');

    var spotlight = this.make.sprite({
        x: 800,
        y: 1010,
        key: 'mask',
        add: false
    });
    var probe = this.make.sprite({
        x: 800,
        y: 1010,
        key: 'probe',
        add: true
    });
    
    var speckle = this.make.sprite({
        x: 800,
        y: 1010,
        key: 'speckle',
        add: true
    });


    this.anims.create({
        key: 'speckle_cycle',
        frames: this.anims.generateFrameNumbers('speckle', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    pic.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

    this.input.on('pointermove', function (pointer) {

        spotlight.x = pointer.x;
        spotlight.y = pointer.y;
        probe.x = pointer.x;
        probe.y = pointer.y;
        speckle.x = pointer.x;
        speckle.y = pointer.y;
	speckle.anims.play('speckle_cycle', true)

    });
}

