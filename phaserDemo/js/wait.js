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