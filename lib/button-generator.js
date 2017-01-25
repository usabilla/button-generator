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
    let stringSVG = ButtonSVG.stringify(svgObject);

    //Generate a svg file
    ButtonGenerator.createFile(stringSVG, 'svg');

    //Generate a png file based on buffer svg object
    let bufferSVG  = Buffer.from(stringSVG.toString());
    ButtonGenerator.sharp(bufferSVG).toFile(ButtonGenerator.getOutputPath('png'));
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
    return fs.mkdirs(OUTPUT_DIRECTORY)
      .then(() => {
        return fs.writeFile(ButtonGenerator.getOutputPath(ext), buffer);
      });
  }

  /**
   * Get the path where the output file are store
   * @param extensionFile
   * @returns {string}
   */
  static getOutputPath(extensionFile) {
    return path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${extensionFile}`);

  }
}

ButtonGenerator.sharp = sharp;
module.exports = ButtonGenerator;
