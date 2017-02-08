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
    return ButtonGenerator
      .sharp(bufferSVG)
      .rotate(this.getOrientationAngle());
  }

  getBuffer() {
    return this.generate().toBuffer();
  }

  getPng() {
    return this.generate().toFile(ButtonGenerator.getOutputPath('png'))
  }

  static getOutputPath(extensionFile) {
    return path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${extensionFile}`);
  }

  getOrientationAngle() {
    const angles = {
      right: 270,
      left: 90,
      top: 0,
      bottom: 0
    };
    return angles[this.options.edge] || 0;
  }
}

ButtonGenerator.OUPUT_DIRECTORY = OUTPUT_DIRECTORY;
ButtonGenerator.sharp = sharp;
module.exports = ButtonGenerator;
