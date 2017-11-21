
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

var text2_1 = "How often do you think you’ll go to a doctor during the year?";
var text2_2 = "Rarely. 1 or 2 total visits for a minor illness or injury";
var text2_3 = "Occasionally. 3 to 7 total visits for minor illnesses or injuries.";
var text2_4 = "Frequently. 8 or more total visits, or dealing with a serious health condition.";
var text2_5 = "I will only go for my preventive visits.";

var text3_1 = "Will you or anyone you cover need dental care next year?";
var text3_2 = "Yes.";
var text3_3 = "No.";

var text4_1 = "Are you worried about having enough money to pay for medical expenses in retirement?";
var text4_2 = "Yes.  Saving for retirement is a top priority.";
var text4_3 = "Maybe.  It’s not my top priority, but I’m beginning to focus more on saving for retirement.";
var text4_4 = "No.  Saving for retirement is not currently a top priority.";

var text5_1 = "Would the life insurance that your company provides you at no cost pay off all of your debts?";
var text5_2 = "Yes, I am confident that all my debts would be paid off with the amount of life insurance the company provides.";
var text5_3 = "No, I am not confident that I would be able to pay off all my debts with the amount of life insurance the company provides.";

var text6_1 = "Are you interested in access to a low-cost attorney?";
var text6_2 = "Yes.";
var text6_3 = "No.";


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
    { gesture: "sway2", frames: [0, 1, 3, 1, 0, 2, 4, 2] },
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

var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 650 };
var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };

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
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/d81247a6-d59e-4cca-90c6-c2109d13ec7b.json');
        game.load.audio('intro', 'mp3/d81247a6-d59e-4cca-90c6-c2109d13ec7b.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
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

TheGame.secondState = function (game) { };
TheGame.secondState.prototype = {
    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/567956bb-ff6a-4601-bae8-b16e147411ae.json');
        game.load.audio('intro', 'mp3/567956bb-ff6a-4601-bae8-b16e147411ae.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text2_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text2_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text2_3, styleAnswer);
        var text4 = game.add.text(game.world.centerX - xOffset2, 460, text2_4, styleAnswer);
        var text5 = game.add.text(game.world.centerX - xOffset2, 580, text2_5, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        text4.inputEnabled = true;
        text4.events.onInputUp.add(up, this);
        text5.inputEnabled = true;
        text5.events.onInputUp.add(up, this);




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

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);

        text5.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        text5.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);



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
        addgesture(getByValue(gestures, "sway2", "gesture"), 500, clipduration, 10);

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

TheGame.thirdState = function (game) { };
TheGame.thirdState.prototype = {
    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/c93264be-bb36-4443-b294-19dafca8bdbb.json');
        game.load.audio('intro', 'mp3/c93264be-bb36-4443-b294-19dafca8bdbb.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text3_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text3_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text3_3, styleAnswer);
        //var text4 = game.add.text(game.world.centerX - xOffset2, 460, text3_4, styleAnswer);
        //var text5 = game.add.text(game.world.centerX - xOffset2, 580, text3_5, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        //text4.inputEnabled = true;
        //text4.events.onInputUp.add(up, this);
        //text5.inputEnabled = true;
        //text5.events.onInputUp.add(up, this);




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

        //text4.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text4.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);

        //text5.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text5.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);



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
        //addgesture(getByValue(gestures, "sway2", "gesture"), 500, clipduration, 10);

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

TheGame.fourthState = function (game) { };
TheGame.fourthState.prototype = {
    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.json');
        game.load.audio('intro', 'mp3/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text4_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text4_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text4_3, styleAnswer);
        var text4 = game.add.text(game.world.centerX - xOffset2, 460, text4_4, styleAnswer);
        //var text5 = game.add.text(game.world.centerX - xOffset2, 580, text3_5, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        text4.inputEnabled = true;
        text4.events.onInputUp.add(up, this);
        //text5.inputEnabled = true;
        //text5.events.onInputUp.add(up, this);




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

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);

        //text5.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text5.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);



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
        //addgesture(getByValue(gestures, "sway2", "gesture"), 500, clipduration, 10);

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

TheGame.fifthState = function (game) { };
TheGame.fifthState.prototype = {
    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/828a49af-eae5-4f82-9279-a7bbb51d2f01.json');
        game.load.audio('intro', 'mp3/828a49af-eae5-4f82-9279-a7bbb51d2f01.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text5_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text5_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text5_3, styleAnswer);
        //var text4 = game.add.text(game.world.centerX - xOffset2, 460, text5_4, styleAnswer);
        //var text5 = game.add.text(game.world.centerX - xOffset2, 580, text3_5, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        //text4.inputEnabled = true;
        //text4.ev/ts.onInputUp.add(up, this);
        //text5.inputEnabled = true;
        //text5.events.onInputUp.add(up, this);




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

        //text4.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text4.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);

        //text5.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text5.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);



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
        //addgesture(getByValue(gestures, "sway2", "gesture"), 500, clipduration, 10);

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

TheGame.sixthState = function (game) { };
TheGame.sixthState.prototype = {
    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies.png', 803, 832, 21);
        game.load.json('viseme', 'data/9331fbbc-d5b0-48ae-9705-334273bb50c5.json');
        game.load.audio('intro', 'mp3/9331fbbc-d5b0-48ae-9705-334273bb50c5.mp3');
    },

    create: function () {
        //var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };
        //var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 550 };
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, text6_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, text6_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, text6_3, styleAnswer);
        //var text4 = game.add.text(game.world.centerX - xOffset2, 460, text5_4, styleAnswer);
        //var text5 = game.add.text(game.world.centerX - xOffset2, 580, text3_5, styleAnswer);

        text2.inputEnabled = true;
        text2.events.onInputUp.add(up, this);
        text3.inputEnabled = true;
        text3.events.onInputUp.add(up, this);
        //text4.inputEnabled = true;
        //text4.ev/ts.onInputUp.add(up, this);
        //text5.inputEnabled = true;
        //text5.events.onInputUp.add(up, this);




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

        //text4.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text4.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);

        //text5.events.onInputOver.add(function () {
        //    this.game.canvas.style.cursor = "pointer";
        //}, this);
        //text5.events.onInputOut.add(function () {
        //    this.game.canvas.style.cursor = "default";
        //}, this);



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
        //addgesture(getByValue(gestures, "sway2", "gesture"), 500, clipduration, 10);

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
        game.state.start('fourth');
    } else if (game.state.current == "fourth") {
        game.state.start('fifth');
    } else if (game.state.current == "fifth") {
        game.state.start('sixth');
    } else if (game.state.current == "sixth") {
        alert("End of questions");
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
    game.state.add('second', TheGame.secondState);
    game.state.add('third', TheGame.thirdState);
    game.state.add('fourth', TheGame.fourthState);
    game.state.add('fifth', TheGame.fifthState);
    game.state.add('sixth', TheGame.sixthState);
    game.state.start('boot');
};
