var TheGame = {
};

TheGame.Params = {
    //baseWidth: 1920,
    //baseHeight: 1080,
    //iconSize: 364
};



//bootState************************************************************************

TheGame.bootState = function (game) {
    TheGame.bootState.prototype = {

        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.state.start('first');
        }
    }

};

//firstState************************************************************************
TheGame.firstState = function (game) { };

TheGame.firstState.prototype = {

    init: function () {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    },

    preload: function () {
        game.load.spritesheet('heads', 'heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'eyes.png', 106, 128, 11);
        game.load.image('body', 'body.png');
        game.load.json('viseme', 'testing.json');
        game.load.audio('intro', 'testing.mp3');
    },

    create: function () {



        var text1 = game.add.text(game.world.centerX, 100, text1_1, style);
        var text2 = game.add.text(game.world.centerX, 140, text1_2, style);
        var text3 = game.add.text(game.world.centerX, 180, text1_3, style);

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
        heads = game.add.sprite(300, 10, 'heads')
        eyes = game.add.sprite(405, 95, 'eyes');
        body = game.add.sprite(280, 353, 'body');

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
                    vframe = getByValue(vframes, vvalue).frame;
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

        // Scale sprite group to 55%
        ben.scale.setTo(.55, .55);
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();
    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
        }


        if (audiotrack.currentTime > audiotrack.totalDuration * 1000) {

            mainState = "first";
            game.state.start('wait');
        }



    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);

        game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);

    }

};

//secondState************************************************************************
TheGame.secondState = function (game) { };

TheGame.secondState.prototype = {

    preload: function () {
        game.load.spritesheet('heads', 'heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'eyes.png', 106, 128, 11);
        game.load.image('body', 'body.png');
        game.load.json('viseme', 'testing.json');
        game.load.audio('intro', 'testing.mp3');
    },

    create: function () {

        var text1 = game.add.text(game.world.centerX, 100, text2_1, style);
        var text2 = game.add.text(game.world.centerX, 140, text2_2, style);
        var text3 = game.add.text(game.world.centerX, 180, text2_3, style);

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
        heads = game.add.sprite(300, 10, 'heads')
        eyes = game.add.sprite(405, 95, 'eyes');
        body = game.add.sprite(280, 353, 'body');

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
                    vframe = getByValue(vframes, vvalue).frame;
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

        // Scale sprite group to 55%
        ben.scale.setTo(.55, .55);
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();
    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
        }

        if (audiotrack.currentTime > audiotrack.totalDuration * 1000) {

            mainState = "second";
            game.state.start('wait');
        }



    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
    }
};


//thirdState************************************************************************
TheGame.thirdState = function (game) { };

TheGame.thirdState.prototype = {

    preload: function () {
        game.load.spritesheet('heads', 'heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'eyes.png', 106, 128, 11);
        game.load.image('body', 'body.png');
        game.load.json('viseme', 'testing.json');
        game.load.audio('intro', 'testing.mp3');
    },

    create: function () {

        var text1 = game.add.text(game.world.centerX, 100, text3_1, style);
        var text2 = game.add.text(game.world.centerX, 140, text3_2, style);
        var text3 = game.add.text(game.world.centerX, 180, text3_3, style);

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
        heads = game.add.sprite(300, 10, 'heads')
        eyes = game.add.sprite(405, 95, 'eyes');
        body = game.add.sprite(280, 353, 'body');

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
                    vframe = getByValue(vframes, vvalue).frame;
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

        // Scale sprite group to 55%
        ben.scale.setTo(.55, .55);
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();
    },



    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
        }

        if (audiotrack.currentTime > audiotrack.totalDuration * 1000) {

            mainState = "third";
            game.state.start('wait');
        }

    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
    }
};


//waitSequence************************************************************************
TheGame.waitSequence = function (game) { };

TheGame.waitSequence.prototype = {

    preload: function () {
        game.load.spritesheet('heads', 'heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'eyes.png', 106, 128, 11);
        game.load.image('body', 'body.png');
        game.load.json('viseme', 'testing.json');
        game.load.audio('intro', 'testing.mp3');
    },

    create: function () {




        if (mainState === "first") {
            waitText1 = text1_1;
            waitText2 = text1_2;
            waitText3 = text1_3;
        } else if (mainState === "second") {
            waitText1 = text2_1;
            waitText2 = text2_2;
            waitText3 = text2_3;
        } else if (mainState === "third") {
            waitText1 = text3_1;
            waitText2 = text3_2;
            waitText3 = text3_3;
        } else {
            alert("mainState has not been set");
        };


        var text1 = game.add.text(game.world.centerX, 100, waitText1, style);
        var text2 = game.add.text(game.world.centerX, 140, waitText2, style);
        var text3 = game.add.text(game.world.centerX, 180, waitText3, style);


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
        heads = game.add.sprite(300, 10, 'heads')
        eyes = game.add.sprite(405, 95, 'eyes');
        body = game.add.sprite(280, 353, 'body');

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
                    vframe = getByValue(vframes, vvalue).frame;
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

        // Scale sprite group to 55%
        ben.scale.setTo(.55, .55);
        //audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();
    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        //if (tick <= clipduration) {
        //    heads.frame = timeline[tick].head;
        //}
    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
    }

};
//End waitSequence*************************************************************************


var vtype;
var vtime;
var vvalue;
var timeline = {};
var head;
var eyes;
var body;
var ben;
var clipduration;


var text1_1 = "1 How do you want to pay for your benefits?";
var text1_2 = "1 I'd prefer to pay more when I need care and less in my premium.";
var text1_3 = "1 I'd prefer to pay less when i need care and more in my premium.";

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

function getByValue(arr, value) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
        if (arr[i].viseme === value) return arr[i];
    }
};

function blink(sprite) {
    // Random number between 0 and 20.
    var frame = Math.floor(Math.random() * 18);
    // If frame 0-7, then display that frame.
    if (frame < 10)
    { sprite.frame = frame; }
    // Else, display the default frame. Frame 1.
    else { sprite.frame = 1; }
};



var game;
window.onload = function () {

    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');


    game.state.add('boot', TheGame.bootState);
    //game.state.add('first', TheGame.firstState);
    //game.state.add('second', TheGame.secondState);
    //game.state.add('third', TheGame.thirdState);
    //game.state.add('wait', TheGame.waitSequence);
    game.state.start('boot');

};