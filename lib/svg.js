var h = require('virtual-hyperscript-svg');

var str = require('virtual-dom-stringify');

function someSvg() {
    return h('svg', { width: 400, height: 300 }, [
        h('circle', { fill: 'lime', cx: 100, cy: 250, r: 20 }),
        h('rect', { fill: 'red', x: 50, y: 50, width: 300, height: 100 })
    ]);
};

var svg = someSvg();

console.log(str(svg));

// var svg = require('./svg.js')();
