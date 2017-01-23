const toStr = require('virtual-dom-stringify');
const fs = require('fs-promise');
const path = require('path');
const svg2png = require('svg2png');
const ButtonSVG = require('./button-svg');

const DEFAULT_TITLE = 'usabilla_feedback_button_desktop';
const OUTPUT_DIRECTORY = 'output';


class ButtonGenerator {
  /***
   * Generate method
   * @param options
   */
  generate(options) {
    let buttonSVG = new ButtonSVG();
    let svgObject = buttonSVG.generate(options);
    let bufferSVG = ButtonGenerator.toStr(svgObject);
    ButtonGenerator.createFile(bufferSVG, 'svg');
    ButtonGenerator.svg2png(bufferSVG)
      .then((buffer) => ButtonGenerator.createFile(buffer, 'png'));
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
    const pathDestination = path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${ext}`);

    return fs.mkdirs(OUTPUT_DIRECTORY)
      .then(() => {
        return fs.writeFile(pathDestination, buffer);
      });
  }
}

ButtonGenerator.toStr = toStr;
ButtonGenerator.svg2png = svg2png;
module.exports = ButtonGenerator;
