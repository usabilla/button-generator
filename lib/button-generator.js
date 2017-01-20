const virtualDom = require('virtual-hyperscript-svg');
const toStr = require('virtual-dom-stringify');
const fs = require('fs-promise');
const path = require('path');
const svg2png = require('svg2png');

const DEFAULT_SOFT_CORNER = 3;
const DEFAULT_TITLE = 'usabilla_feedback_button_desktop';

class ButtonGenerator {

  generate(options, contentButton) {
    ButtonGenerator.generateSVG(options, contentButton)
      .then((domTree) => ButtonGenerator.toStr(domTree))
      .then((buffer) => {
        ButtonGenerator.createFile(buffer, 'svg');
        ButtonGenerator.svg2png(buffer)
          .then((buffer) => {
            ButtonGenerator.createFile(buffer, 'png');
          })
      });
  }

  /***
   * Generate svg file
   * @param options - list of entry point specific to the creation
   * @param content - text to disaply
   * @returns {Promise.<TResult>}
   * @static
   */
  //TODO how to reject this result if failed ?
  static generateSVG(options, content) {
    return new Promise((resolve, reject) => {
      const virtualTree = virtualDom('svg', {
        width: options.width,
        height: options.height,
      }, [
        virtualDom('defs', {}, [
          virtualDom('style', {type: 'text/css'}, `@import url(${options.fontUrl}); text{font-family:custom-font;}`)]),
        virtualDom('g', {}, [
          virtualDom('rect', {
            fill: options.backgroundColor,
            x: 0,
            y: 0,
            width: options.width,
            height: options.height,
            radius: options.hasSoftCorner ? DEFAULT_SOFT_CORNER : 0,
            rx: 10, /*related to the corner - TODO still hard coded*/
            ry: 0,
          }),
          virtualDom('text', {
            fill: options.textColor,
            fontSize: '18',
            textAnchor: 'middle',
            transform: 'rotate(270, 25, 60)'
          }, [
            virtualDom('tspan', {
              x: '-19.5', /*Copy past default coordinates from old process - Apparently not aligned TODO */
              y: '70.5'
            }, content)
          ])
        ])]);

      resolve(virtualTree);
    })
  }

  /***
   * Store buffer into a file with specific extention
   * But first create buttons folder if doesn't exist
   * @param buffer
   * @param ext
   * @returns {Promise.<TResult>|*}
   * @static
   */
  //TODO is it correctly Promise structure ?!
  static createFile(buffer, ext) {
    const buttonsDirectory = 'output';
    const pathDestination = path.resolve(buttonsDirectory, `${DEFAULT_TITLE}.${ext}`);

    return fs.mkdirs(buttonsDirectory)
      .then(() => {
        return fs.writeFile(pathDestination, buffer);
      });
  }
}

ButtonGenerator.toStr = toStr;
ButtonGenerator.svg2png = svg2png;
module.exports = ButtonGenerator;
