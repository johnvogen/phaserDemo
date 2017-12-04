var GX = {
    text0_1: "Medical",
    text0_2: "Military",
    text0_3: "Pregnancy",
    text0_4: "Education",
    text0_5: "Personal",

    text0_medical_1: "Paid Medical Leave",
    text0_medical_2: "Unpaid Medical",
    text0_medical_3: "State Disability Leave",
    text0_medical_4: "Long Term Disability",


    text1_1: "How do you want to pay for your medical expenses?",
    text1_2: "Pay a lot less out of my paycheck and more only when I actually need care.",
    text1_3: "Pay a lot more out of my paycheck and less when I receive care.",
    text2_1: "How often do you think you’ll go to a doctor during the year?",
    text2_2: "Rarely. 1 or 2 total visits for a minor illness or injury.",
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
    stageColor: "#ffffff",
    vframes: [
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
    ],
    gestures: [
        { gesture: "fistpump", frames: [18, 19, 20, 21, 21, 21, 21, 21, 20, 19, 18] },
        { gesture: "waiting", frames: [44, 45, 46, 47, 48, 49, 50, 51, 50, 49, 48, 47, 46, 45, 44, 45, 46, 47, 48, 49, 50, 51, 50, 49, 48, 47, 46, 45, 44] },
        { gesture: "idea", frames: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 4, 3, 2, 1] },
        { gesture: "present1_twoHanded", frames: [41] },
        { gesture: "present2_oneHanded", frames: [42] },
        { gesture: "armcross", frames: [43] },
        { gesture: "heartfelt", frames: [22] },
        { gesture: "armraise1_leftChest", frames: [23] },
        { gesture: "armraise2_rightChest", frames: [24] },
        { gesture: "please", frames: [25] },
        { gesture: "armsup", frames: [27] },
        { gesture: "armsout", frames: [26] },
        { gesture: "armswayout", frames: [31] },
        { gesture: "hand_east", frames: [29] },
        { gesture: "hand_west", frames: [30] },
        { gesture: "point_east", frames: [6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 6] },
        { gesture: "walk", frames: [32, 33, 34, 35, 36, 37, 38, 39, 40, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
        { gesture: "wave", frames: [11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11] }
    ],
    characterOffsetX: 0,
    characterOffsetY: 130,
    characterOffsetYFallin: -500,
    characterScaleX: .70,
    characterScaleY: .70,
    intro_characterScaleX: .5,
    intro_characterScaleY: .5,
    controlScaleX: .6,
    controlScaleY: .6,
    xOffset: 50,
    xOffset2: 10,
    ctlX: 64,
    ctlY: 20,
    ctlSeperation: 50,
    //styleQuestion: { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 650 },
    styleQuestion: { font: "40px Boogaloo", fill: "#000000", wordWrap: true, wordWrapWidth: 650 },
    styleAnswer: { font: "36px Boogaloo", fill: "#000000", wordWrap: true, wordWrapWidth: 600 },
    styleAnswerOver: { font: "36px Boogaloo", fill: "#ed1c24", wordWrap: true, wordWrapWidth: 600 },
    styleAnswerOut: { font: "36px Boogaloo", fill: "#000000", wordWrap: true, wordWrapWidth: 600 },
    questionSpacing: -10,
    answerSpacing: -10,
    textDMZ: 20

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

var text1;
var text2;
var text3;
var text4;
var text5;


GX.bootState = function (game) { };
GX.bootState.prototype = {

    create: function () {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('intro');
    }
}

GX.introState = function (game) { };
GX.introState.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies_noshadow.png', 803, 832, 21);

        game.load.spritesheet('shadow', 'png/shadow.png', 138, 15);
        game.load.spritesheet('direct', 'png/direct.png', 88, 98);
        game.load.spritesheet('sketch', 'png/sketch.png', 98, 108);

        game.load.json('viseme', 'data/oh_hi.json');
        game.load.audio('intro', 'mp3/oh_hi.mp3');

    },

    create: function () {
        title = game.add.group();
        titledirect = game.add.group();
        titlesketch = game.add.group();
        var direct;
        var shadow;
        var tween;

        var prior_vtime = 999;
        var duration = 0;
        var count = 0;
        const default_head = 10;
        var prior_vframe = default_head;
        var i = 0;

        // It's visually distracting when the lip frames change too quickly.
        // set a ms threshold to discard lipsync frames with short durattion
        const viseme_threshold = 0;

        heads = game.add.sprite(2650 + 465, -790, 'heads')
        eyes = game.add.sprite(2755 + 465, -705, 'eyes');
        body = game.add.sprite(2399 + 465, -845, 'bodies');
        heads.frame = default_head;

        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);
        ben.scale.setTo(.23, .23);

        // Sets background color to white.
        game.stage.backgroundColor = GX.stageColor;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        audiotrack = game.add.audio('intro');
        timer = game.time.create(false);

        var gameJSON = game.cache.getJSON('viseme');
        for (var key in gameJSON) {
            if (gameJSON.hasOwnProperty(key)) {
                vtype = gameJSON[key].type;
                vtime = gameJSON[key].time;
                vvalue = gameJSON[key].value;
                if (count > 0) {
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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

        // Add .20 second of default head position.. This helps account for missed ticks and timing differences between
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

        //console.log(timeline);
        //addgesture(getByValue(GX.gestures, "waving", "gesture"), 50, clipduration, 13);  // Start pointing at .10 seconds


        for (var i = 0; i < 6; i++) {
            // Add a shadow to the location which characters will land on.
            // And tween their size to make them look like a real shadow.
            // Put the following code before items to give shadow a lower
            // render order.
            shadow = game.add.sprite(400 + 88 * i, 290, 'shadow');

            // Set shadow's size 0 so that it'll be invisible at the beginning.
            shadow.scale.setTo(0.0, 0.0);

            // Also set the origin to the center since we don't want to
            // see the shadow scale to the left top.
            shadow.anchor.setTo(0.5, 1);
            game.add.tween(shadow.scale).to({ x: 1.0, y: 1.0 }, 2400, Phaser.Easing.Bounce.Out, true);
            title.add(shadow);

            // Add characters on top of shadows.
            direct = game.add.sprite(400 + 87 * i, -40, 'direct', i);

            // Set origin to the center to make the rotation look better.
            direct.anchor.setTo(0.5, 0.5);

            // Add direct to title group
            title.add(direct);

            // Add a simple bounce tween to each character's position.
            tween = game.add.tween(direct).to({ y: 245 }, 2400, Phaser.Easing.Bounce.Out, true);

            //---
            sketch = game.add.sprite(400 + 87 * i, 1000, 'sketch', i);
            sketch.anchor.setTo(.5, .5);
            title.add(sketch);

            // Add a simple bounce tween to each character's position.
            game.add.tween(sketch).to({ y: 350 }, 3400, Phaser.Easing.Bounce.Out, true, 400 * i, 0);




            // Add another rotation tween to the same character.
            var oddeven = (Math.floor(Math.random() * 2) + 1);
            var rotation = 720;
            if (oddeven == 1)
            { rotation = -720; }
            game.add.tween(sketch).to({ angle: rotation }, Math.floor(Math.random() * 3300) + 900 - i * 500, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, 0);

        }

        // End Text Sequence
        game.world.bringToTop(title);
        timer = game.time.create(false);
        timer.add(5500, function () {
            // Possibly blink eyes every 1/2 second
            timer.repeat(500, 20000, function () { blink(eyes); }, this);
            tween = game.add.tween(ben).to({ y: 219, }, 1200, Phaser.Easing.Bounce.Out, true, 1000);
        }, this);

        timer.add(11700, function () {
            tween = game.add.tween(title).to({ x: -250 }, 400, Phaser.Easing.Cubic.Out, true, 300);
        }, this);

        timer.add(12000, function () {
            tween = game.add.tween(ben).to({ y: 1000 }, 400, Phaser.Easing.Cubic.Out, true, 400);
        }, this);

        // Character raises arms and looks down ready for fall.
        timer.add(12300, function () {
            body.frame = 16;
            heads.frame = 1;
            eyes.frame = 2;
        }, this);

        timer.add(13000, function () {
            tween = game.add.tween(title).to({ x: 0 }, 400, Phaser.Easing.Cubic.Out, true, 200);
        }, this);

        timer.add(8000, function () {
            audiotrack.play();
        }, this);

        timer.add(13400, function () {
            tween = game.add.tween(title.scale).to({ x: 1.5, y: 1.5 }, 800, Phaser.Easing.Linear.None, true, 200);
            tween = game.add.tween(title.position).to({ x: (title.position.x - title.width) / 2, y: (title.position.y - title.height) / 2 }, 800, Phaser.Easing.Linear.None, true, 200);
            //tween = game.add.tween(title.position).to({ x: (title.position.x - title.width) , y: (title.position.y - title.height)  }, 800, Phaser.Easing.Linear.None, true, 200);

        }, this);

        //timer.add(15500, function () {
        //    tween = game.add.tween(title).to({ x: 3000 }, 1000, Phaser.Easing.Cubic.Out, true, 200);
        //}, this);

        timer.start();

    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
        }
        if (tick < 145) {
            body.frame = timeline[tick].body;
        }
        if (timer.ms >= 17000) {
            proceed();
        }
    },

    fadeComplete: function () {
        proceed();
    },

    render: function () {
        //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        //game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        //game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
        //game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);
    }
}

GX.testState = function (game) { };
GX.testState.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        game.load.image('books', 'png/educational/Books.png');
        game.load.image('calendar', 'png/educational/Calendar.png');
        game.load.image('gradBooks', 'png/educational/Gradhat-Books.png');
        game.load.image('grad', 'png/educational/Gradhat.png');
        game.load.image('pacifier', 'png/educational/Pacifier.png');

        game.load.json('viseme', 'data/edu_intro2.json');
        game.load.audio('intro', 'mp3/edu_intro2.mp3');


    },

    create: function () {
        //game.world.alpha = 0;

        books = game.add.sprite(950, -100, 'books');
        books.scale.x = .5;
        books.scale.y = .5;
        books.anchor.setTo(.5, .5);
        game.add.tween(books).to({ y: 245 }, 1000, Phaser.Easing.Bounce.Out, true, 16000);

        calendar = game.add.sprite(950, 400, 'calendar');
        calendar.alpha = 0;
        calendar.scale.x = .0;
        calendar.scale.y = .0;
        calendar.anchor.setTo(.5, .5);
        game.add.tween(calendar).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 20000);
        game.add.tween(calendar.scale).to({ x: .5, y: .5 }, 800, Phaser.Easing.Bounce.Out, true, 20000);

        gradBooks = game.add.sprite(950, 600, 'gradBooks');
        gradBooks.alpha = 0;
        gradBooks.scale.x = .0;
        gradBooks.scale.y = .0;
        gradBooks.anchor.setTo(.5, .5);
        game.add.tween(gradBooks).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 24000);
        game.add.tween(gradBooks.scale).to({ x: .5, y: .5 }, 800, Phaser.Easing.Bounce.Out, true, 24000);

        // Add another rotation tween to the same character.
        var oddeven = (Math.floor(Math.random() * 2) + 1);
        var rotation = 720;
        if (oddeven == 1)
        { rotation = -720; }
        game.add.tween(gradBooks).to({ angle: rotation },800, Phaser.Easing.Cubic.Out, true, 24000);


        text1 = game.add.text(game.world.centerX - GX.xOffset2, 100, GX.text0_1, GX.styleAnswer);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text0_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text0_3, GX.styleAnswer);
        text4 = game.add.text(game.world.centerX - GX.xOffset2, text3.position.y + text3.texture.height + GX.textDMZ, GX.text0_4, GX.styleAnswer);
        text5 = game.add.text(game.world.centerX - GX.xOffset2, text4.position.y + text4.texture.height + GX.textDMZ, GX.text0_5, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text1.inputEnabled = true;
        text1.events.onInputUp.add(proceedTo);
        text1.lineSpacing = GX.answerSpacing;
        text1.alpha = 0;
        game.add.tween(text1).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 10000);

        

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed);
        text2.lineSpacing = GX.answerSpacing;
        text2.alpha = 0;
        game.add.tween(text2).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 15000);

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed);
        text3.lineSpacing = GX.answerSpacing;
        text3.alpha = 0;
        game.add.tween(text3).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 18000);

        text4.inputEnabled = true;
        text4.events.onInputUp.add(proceed);
        text4.lineSpacing = GX.answerSpacing;
        text4.alpha = 0;
        game.add.tween(text4).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 25000);

        text5.inputEnabled = true;
        text5.events.onInputUp.add(proceed);
        text5.lineSpacing = GX.answerSpacing;
        text5.alpha = 0;
        game.add.tween(text5).to({ alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true, 28000);

        text1.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text1.setStyle(GX.styleAnswerOver);
        }, this);

        text1.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text1.setStyle(GX.styleAnswerOut);
        }, this);

        text2.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);

        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);

        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
        }, this);

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text4.setStyle(GX.styleAnswerOver);
        }, this);

        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text4.setStyle(GX.styleAnswerOut);
        }, this);

        text5.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text5.setStyle(GX.styleAnswerOver);
        }, this);

        text5.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text5.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')

        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');

        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');

        body.scale.setTo(2, 2);


        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlHidden = game.add.sprite(ctlReplay.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlHidden.frame = 3;
        ctlHidden.alpha = 0;
        ctlHidden.inputEnabled = true;
        ctlHidden.events.onInputUp.add(function () {
            //alert("Hidden");
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHidden.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end


        // Created a sprite grouo called ben.  Working with a group of sprites is easier than working with 
        // individual sprites for moving and scaling the character
        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);

 


        //game.add.tween(ben).to({ y: 450 }, 4000, Phaser.Easing.Bounce.Out, true);
        //ben.pivot.x = ben.width*-.25;
        //ben.pivot.y = ben.height * -.25;

        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true);
        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true); game.add.tween(ben.position).from({ x: .5, y: .5 }, 2000, null, true);

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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

        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);

        //addgesture(getByValue(GX.gestures, "walk", "gesture"), 10, clipduration, 20);
        //addgesture(getByValue(GX.gestures, "wave", "gesture"), 3, clipduration, 10);
        //addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 400, clipduration, 150);
        //addgesture(getByValue(GX.gestures, "armraise2_rightChest", "gesture"), 1000, clipduration, 200);
        //addgesture(getByValue(GX.gestures, "point_east", "gesture"), 2500, clipduration, 10);


        // Scale sprite group to 55%



        //console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        //game.add.tween(game.world).to({ alpha: 1 }, 1000, "Linear", true);

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);

    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
            body.frame = timeline[tick].body;
        }

        //if (timer.ms > 3000) {
        //    text1.alpha = 1;
        //}


    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
        game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);
        game.debug.text('Test State: ', 32, 160);
    }
};

