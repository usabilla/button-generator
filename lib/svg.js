const virtualDom = require('virtual-hyperscript-svg');
const fs = require('fs-promise');
const path = require('path');
const toStr = require('vdom-to-html');

//define generate svg function
function generateSvg() {
    let URL_FONT = '//fonts.googleapis.com/css?family=Open+Sans';
    return virtualDom('svg', {
        width: 40,
        height: 130,
    }, [
        virtualDom('defs', {}, [
            virtualDom('style', {
                type: 'text/css'
            }, `@import url(${URL_FONT}); text{font-family:Open Sans;}`)]),
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
                transform: 'rotate(270, 25, 60)'
            }, [
                virtualDom('tspan', 'Feedback')
            ])
        ])]);
}

//generating svg
const svg = generateSvg();

//turning svg tag to string
const button = toStr(svg);

//saving string as svg file in buttons folder, but first create buttons folder if doesn't exist
const buttonsDirectory = 'buttons';
const resolved = path.resolve(buttonsDirectory, 'usabilla_feedback_button_desktop_right.svg');

fs.mkdirs(buttonsDirectory)
    .then(() => {
        return fs.writeFile(resolved, button)
    });
