var TheGame1 = {
};

TheGame1.Params = {
    baseWidth: 1920,
    baseHeight: 1080,
    iconSize: 364
};

TheGame1.Boot = function (game) { };

TheGame1.Boot.prototype = {
    init: function () {
        return "Hello";
    }
};

alert(TheGame1.Boot.init());