GX.educationalState = function (game) { };
GX.educationalState.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        game.load.json('viseme', 'data/edu_intro2.json');
        game.load.audio('intro', 'mp3/edu_intro2.mp3');


    },

    create: function () {
        //game.world.alpha = 0;
        text1 = game.add.text(game.world.centerX - GX.xOffset2, 100, GX.text0_1, GX.styleAnswer);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text0_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text0_3, GX.styleAnswer);
        text4 = game.add.text(game.world.centerX - GX.xOffset2, text3.position.y + text3.texture.height + GX.textDMZ, GX.text0_4, GX.styleAnswer);
        text5 = game.add.text(game.world.centerX - GX.xOffset2, text4.position.y + text4.texture.height + GX.textDMZ, GX.text0_5, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text1.inputEnabled = true;
        text1.events.onInputUp.add(proceedTo);
        text1.lineSpacing = GX.answerSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed);
        text3.lineSpacing = GX.answerSpacing;

        text4.inputEnabled = true;
        text4.events.onInputUp.add(proceed);
        text4.lineSpacing = GX.answerSpacing;

        text5.inputEnabled = true;
        text5.events.onInputUp.add(proceed);
        text5.lineSpacing = GX.answerSpacing;

        text1.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text1.setStyle(GX.styleAnswerOver);
        }, this);

        text1.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text1.setStyle(GX.styleAnswerOut);
        }, this);

        text2.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);

        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);

        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
        }, this);

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text4.setStyle(GX.styleAnswerOver);
        }, this);

        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text4.setStyle(GX.styleAnswerOut);
        }, this);

        text5.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text5.setStyle(GX.styleAnswerOver);
        }, this);

        text5.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text5.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')

        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');

        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');

        body.scale.setTo(2, 2);


        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlHidden = game.add.sprite(ctlReplay.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlHidden.frame = 3;
        ctlHidden.alpha = 0;
        ctlHidden.inputEnabled = true;
        ctlHidden.events.onInputUp.add(function () {
            //alert("Hidden");
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHidden.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end


        // Created a sprite grouo called ben.  Working with a group of sprites is easier than working with 
        // individual sprites for moving and scaling the character
        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);

        //game.add.tween(ben).to({ y: 450 }, 4000, Phaser.Easing.Bounce.Out, true);
        //ben.pivot.x = ben.width*-.25;
        //ben.pivot.y = ben.height * -.25;

        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true);
        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true); game.add.tween(ben.position).from({ x: .5, y: .5 }, 2000, null, true);

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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

        //addgesture(getByValue(GX.gestures, "walk", "gesture"), 10, clipduration, 20);
        //addgesture(getByValue(GX.gestures, "wave", "gesture"), 3, clipduration, 10);
        //addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 400, clipduration, 150);
        //addgesture(getByValue(GX.gestures, "armraise2_rightChest", "gesture"), 1000, clipduration, 200);
        //addgesture(getByValue(GX.gestures, "point_east", "gesture"), 2500, clipduration, 10);


        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        //console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        //game.add.tween(game.world).to({ alpha: 1 }, 1000, "Linear", true);

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);

    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
            body.frame = timeline[tick].body;
        }
    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
        game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);
        game.debug.text('Educational State: ', 32, 160);
    }
};

