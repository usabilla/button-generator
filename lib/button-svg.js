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
      height: this.options.height
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
        'font-size': '18',
        transform: 'translate(20.500000, 65.000000) rotate(270.000000) translate(-20.500000, -65.000000)'
      }, [
        this.virtualDom('tspan', {
          x: '-19.5', //TODO Copy past default coordinates from old process - if font size different than 18 it is not aligned
          y: '70.5'
        }, this.options.text)
      ])
    ]);
  }

  generateRectangle() {
    return this.virtualDom('path', {
      fill: this.options.backgroundColor,
      d: ButtonSVG.getRectangleBorder(0, 0, this.options.width, this.options.height, this.options.borderRadius)
    })
  }

  static getRectangleBorder(x, y, width, height, radius) {
    return `${ButtonSVG.getPosition(x, y)}`
      + `${ButtonSVG.getHorizontalLine(width, radius, true)}`
      + `${ButtonSVG.getArcTopleft(radius)}`
      + `${ButtonSVG.getVerticalLine(height, -radius)}`
      + `${ButtonSVG.getHorizontalLine(width, radius, false)}`
      + `${ButtonSVG.getVerticalLine(-height, radius)}`
      + `${ButtonSVG.getArcTopRight(radius)}z`;
  }

  static getPosition(x, y) {
    return `M${x},${y}`;
  }

  static getHorizontalLine(width, radius, isTopLine) {
    if (isTopLine) {
      return `h${width-radius}`;
    } else {
      return `h${-width}`;
    }
  }

  static getVerticalLine(height, radius) {
    return `v${height+radius}`;
  }

  static getArcTopleft(radius) {
    return `a${radius},${radius} 0 0 1 ${radius},${radius}`;
  }

  static getArcTopRight(radius) {
    return `a${radius},${radius} 0 0 1 ${radius},${-radius}`;
  }
}

ButtonSVG.stringify = stringify;
module.exports = ButtonSVG;
