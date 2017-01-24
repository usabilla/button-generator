const path = require('path');
const sharpmodule = require('sharp');

module.exports = class ButtonGenerator {
  constructor() {
    this.sharp = sharpmodule;
  }

  /***
   * Generate a png image.
   * @param sourceSVG : url of the svg file
   * @param destination : url of the destination
   * @param title : the title of the png file
   * @returns {Promise.<TResult>}
   */
  generatePNG(sourceSVG, destination, title) {
    return this.sharp(sourceSVG).toFile(path.join(destination, `${title}.png`));
  }
};