GX.educationalMedicalState = function (game) { };
GX.educationalMedicalState.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        game.load.json('viseme', 'data/leave_types.json');
        game.load.audio('intro', 'mp3/leave_types.mp3');


    },

    create: function () {
        //game.world.alpha = 0;
        text1 = game.add.text(game.world.centerX - GX.xOffset2, 100, GX.text0_medical_1, GX.styleAnswer);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text0_medical_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text0_medical_3, GX.styleAnswer);
        text4 = game.add.text(game.world.centerX - GX.xOffset2, text3.position.y + text3.texture.height + GX.textDMZ, GX.text0_medical_4, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text1.inputEnabled = true;
        text1.events.onInputUp.add(proceed);
        text1.lineSpacing = GX.answerSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed);
        text3.lineSpacing = GX.answerSpacing;

        text4.inputEnabled = true;
        text4.events.onInputUp.add(proceed);
        text4.lineSpacing = GX.answerSpacing;

        text1.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text1.setStyle(GX.styleAnswerOver);
        }, this);

        text1.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text1.setStyle(GX.styleAnswerOut);
        }, this);

        text2.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);

        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);

        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
        }, this);

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text4.setStyle(GX.styleAnswerOver);
        }, this);

        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text4.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')

        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');

        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');

        body.scale.setTo(2, 2);


        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end


        // Created a sprite grouo called ben.  Working with a group of sprites is easier than working with 
        // individual sprites for moving and scaling the character
        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);

        //game.add.tween(ben).to({ y: 450 }, 4000, Phaser.Easing.Bounce.Out, true);
        //ben.pivot.x = ben.width*-.25;
        //ben.pivot.y = ben.height * -.25;

        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true);
        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true); game.add.tween(ben.position).from({ x: .5, y: .5 }, 2000, null, true);

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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

        //addgesture(getByValue(GX.gestures, "walk", "gesture"), 10, clipduration, 20);
        //addgesture(getByValue(GX.gestures, "wave", "gesture"), 3, clipduration, 10);
        //addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 400, clipduration, 150);
        //addgesture(getByValue(GX.gestures, "armraise2_rightChest", "gesture"), 1000, clipduration, 200);
        //addgesture(getByValue(GX.gestures, "point_east", "gesture"), 2500, clipduration, 10);


        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        //console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        //game.add.tween(game.world).to({ alpha: 1 }, 1000, "Linear", true);

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);

    },

    update: function () {
        var tick = Math.round(audiotrack.currentTime / 10);
        if (tick <= clipduration) {
            heads.frame = timeline[tick].head;
            body.frame = timeline[tick].body;
        }
    },

    render: function () {
        game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Time elapsed: ' + timer.ms.toFixed(0), 32, 64);
        game.debug.text('Audio mark: ' + audiotrack.currentTime.toFixed(0), 32, 96);
        game.debug.text('AudioTract total duration ' + audiotrack.totalDuration.toFixed(0), 32, 128);
        game.debug.text('Educational Medical: ', 32, 160);
    }
};

