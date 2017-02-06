const fs = require('fs-promise');
const path = require('path');
const sharp = require('sharp');
const ButtonSVG = require('./button-svg');

const DEFAULT_TITLE = 'button';
const OUTPUT_DIRECTORY = 'output';

class ButtonGenerator {

  constructor(options) {
    this.options = options;
  }

  generate() {
    const buttonSVG = new ButtonSVG(this.options);
    const svgObject = buttonSVG.generate();
    const stringSVG = ButtonSVG.stringify(svgObject);

    //Generate a png file based on buffer svg object
    const bufferSVG = Buffer.from(stringSVG.toString());
    ButtonGenerator
      .sharp(bufferSVG)
      .rotate(this.getOrientationAngle())
      .toFile(ButtonGenerator.getOutputPath('png'));

    //TODO: need to be removed at the end of the implementation
    //ButtonGenerator.createFile(bufferSVG, 'svg');
  }

  //TODO: this method is not used anymore. Only for generating svg. Will be remove at the end of the implementation of this module.
  static createFile(buffer, ext) {
    return fs.mkdirs(OUTPUT_DIRECTORY)
      .then(() => {
        return fs.writeFile(ButtonGenerator.getOutputPath(ext), buffer);
      });
  }

  static getOutputPath(extensionFile) {
    return path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${extensionFile}`);
  }

  getOrientationAngle() {
    switch (this.options.edge) {
      case 'right':
        return 90;
      case 'left':
        return 270;
      case 'bottom':
      case 'top':
      default :
        return 0;
    }
  }
}

ButtonGenerator.OUPUT_DIRECTORY = OUTPUT_DIRECTORY;
ButtonGenerator.sharp = sharp;
module.exports = ButtonGenerator;
