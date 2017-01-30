const fs = require('fs-promise');
const path = require('path');
const sharp = require('sharp');
const ButtonSVG = require('./button-svg');

const DEFAULT_TITLE = 'button';
const OUTPUT_DIRECTORY = 'output';


class ButtonGenerator {

  constructor(options){
    this.options = options;
  }

  generate() {
    const buttonSVG = new ButtonSVG(this.options);
    const svgObject = buttonSVG.generate();
    const stringSVG = ButtonSVG.stringify(svgObject);

    //Generate a png file based on buffer svg object
    const bufferSVG = Buffer.from(stringSVG.toString());
    ButtonGenerator.sharp(bufferSVG).toFile(ButtonGenerator.getOutputPath('png'));
  }

  static getOutputDirectory() {
    return OUTPUT_DIRECTORY;
  }

  static createFile(buffer, ext) {
    return fs.mkdirs(OUTPUT_DIRECTORY)
      .then(() => {
        return fs.writeFile(ButtonGenerator.getOutputPath(ext), buffer);
      });
  }

  static getOutputPath(extensionFile) {
    return path.resolve(OUTPUT_DIRECTORY, `${DEFAULT_TITLE}.${extensionFile}`);
  }
}

ButtonGenerator.sharp = sharp;
module.exports = ButtonGenerator;
