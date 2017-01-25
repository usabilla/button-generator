const fs = require('fs-promise');
const path = require('path');
const sharp = require('sharp');
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
    let bufferSVG = ButtonSVG.stringify(svgObject);
    ButtonGenerator.createFile(bufferSVG, 'svg')
      .then(() => {
        //can be refactoring
        let pathSVG = path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.svg`);
        let pathpng = path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.png`);
        return ButtonGenerator.sharp(pathSVG).toFile(pathpng);
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
  static createFile(buffer, ext) {
    let pathDestination = path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${ext}`);

    return fs.mkdirs(OUTPUT_DIRECTORY)
      .then(() => {
        return fs.writeFile(pathDestination, buffer);
      });
  }
}

ButtonGenerator.sharp = sharp;
module.exports = ButtonGenerator;
