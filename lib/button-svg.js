const virtualDomh = require('virtual-dom/h');
const stringify = require('virtual-dom/create-element');

class ButtonSVG {

  constructor(options) {
    this.virtualDom = virtualDomh;
    this.options = options;
  }

  getSizeOptions() {
    return {
      width: this.options.width,
      height: this.options.height,
    }
  }

  generate() {
    return this.virtualDom('svg', this.getSizeOptions(), this.generateElements());
  }

  generateElements() {
    const elements = [];
    elements.push(this.generateStyle());
    elements.push(this.generateBody());
    return elements;
  }

  generateStyle() {
    return this.virtualDom('defs', {}, [
      this.virtualDom('style', {type: 'text/css'},
        `@import url(${this.options.fontCssUrl}); text{font-family:${this.options.fontName};}`)
    ]);
  }

  generateBody() {
    return this.virtualDom('g', {}, [

      this.generateRectangle(),

      this.virtualDom('text', {
        fill: this.options.textColor,
        'font-size': this.options.fontSize,
      }, [
        this.virtualDom('tspan', {
          'y': ButtonSVG.verticalAlign(this.options.height, this.options.fontSize),
          'x': '50%',
          'text-anchor': 'middle'
        }, this.options.text)
      ])
    ]);
  }

  generateRectangle() {
    const parameters = {
      x: 0,
      y: 0,
      width: this.options.width,
      height: this.options.height,
      radius: this.options.borderRadius,
    };
    return this.virtualDom('path', {
      fill: this.options.backgroundColor,
      d: ButtonSVG.getRectangleBorder(parameters),
    })
  }

  static getRectangleBorder(parameters) {
    return `${ButtonSVG.getPosition(parameters.x, parameters.y)}`
      + `${ButtonSVG.getHorizontalTopLine(parameters.width, parameters.radius)}`
      + `${ButtonSVG.getArcTopLeft(parameters.radius)}`
      + `${ButtonSVG.getVerticalLine(parameters.height, -parameters.radius)}`
      + `${ButtonSVG.getHorizontalBottomLine(parameters.width)}`
      + `${ButtonSVG.getVerticalLine(-parameters.height, parameters.radius)}`
      + `${ButtonSVG.getArcTopRight(parameters.radius)}z`;
  }

  static getPosition(x, y) {
    return `M${x},${y}`;
  }

  static getHorizontalBottomLine(width) {
    return `h${-width}`;
  }

  static getHorizontalTopLine(width, radius) {
    return `h${width - radius}`;
  }

  static getVerticalLine(height, radius) {
    return `v${height + radius}`;
  }

  static getArcTopLeft(radius) {
    return `a${radius},${radius} 0 0 1 ${radius},${radius}`;
  }

  static getArcTopRight(radius) {
    return `a${radius},${radius} 0 0 1 ${radius},${-radius}`;
  }

  static verticalAlign(height, fontSize) {
    return height - (height - estimateLetterHeightFromFontSize(fontSize)) / 2;
  }
}

function estimateLetterHeightFromFontSize(fontSize) {
  const sizeToHeightRatio = 0.75; // best ratio found through experimentation
  return fontSize * sizeToHeightRatio;
}

ButtonSVG.stringify = stringify;
module.exports = ButtonSVG;
