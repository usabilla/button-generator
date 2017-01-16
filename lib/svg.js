"use strict";

const virtualDom = require('virtual-hyperscript-svg');
const toStr = require('virtual-dom-stringify');
const fs = require('fs');

//define generate svg function
function generateSvg(){
    let URL_FONT = '//fonts.googleapis.com/css?family=Open+Sans';
    return virtualDom ('svg', {
        width: 40,
        height: 130,
    }, [
        virtualDom('defs', {}, [
            virtualDom('style',{
                type: 'text/css' }, '@import url(' + URL_FONT + '); text {font-family:"Open Sans";}')]),
        virtualDom('g', {}, [
            virtualDom('rect', {
                fill: 'red',
                x: 0,
                y: 0,
                width: 40,
                height: 130,
                radius: 10,
                rx: 10,
                ry: 0,
            }),
            virtualDom('text', {
                fill: 'black',
                x: '50%',
                y: '50%',
                fontSize: '24',
                textAnchor: 'middle',
                transform: "rotate(270, 25, 60)"
            }, [
                virtualDom('tspan', 'Feedback')
            ])
        ])]);
};

//generating svg
const svg = generateSvg();

//turning svg tag to string
let button = toStr(svg);

//saving string - button file name to buttons folder
fs.writeFile("../buttons/usabilla_feedback_button_desktop_right.svg", button, function (err) {
    if (err) {
        return console.log(err);
    }
});
