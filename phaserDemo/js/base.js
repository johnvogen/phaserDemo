
var GX = {
};

GX = {
    //baseWidth: 1920,
    //baseHeight: 1080,
    //iconSize: 364,
    text1_1: "How do you want to pay for your medical expenses?",
    text1_2: "Pay a lot less out of my paycheck and more only when I actually need care.",
    text1_3: "Pay a lot more out of my paycheck and less when I receive care.",
    text2_1: "How often do you think you’ll go to a doctor during the year?",
    text2_2: "Rarely. 1 or 2 total visits for a minor illness or injury",
    text2_3: "Occasionally. 3 to 7 total visits for minor illnesses or injuries.",
    text2_4: "Frequently. 8 or more total visits, or dealing with a serious health condition.",
    text2_5: "I will only go for my preventive visits.",
    text3_1: "Will you or anyone you cover need dental care next year?",
    text3_2: "Yes.",
    text3_3: "No.",
    text4_1: "Are you worried about having enough money to pay for medical expenses in retirement?",
    text4_2: "Yes.  Saving for retirement is a top priority.",
    text4_3: "Maybe.  It’s not my top priority, but I’m beginning to focus more on saving for retirement.",
    text4_4: "No.  Saving for retirement is not currently a top priority.",
    text5_1: "Would the life insurance that your company provides you at no cost pay off all of your debts?",
    text5_2: "Yes, I am confident that all my debts would be paid off with the amount of life insurance the company provides.",
    text5_3: "No, I am not confident that I would be able to pay off all my debts with the amount of life insurance the company provides.",
    text6_1: "Are you interested in access to a low-cost attorney?",
    text6_2: "Yes.",
    text6_3: "No.",
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
    { gesture: "sway2", frames: [0, 1, 3, 1, 0, 2, 4, 2] }
];

var characterOffsetX = 0;
var characterOffsetY = 130;
var characterScaleX = .70;
var characterScaleY = .70;

var styleQuestion = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 650 };
var styleAnswer = { font: "26px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 600 };

GX.bootState = function (game) { };
GX.bootState.prototype = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('question1');
    }
}

GX.question1State = function (game) { };
GX.question1State.prototype = {

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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text1_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text1_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text1_3, styleAnswer);

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

GX.question2State = function (game) { };
GX.question2State.prototype = {
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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text2_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text2_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text2_3, styleAnswer);
        var text4 = game.add.text(game.world.centerX - xOffset2, 460, GX.text2_4, styleAnswer);
        var text5 = game.add.text(game.world.centerX - xOffset2, 580, GX.text2_5, styleAnswer);

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

GX.question3State = function (game) { };
GX.question3State.prototype = {
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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text3_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text3_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text3_3, styleAnswer);

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

GX.question4State = function (game) { };
GX.question4State.prototype = {
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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text4_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text4_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text4_3, styleAnswer);
        var text4 = game.add.text(game.world.centerX - xOffset2, 460, GX.text4_4, styleAnswer);

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

GX.question5State = function (game) { };
GX.question5State.prototype = {
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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text5_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text5_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text5_3, styleAnswer);

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

GX.question6State = function (game) { };
GX.question6State.prototype = {
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
        var xOffset = 50;
        var xOffset2 = 10;
        var text1 = game.add.text(game.world.centerX - xOffset, 100, GX.text6_1, styleQuestion);
        var text2 = game.add.text(game.world.centerX - xOffset2, 220, GX.text6_2, styleAnswer);
        var text3 = game.add.text(game.world.centerX - xOffset2, 340, GX.text6_3, styleAnswer);

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
    audiotrack.destroy();
    if (game.state.current == "question1") {
        game.state.start('question2');
    } else if (game.state.current == "question2") {
        game.state.start('question3');
    } else if (game.state.current == "question3") {
        game.state.start('question4');
    } else if (game.state.current == "question4") {
        game.state.start('question5');
    } else if (game.state.current == "question5") {
        game.state.start('question6');
    } else if (game.state.current == "question6") {
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
    game.state.add('boot', GX.bootState);
    game.state.add('question1', GX.question1State);
    game.state.add('question2', GX.question2State);
    game.state.add('question3', GX.question3State);
    game.state.add('question4', GX.question4State);
    game.state.add('question5', GX.question5State);
    game.state.add('question6', GX.question6State);
    game.state.start('boot');
};
