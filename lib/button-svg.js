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

  generateBody() {
    return this.virtualDom('g', {}, [
      this.virtualDom('rect', {
        fill: this.options.backgroundColor,
        x: 0,
        y: 0,
        width: this.options.width,
        height: this.options.height,
        rx: this.options.borderRadius, //TODO find a way to have only one side of the rectangle
        ry: this.options.borderRadius,
      }),
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

  generateStyle() {
    return this.virtualDom('defs', {}, [
      this.virtualDom('style', {type: 'text/css'},
        `@import url(${this.options.fontCssUrl}); text{font-family:${this.options.fontName};}`)
    ]);
  }
}

ButtonSVG.stringify = stringify;
module.exports = ButtonSVG;
