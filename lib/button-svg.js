const virtualDomh = require('virtual-dom/h');
const stringify = require('virtual-dom/create-element');

const DEFAULT_SOFT_CORNER = 3;

class ButtonSVG {

  constructor() {
    this.virtualDom = virtualDomh;
  }

  generate(options) {
    this.options = options;
    return this.virtualDom('svg', this.getSizeOptions(), this.generateElements());
  }

  getSizeOptions() {
    return {
      width: this.options.width,
      height: this.options.height
    }
  }

  generateElements() {
    let elements = [];
    elements.push(this.generateStyle());
    elements.push(this.generateBody());
    return elements;
  }

  generateBody() {
    return this.virtualDom('g', {}, [
      this.virtualDom('rect', {
        fill: this.options.backgroundColor,
        x: 0,
        y: 0,
        width: this.options.width,
        height: this.options.height,
        rx: this.options.hasSoftCorner ? DEFAULT_SOFT_CORNER : 0,
        ry: this.options.hasSoftCorner ? DEFAULT_SOFT_CORNER : 0,
      }),
      this.virtualDom('text', {
        fill: this.options.textColor,
        'font-size': '18',
        transform: 'translate(20.500000, 65.000000) rotate(270.000000) translate(-20.500000, -65.000000)'
      }, [
        this.virtualDom('tspan', {
          x: '-19.5', //TODO Copy past default coordinates from old process - if font size different than 18 it is not aligned
          y: '70.5'
        }, this.options.content)
      ])
    ]);
  }

  generateStyle() {
    return this.virtualDom('defs', {}, [
      this.virtualDom('style', {type: 'text/css'},
        `@import url(${this.options.fontUrl}); text{font-family:${this.options.fontName};}`)
    ]);
  }
}

ButtonSVG.stringify = stringify;
module.exports = ButtonSVG;
