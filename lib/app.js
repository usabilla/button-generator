const fs = require('pn/fs');
const svg2png = require('svg2png');

module.exports = class ButtonGenerator {

  constructor() {
    this.svg2png = svg2png;
  }

  generatePNG(sourceSVG, dest) {
    return fs.readFile(sourceSVG)
      .then(buffer =>this.svg2png(buffer,{width:70,height:25}))
      .then(buffer => fs.writeFile(dest + '/button.png', buffer))
  }
};
