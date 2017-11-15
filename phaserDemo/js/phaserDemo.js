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

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');


game.state.add('boot', bootState);
game.state.add('first', firstState);
game.state.add('second', secondState);
game.state.add('third', thirdState);
game.state.add('wait', waitSequence);
game.state.start('boot');

