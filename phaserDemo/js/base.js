
var TheGame = {
};

TheGame.Params = {
    //baseWidth: 1920,
    //baseHeight: 1080,
    //iconSize: 364
};

var vtype;
var vtime;
var vvalue;
var timeline = {};
var head;
var eyes;
var body;
var ben;
var clipduration;


var text1_1 = "How do you want to pay for your medical expenses?";
var text1_2 = "Pay a lot less out of my paycheck and more only when I actually need care.";
var text1_3 = "Pay a lot more out of my paycheck and less when I receive care.";

var text2_1 = "2 How do you want to pay for your benefits?";
var text2_2 = "2 I'd prefer to pay more when I need care and less in my premium.";
var text2_3 = "2 I'd prefer to pay less when i need care and more in my premium.";

var text3_1 = "3 How do you want to pay for your benefits?";
var text3_2 = "3 I'd prefer to pay more when I need care and less in my premium.";
var text3_3 = "3 I'd prefer to pay less when i need care and more in my premium.";

var style = { font: "16px Arial", fill: "#ff0044" };
var stageColor = "#eeeeee";
var mainState = "";

var vframes = [
    { viseme: "p", frame: 9 },
    { viseme: "t", frame: 6 },
    { viseme: "T", frame: 11 },
    { viseme: "f", frame: 8 },
    { viseme: "k", frame: 6 },
    { viseme: "i", frame: 4 },
    { viseme: "r", frame: 6 },
    { viseme: "u", frame: 11 },
    { viseme: "s", frame: 6 },
    { viseme: "S", frame: 0 },
    { viseme: "@", frame: 5 },
    { viseme: "a", frame: 4 },
    { viseme: "o", frame: 1 },
    { viseme: "O", frame: 2 },
    { viseme: "E", frame: 6 },
    { viseme: "e", frame: 5 },
    { viseme: "sil", frame: 10 },
];

var gestures = [
    { gesture: "sway", frames: [0, 1, 2, 1, 0] },
    { gesture: "idea", frames: [6, 7, 8, 10, 11, 11, 11, 11, 11, 11, 11, 10, 8, 7, 6] },
];

var vtype;
var vtime;
var vvalue;
var timeline = {};
var head;
var eyes;
var body;
var ben;
var clipduration;

var characterOffsetX = 0;
var characterOffsetY = 130;
var characterScaleX = .70;
var characterScaleY = .70;

TheGame.bootState = function (game) { };
TheGame.bootState.prototype = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('first');
    }
}

TheGame.firstState = function (game) { };
TheGame.firstState.prototype = {

    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    },

    preload: function () {
        game.load.spritesheet('heads', 'heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'bodies.png', 803, 832, 21);
        game.load.json('viseme', 'd81247a6-d59e-4cca-90c6-c2109d13ec7b.json');
        game.load.audio('intro', 'd81247a6-d59e-4cca-90c6-c2109d13ec7b.mp3');

        //game.load.json('viseme', 'testing.json');
        //game.load.audio('intro', 'testing.mp3');
    },

    create: function () {
        var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text1_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text1_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text1_3, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);


        //    game.add.sprite(10,20,'image');
        var prior_vtime = 999;
        var duration = 0;
        var count = 0;
        const default_head = 10;
        var prior_vframe = default_head;
        var i = 0;

        // It's visually distracting when the lip frames change too quickly.
        // set a ms threshold to discard lipsync frames with short durattion
        const viseme_threshold = 35;

        game.stage.backgroundColor = stageColor;
        heads = game.add.sprite(350 + characterOffsetX, 10 + characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + characterOffsetX, 95 + characterOffsetY, 'eyes');
        body = game.add.sprite(99 + characterOffsetX, -45 + characterOffsetY, 'bodies');

        // Created a sprite grouo called ben.  Working with a group of sprites is easier than working with 
        // individual sprites for moving and scaling the character
        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);

        // Set a default head postion for initial postion and after lip sync
        heads.frame = default_head;
        eyes.frame = 1;

        audiotrack = game.add.audio('intro');
        timer = game.time.create(false);

        var gameJSON = game.cache.getJSON('viseme');
        for (var key in gameJSON) {
            if (gameJSON.hasOwnProperty(key)) {
                vtype = gameJSON[key].type;
                vtime = gameJSON[key].time;
                vvalue = gameJSON[key].value;
                if (count > 0) {
                    vframe = getByValue(vframes, vvalue, "viseme").frame;
                    // determine display duration
                    duration = vtime - prior_vtime;
                    // Only display frames with sufficient duration
                    if (duration > viseme_threshold) {
                        for (i = i; i < Math.round(vtime / 10); i++) {
                            timeline[i] = { "head": prior_vframe };
                        }
                        timeline[i] = { "head": vframe };
                    }
                    prior_vtime = vtime;
                    prior_vframe = vframe;
                }
            }
            count++;
        }

        // Add 1/2 second of default head position.. This helps account for missed ticks and timing differences between
        // phaser vs. audio file timing 
        var extension = i + 50;
        for (i = i + 1; i <= extension; i++) {
            timeline[i] = { "head": default_head };
        }
        clipduration = i;
        // Ends Lipsyncing / clip setup 

        // Start body setup.. default to body 0
        for (i = 0; i < clipduration; i++) {
            { timeline[i].body = 0; }
        }
        addgesture(getByValue(gestures, "idea", "gesture"), 840, clipduration, 10);

        // Scale sprite group to 55%
        ben.scale.setTo(characterScaleX, characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();
    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
            body.frame = timeline[tick].body;
        }
    },

    render: function () {
        //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        //game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        //game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
        //game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);
    }
};

function getByValue(arr, value, mykey) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
        if (arr[i][mykey] === value) return arr[i];
    }
}

function up(item) {
    //item.text = "thanks for clicking!";
    audiotrack.destroy();
    if (game.state.current == "first") {//**************************************
        game.state.start('second');
    } else if (game.state.current == "second") {
        game.state.start('third');
    } else if (game.state.current == "third") {
        game.state.start('first');
        $("#results").css("display", "block");
    } else if (game.state.current == "wait") {
        if (mainState === "first") {
            game.state.start('second');
        } else if (mainState === "second") {
            game.state.start('third');
        } else if (mainState === "third") {
            game.state.start('first');
        }
    }
}

function addgesture(obj, position, clipduration, rep) {
    obj.frames.forEach(function (element) {
        for (i = 0; i < rep; i++) {
            timeline[position].body = element;
            position++;
        }
    });
}

function blink(sprite) {
    // Random number between 0 and 20.
    var frame = Math.floor(Math.random() * 18);
    // If frame 0-7, then display that frame.
    if (frame < 10)
    { sprite.frame = frame; }
    // Else, display the default frame. Frame 1.
    else { sprite.frame = 1; }
}

var game;
window.onload = function () {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');
    game.state.add('boot', TheGame.bootState);
    game.state.add('first', TheGame.firstState);
    game.state.start('boot');
};
