var h = require('virtual-hyperscript-svg');
var toStr = require('virtual-dom-stringify');
const fs = require('fs');


function someSvg() {
    var URL_FONT = '//fonts.googleapis.com/css?family=Sonsie+One';
    return h('svg', {width: 40, height: 130},[
        h('defs', {}, [
            h('style',{type:'text/css'},'@import url('+URL_FONT+'); text {font-family:"Sonsie One";}')
        ]),
        h('g', {}, [
            h('rect', {fill: 'red', x: 0, y: 0, width: 40, height: 130, radius: 10, rx: 10, ry: 0}),
            h('text', {
                fill: 'black',
                x: '50%',
                y: '50%',
                font: 'Helvetica',
                fontSize: '35',
                textAnchor: 'middle',
                transform: "rotate(270, 25, 60)"
            }, [
                h('tspan', 'Feedback')
            ])
        ])]);
};


var svg = someSvg();

var button = toStr(svg);
console.log(button);


fs.writeFile("../buttons/button1.svg", button, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
