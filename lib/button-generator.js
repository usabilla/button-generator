const fs = require('fs-promise');
const path = require('path');
const sharp = require('sharp');
const ButtonSVG = require('./button-svg');

const DEFAULT_TITLE = 'usabilla_feedback_button_desktop';
const OUTPUT_DIRECTORY = 'output';


class ButtonGenerator {

  getDefaultTitle() {
    return DEFAULT_TITLE;
  }

  getOutputDirectory() {
    return OUTPUT_DIRECTORY;
  }

  generate(options) {
    let buttonSVG = new ButtonSVG();
    let svgObject = buttonSVG.generate(options);
    let stringSVG = ButtonSVG.stringify(svgObject);

    //Generate a svg file
    ButtonGenerator.createFile(stringSVG, 'svg');

    //Generate a png file based on buffer svg object
    let bufferSVG = Buffer.from(stringSVG.toString());
    ButtonGenerator.sharp(bufferSVG).toFile(ButtonGenerator.getOutputPath('png'));
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
