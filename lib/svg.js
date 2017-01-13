var h = require('virtual-hyperscript-svg');
var toStr = require('virtual-dom-stringify');
const fs = require('fs');

function someSvg() {
    return h('svg', {width: 40, height: 130},
        [h('g', {}, [
            h('rect', {fill: 'red', x: 0, y: 0, width: 40, height: 130, radius: 10, rx: 10, ry: 0}),
            h('text', {fill: 'black', x: 1, y: 1, font: 'Helvetica', fontSize: '45', text: 'feedback'},[
                h('tspan','Feedback')
            ])
        ])]);
};

var svg = someSvg();

var button = toStr(svg);
console.log(button);


fs.writeFile("../buttons/button1.svg", button, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
