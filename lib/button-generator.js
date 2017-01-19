const virtualDom = require('virtual-hyperscript-svg');
const toStr = require('virtual-dom-stringify');
const fs = require('fs-promise');
const path = require('path');
const svg2png = require('svg2png');

const DEFAULT_SOFT_CORNER = 3;

module.exports = class ButtonGenerator {

  constructor() {
    this.svg2png = svg2png;
  }

  generate(options) {
    this._generateSVG(options)
      .then(this._generatePNG);
  }

  /***
   *define generate svg function
   * @param options
   * @private
   */
  _generateSVG(options) {
    //generating svg
    const svgObj = virtualDom('svg', {
      width: options.width,
      height: options.height,
    }, [
      virtualDom('defs', {}, [
        virtualDom('style', {
          type: 'text/css'
        }, `@import url(${options.fontUrl}); text{font-family:custom-font;}`)]),
      virtualDom('g', {}, [
        virtualDom('rect', {
          fill: options.backgroundColor,
          x: 0,
          y: 0,
          width: options.width,
          height: options.height,
          radius: options.hasSoftCorner ? DEFAULT_SOFT_CORNER : 0,
          rx: 10 /*what is that ? */,
          ry: 0,
        }),
        virtualDom('text', {
          fill: options.textColor,
          x: '50%',
          y: '50%',
          fontSize: '24',
          textAnchor: 'middle',
          transform: 'rotate(270, 25, 60)'
        }, [
          virtualDom('tspan', options.content)
        ])
      ])]);

    //turning svg tag to string
    const button = toStr(svgObj);
    this._createFileDirectory(button);
  }

  /***
   * Saving string as svg file in buttons folder, but first create buttons folder if doesn't exist
   * @param buffer
   * @private
   */
  _createFileDirectory(buffer) {
    //saving string as svg file in buttons folder, but first create buttons folder if doesn't exist
    const buttonsDirectory = 'buttons';
    const resolved = path.resolve(buttonsDirectory, 'usabilla_feedback_button_desktop_right.svg');

    fs.mkdirs(buttonsDirectory)
      .then(() => {
        return fs.writeFile(resolved, buffer)
      });
  }

  /***
   * Generate a png image.
   * @param sourceSVG : url of the svg file
   * @param destination : url of the destination
   * @param title : the title of the png file
   * @returns {Promise.<TResult>}
   */
  _generatePNG(sourceSVG, destination, title) {
    return fs.readFile(sourceSVG)
      .then(buffer => this.svg2png(buffer))
      .then(buffer => fs.writeFile(path.join(destination, `${title}.png`), buffer));
  }

};
