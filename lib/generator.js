const parliamentSVG = require('parliament-svg');
const toStr = require('virtual-dom-stringify');
const fs = require('fs');

var parties = {
    "linke": {
        "seats": 64,
        "colour": "#a08"
    },
    "spd": {
        "seats": 193,
        "colour": "#e02"
    },
    "gruene": {
        "seats": 63,
        "colour": "#0b2"
    },
    "union": {
        "seats": 311,
        "colour": "#333"
    }
}

var seatCount = true;

const svg = parliamentSVG(parties, seatCount);
console.log(parties, seatCount);

var button = toStr(svg);
console.log(button);


fs.writeFile("../buttons/button.svg", button, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
