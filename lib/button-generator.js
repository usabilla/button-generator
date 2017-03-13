const svg2png = require('svg2png');
const sharp = require('sharp');
const ButtonSVG = require('./button-svg');

class ButtonGenerator {

  constructor(options) {
    this.options = options;

    this._applyRotation = this._applyRotation.bind(this);
  }

  generate() {
    const buttonSVG = new ButtonSVG(this.options);
    const svgObject = buttonSVG.generate();
    const stringSVG = ButtonSVG.stringify(svgObject);

    //Generate a png file based on buffer svg object
    const bufferSVG = Buffer.from(stringSVG.toString());
    return ButtonGenerator.
      svg2png(bufferSVG, {width: this.options.width, height: this.options.height})
      .then(this._applyRotation);
  }

  _applyRotation(buffer) {
    return ButtonGenerator
      .sharp(buffer)
      .rotate(this.getOrientationAngle())
      .toBuffer();
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

ButtonGenerator.sharp = sharp;
ButtonGenerator.svg2png = svg2png;
module.exports = ButtonGenerator;
