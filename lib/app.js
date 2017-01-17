const fs = require('fs-promise');
const svg2png = require('svg2png');
const path = require('path');


module.exports = class ButtonGenerator {

  constructor() {
    this.svg2png = svg2png;
  }

  /***
   * Generate a png image.
   * @param sourceSVG : url of the svg file
   * @param destination : url of the destination
   * @param title : the title of the png file
   * @returns {Promise.<TResult>}
   */
  generatePNG(sourceSVG, destination, title) {
    return fs.readFile(sourceSVG)
      .then(buffer =>this.svg2png(buffer))
      .then(buffer => fs.writeFile(path.join(destination,title +'.png'), buffer))
  }
};