GX.question1State = function (game) { };
GX.question1State.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        //game.load.json('viseme', 'data/d81247a6-d59e-4cca-90c6-c2109d13ec7b.json');
        //game.load.audio('intro', 'mp3/d81247a6-d59e-4cca-90c6-c2109d13ec7b.mp3');
        game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/d81247a6-d59e-4cca-90c6-c2109d13ec7b.json');
        game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/d81247a6-d59e-4cca-90c6-c2109d13ec7b.mp3');

    },

    create: function () {
        //game.world.alpha = 0;
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text1_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text1_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text1_3, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed);
        text3.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            console.log("Hover over");
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);

        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')

        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');

        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');

        body.scale.setTo(2, 2);


        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end


        // Created a sprite grouo called ben.  Working with a group of sprites is easier than working with 
        // individual sprites for moving and scaling the character
        ben = game.add.group();
        ben.add(heads);
        ben.add(eyes);
        ben.add(body);

        //game.add.tween(ben).to({ y: 450 }, 4000, Phaser.Easing.Bounce.Out, true);
        //ben.pivot.x = ben.width*-.25;
        //ben.pivot.y = ben.height * -.25;

        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true);
        //game.add.tween(ben.scale).from({ x: .5, y: .5 }, 2000, null, true); game.add.tween(ben.position).from({ x: .5, y: .5 }, 2000, null, true);

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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

        //addgesture(getByValue(GX.gestures, "walk", "gesture"), 10, clipduration, 20);
        addgesture(getByValue(GX.gestures, "wave", "gesture"), 3, clipduration, 10);
        addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 400, clipduration, 150);
        addgesture(getByValue(GX.gestures, "armraise2_rightChest", "gesture"), 1000, clipduration, 200);
        addgesture(getByValue(GX.gestures, "point_east", "gesture"), 2200, clipduration, 10);

        addgesture(getByValue(GX.gestures, "waiting", "gesture"), 5000, clipduration, 10);
        addgesture(getByValue(GX.gestures, "hand_west", "gesture"), 4500, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armsout", "gesture"), 6500, clipduration, 300);


        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        //console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        //game.add.tween(game.world).to({ alpha: 1 }, 1000, "Linear", true);

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);

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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        //game.load.spritesheet('controls', 'png/controls.png', 32, 32, 24);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        game.load.json('viseme', 'data/567956bb-ff6a-4601-bae8-b16e147411ae.json');
        game.load.audio('intro', 'mp3/567956bb-ff6a-4601-bae8-b16e147411ae.mp3');
        //game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/567956bb-ff6a-4601-bae8-b16e147411ae.json');
        //game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/567956bb-ff6a-4601-bae8-b16e147411ae.mp3 ');

    },

    create: function () {
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text2_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text2_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text2_3, GX.styleAnswer);
        text4 = game.add.text(game.world.centerX - GX.xOffset2, text3.position.y + text3.texture.height + GX.textDMZ, GX.text2_4, GX.styleAnswer);
        text5 = game.add.text(game.world.centerX - GX.xOffset2, text4.position.y + text4.texture.height + GX.textDMZ, GX.text2_5, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed, this);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed, this);
        text3.lineSpacing = GX.answerSpacing;

        text4.inputEnabled = true;
        text4.events.onInputUp.add(proceed, this);
        text4.lineSpacing = GX.answerSpacing;

        text5.inputEnabled = true;
        text5.events.onInputUp.add(proceed, this);
        text5.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
        }, this);

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text4.setStyle(GX.styleAnswerOver);
        }, this);
        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text4.setStyle(GX.styleAnswerOut);
        }, this);

        text5.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text5.setStyle(GX.styleAnswerOver);
        }, this);
        text5.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text5.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');
        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');
        body.scale.setTo(2, 2);

        //Control Block start
        ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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



        addgesture(getByValue(GX.gestures, "wave", "gesture"), 100, clipduration, 10);
        addgesture(getByValue(GX.gestures, "fistpump", "gesture"), 300, clipduration, 10);
        addgesture(getByValue(GX.gestures, "waiting", "gesture"), 600, clipduration, 10);
        addgesture(getByValue(GX.gestures, "idea", "gesture"), 1000, clipduration, 10);
        addgesture(getByValue(GX.gestures, "present1_twoHanded", "gesture"), 1300, clipduration, 300);
        addgesture(getByValue(GX.gestures, "present2_oneHanded", "gesture"), 1700, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armcross", "gesture"), 2100, clipduration, 300);
        addgesture(getByValue(GX.gestures, "heartfelt", "gesture"), 2600, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armraise1_leftChest", "gesture"), 3200, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armraise2_rightChest", "gesture"), 4000, clipduration, 300);
        addgesture(getByValue(GX.gestures, "please", "gesture"), 4500, clipduration, 300);

        addgesture(getByValue(GX.gestures, "armsup", "gesture"), 4800, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armsout", "gesture"), 5200, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armswayout", "gesture"), 5600, clipduration, 300);
        addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 6000, clipduration, 300);
        addgesture(getByValue(GX.gestures, "hand_west", "gesture"), 6400, clipduration, 300);

        addgesture(getByValue(GX.gestures, "walk", "gesture"), 6800, clipduration, 10);
        addgesture(getByValue(GX.gestures, "point_east", "gesture"), 7500, clipduration, 10);




        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);
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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        game.load.json('viseme', 'data/c93264be-bb36-4443-b294-19dafca8bdbb.json');
        game.load.audio('intro', 'mp3/c93264be-bb36-4443-b294-19dafca8bdbb.mp3');
        //game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/c93264be-bb36-4443-b294-19dafca8bdbb.json');
        //game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/c93264be-bb36-4443-b294-19dafca8bdbb.mp3 ');
    },

    create: function () {
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text3_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text3_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text3_3, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed, this);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed, this);
        text3.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');
        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');
        body.scale.setTo(2, 2);

        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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
        //addgesture(getByValue(GX.gestures, "sway2", "gesture"), 500, clipduration, 10);

        addgesture(getByValue(GX.gestures, "hand_west", "gesture"), 400, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armcross", "gesture"), 2100, clipduration, 300);
        addgesture(getByValue(GX.gestures, "point_east", "gesture"), 2900, clipduration, 15);
        addgesture(getByValue(GX.gestures, "waiting", "gesture"), 3700, clipduration, 10);



        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);
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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        //game.load.json('viseme', 'data/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.json');
        //game.load.audio('intro', 'mp3/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.mp3');
        game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.json');
        game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/15ec71d6-9504-43f7-8e5b-4b47c8e8403c.mp3');
    },

    create: function () {
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text4_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text4_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text4_3, GX.styleAnswer);
        text4 = game.add.text(game.world.centerX - GX.xOffset2, text3.position.y + text3.texture.height + GX.textDMZ, GX.text4_4, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed, this);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed, this);
        text3.lineSpacing = GX.answerSpacing;

        text4.inputEnabled = true;
        text4.events.onInputUp.add(proceed, this);
        text4.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
        }, this);

        text4.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text4.setStyle(GX.styleAnswerOver);
        }, this);
        text4.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text4.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');
        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');
        body.scale.setTo(2, 2);

        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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
        //addgesture(getByValue(GX.gestures, "sway2", "gesture"), 500, clipduration, 10);

        addgesture(getByValue(GX.gestures, "armsout", "gesture"), 50, clipduration, 100);
        addgesture(getByValue(GX.gestures, "point_east", "gesture"), 600, clipduration, 10);
        addgesture(getByValue(GX.gestures, "present2_oneHanded", "gesture"), 800, clipduration, 200);
        addgesture(getByValue(GX.gestures, "hand_east", "gesture"), 1000, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armcross", "gesture"), 1900, clipduration, 300);


        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);
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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        //game.load.json('viseme', 'data/828a49af-eae5-4f82-9279-a7bbb51d2f01.json');
        //game.load.audio('intro', 'mp3/828a49af-eae5-4f82-9279-a7bbb51d2f01.mp3');
        game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/828a49af-eae5-4f82-9279-a7bbb51d2f01.json');
        game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/828a49af-eae5-4f82-9279-a7bbb51d2f01.mp3');
    },

    create: function () {
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text5_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text5_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text5_3, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed, this);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed, this);
        text3.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');
        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');
        body.scale.setTo(2, 2);

        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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


        //addgesture(getByValue(GX.gestures, "sway2", "gesture"), 500, clipduration, 10);
        addgesture(getByValue(GX.gestures, "hand_west", "gesture"), 50, clipduration, 200);
        addgesture(getByValue(GX.gestures, "point_east", "gesture"), 500, clipduration, 20);

        addgesture(getByValue(GX.gestures, "waiting", "gesture"), 1500, clipduration, 10);
        addgesture(getByValue(GX.gestures, "armraise1_leftChest", "gesture"), 2000, clipduration, 200);




        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);
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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        game.load.spritesheet('heads', 'png/heads.png', 297, 354, 12);
        game.load.spritesheet('eyes', 'png/eyes.png', 106, 128, 11);
        game.load.spritesheet('bodies', 'png/bodies2.png', 397, 411, 54);
        game.load.spritesheet('controls', 'png/controlSpritesheetSmall.png', 51, 51, 4);

        //game.load.json('viseme', 'data/9331fbbc-d5b0-48ae-9705-334273bb50c5.json');
        //game.load.audio('intro', 'mp3/9331fbbc-d5b0-48ae-9705-334273bb50c5.mp3');
        game.load.json('viseme', 'https://s3.amazonaws.com/audioposts27/9331fbbc-d5b0-48ae-9705-334273bb50c5.json');
        game.load.audio('intro', 'https://s3.amazonaws.com/audioposts27/9331fbbc-d5b0-48ae-9705-334273bb50c5.mp3');
    },

    create: function () {
        text1 = game.add.text(game.world.centerX - GX.xOffset, 100, GX.text6_1, GX.styleQuestion);
        text2 = game.add.text(game.world.centerX - GX.xOffset2, text1.position.y + text1.texture.height + GX.textDMZ, GX.text6_2, GX.styleAnswer);
        text3 = game.add.text(game.world.centerX - GX.xOffset2, text2.position.y + text2.texture.height + GX.textDMZ, GX.text6_3, GX.styleAnswer);

        text1.lineSpacing = GX.questionSpacing;

        text2.inputEnabled = true;
        text2.events.onInputUp.add(proceed, this);
        text2.lineSpacing = GX.answerSpacing;

        text3.inputEnabled = true;
        text3.events.onInputUp.add(proceed, this);
        text3.lineSpacing = GX.answerSpacing;

        text2.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text2.setStyle(GX.styleAnswerOver);
        }, this);
        text2.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text2.setStyle(GX.styleAnswerOut);
        }, this);

        text3.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
            text3.setStyle(GX.styleAnswerOver);
        }, this);
        text3.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
            text3.setStyle(GX.styleAnswerOut);
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

        game.stage.backgroundColor = GX.stageColor;
        heads = game.add.sprite(350 + GX.characterOffsetX, 10 + GX.characterOffsetY, 'heads')
        eyes = game.add.sprite(455 + GX.characterOffsetX, 95 + GX.characterOffsetY, 'eyes');
        body = game.add.sprite(99 + GX.characterOffsetX, -45 + GX.characterOffsetY, 'bodies');
        body.scale.setTo(2, 2);

        //Control Block start
        var ctlHome = game.add.sprite(GX.ctlX, GX.ctlY, 'controls');
        ctlHome.frame = 0;
        ctlHome.inputEnabled = true;
        ctlHome.events.onInputUp.add(function () {
            audiotrack.destroy();
            game.state.start('question1');
        });
        ctlHome.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlPause = game.add.sprite(ctlHome.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlPause.frame = 1;
        ctlPause.inputEnabled = true;
        ctlPause.events.onInputUp.add(function () {
            game.paused = true; audiotrack.pause();
        });
        ctlPause.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlBack = game.add.sprite(ctlPause.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlBack.frame = 2;
        ctlBack.inputEnabled = true;
        ctlBack.events.onInputUp.add(function () {
            goBack();
        });
        ctlBack.scale.setTo(GX.controlScaleX, GX.controlScaleY);

        var ctlReplay = game.add.sprite(ctlBack.x + GX.ctlSeperation, GX.ctlY, 'controls');
        ctlReplay.frame = 3;
        ctlReplay.inputEnabled = true;
        ctlReplay.events.onInputUp.add(function () {
            replay();
        });
        ctlReplay.scale.setTo(GX.controlScaleX, GX.controlScaleY);
        //Control Block end

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
                    vframe = getByValue(GX.vframes, vvalue, "viseme").frame;
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
        //addgesture(getByValue(GX.gestures, "sway2", "gesture"), 500, clipduration, 10);
        addgesture(getByValue(GX.gestures, "idea", "gesture"), 10, clipduration, 10);
        addgesture(getByValue(GX.gestures, "please", "gesture"), 330, clipduration, 100);

        addgesture(getByValue(GX.gestures, "present2_oneHanded", "gesture"), 700, clipduration, 400);

        addgesture(getByValue(GX.gestures, "hand_west", "gesture"), 1600, clipduration, 200);
        addgesture(getByValue(GX.gestures, "fistpump", "gesture"), 2100, clipduration, 10);
        addgesture(getByValue(GX.gestures, "armsout", "gesture"), 2450, clipduration, 300);
        addgesture(getByValue(GX.gestures, "armsup", "gesture"), 3150, clipduration, 1050);


        // Scale sprite group to 55%
        ben.scale.setTo(GX.characterScaleX, GX.characterScaleY);
        console.log(timeline);

        // Start the show
        audiotrack.play();

        // Possibly blink eyes every 1/2 second
        timer.repeat(500, 20000, function () { blink(eyes); }, this);
        timer.start();

        game.input.onDown.add(function () { game.paused = false; audiotrack.resume(); }, self);
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

function proceed(item) {
    audiotrack.destroy();
    if (game.state.current == "intro") {
        game.state.start('test');
    } else if (game.state.current == "test") {
        game.state.start('');
    }else if (game.state.current == "educational") {
        game.state.start('');
    } else if (game.state.current == "question1") {
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
        alert("Display Results");
    }
}

function proceedTo() {
    //if (what === "medical") {
    //    alert("Going to medical");
    //} else {
    //    alert("Going nowhere");
    //}

    //alert("Going to Educational Medical");
    audiotrack.destroy();
    game.state.start('educationalMedical');
}

function goBack() {
    switch (game.state.current) {
        case "intro":
            audiotrack.destroy();
            game.state.start('intro');
            break;
        case "educational":
            audiotrack.destroy();
            game.state.start('intro');
            break;
        case "question1":
            audiotrack.destroy();
            game.state.start('educational');
            break;
        case "question2":
            audiotrack.destroy();
            game.state.start('question1');
            break;
        case "question3":
            audiotrack.destroy();
            game.state.start('question2');
            break;
        case "question4":
            audiotrack.destroy();
            game.state.start('question3');
            break;
        case "question5":
            audiotrack.destroy();
            game.state.start('question4');
            break;
        case "question6":
            audiotrack.destroy();
            game.state.start('question5');
            break;
        default:
            alert("No previous state");
    }

}

function replay() {
    switch (game.state.current) {
        case "intro":
            audiotrack.destroy();
            game.state.start('intro');
            break;
        case "educational":
            audiotrack.destroy();
            game.state.start('educational');
            break;
        case "question1":
            audiotrack.destroy();
            game.state.start('question1');
            break;
        case "question2":
            audiotrack.destroy();
            game.state.start('question2');
            break;
        case "question3":
            audiotrack.destroy();
            game.state.start('question3');
            break;
        case "question4":
            audiotrack.destroy();
            game.state.start('question4');
            break;
        case "question5":
            audiotrack.destroy();
            game.state.start('question5');
            break;
        case "question6":
            audiotrack.destroy();
            game.state.start('question6');
            break;
        default:
            alert("No previous state");
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
    else { sprite.frame = 1; } //this is slightly changed in bounce state - see if it makes a difference
}

var game;
window.onload = function () {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

    WebFontConfig = {
        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function () { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Boogaloo', 'Caveat']
        }
    };

    function createText() {

    }

    game.state.add('boot', GX.bootState);
    game.state.add('intro', GX.introState);
    game.state.add('test', GX.testState);
    game.state.add('educational', GX.educationalState);
    game.state.add('educationalMedical', GX.educationalMedicalState);
    game.state.add('question1', GX.question1State);
    game.state.add('question2', GX.question2State);
    game.state.add('question3', GX.question3State);
    game.state.add('question4', GX.question4State);
    game.state.add('question5', GX.question5State);
    game.state.add('question6', GX.question6State);
    game.state.start('test');
};
