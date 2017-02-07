const ButtonSVG = require('../lib/button-svg');

describe('Button SVG', function() {

  beforeEach(function() {
    this.options = {
      fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
      fontName: 'Open Sans',
      fontSize: 18,
      backgroundColor: '#000000',
      textColor: '#fff',
      borderRadius: 3,
      width: 130,
      height: 40,
      content: 'feedback'
    };
    this.buttonSVG = new ButtonSVG(this.options);
  });

  describe('#getSizeOptions', function() {
    it('returns an object with width and height attributes', function() {
      expect(this.buttonSVG.getSizeOptions()).toEqual({
        width: this.options.width,
        height: this.options.height
      });
    });
  });

  describe('#generate', function() {

    beforeEach(function() {
      this.tree = this.buttonSVG.generate(this.options);
    });

    it('returns virtual node object', function() {
      expect(this.tree.type).toBe('VirtualNode');
    });

    it('returns virtual node with the first element is SVG', function() {
      expect(this.tree.tagName).toEqual('SVG');
    });

    it('returns virtual node with the first children tagname is DEFS', function() {
      expect(this.tree.children[0].tagName).toEqual('DEFS');
    });

    it('returns virtual node with the second children tag name is G', function() {
      expect(this.tree.children[1].tagName).toEqual('G');
    });
  });

  describe('#generateElements', function() {

    beforeEach(function() {
      spyOn(this.buttonSVG, 'generateStyle').and.returnValue({});
      spyOn(this.buttonSVG, 'generateBody').and.returnValue({});
    });

    it('returns an array', function() {
      expect(this.buttonSVG.generateElements()).toEqual([{}, {}]);
    })
  });

  describe('#generateStyle', function() {

    beforeEach(function() {
      this.styleTree = this.buttonSVG.generateStyle();
    });

    it('returns virtual node object', function() {
      expect(this.styleTree.type).toBe('VirtualNode');
    });

    it('returns virtual node with the first element is DEFS', function() {
      expect(this.styleTree.tagName).toEqual('DEFS');
    });
  });

  describe('#generateBody', function() {

    beforeEach(function() {
      this.bodyTree = this.buttonSVG.generateBody(this.options);
    });

    it('returns virtual node object', function() {
      expect(this.bodyTree.type).toBe('VirtualNode');
    });

    it('returns virtual node with the first element is G', function() {
      expect(this.bodyTree.tagName).toEqual('G');
    });
  });

  describe('#generateRectangle', function() {

    beforeEach(function() {
      this.rectangle = this.buttonSVG.generateRectangle();
    });

    it('returns virtual node object', function() {
      expect(this.rectangle.type).toBe('VirtualNode');
    });

    it('returns virtual node with the first element is PATH', function() {
      expect(this.rectangle.tagName).toEqual('PATH');
    });

    it('retuns virtual node with two attributes : fill and d', function() {
      expect(this.rectangle.properties.fill).not.toBeNull();
      expect(this.rectangle.properties.d).not.toBeNull();
    })
  });

  describe('::getRectangleBorder', function() {

    it('returns the correct value if radius is 10', function() {
      const borderRadius = 10;
      const pathExpected = `${ButtonSVG.getPosition(0, 0)}`
        + `${ButtonSVG.getHorizontalTopLine(this.options.width, borderRadius)}`
        + `${ButtonSVG.getArcTopleft(borderRadius)}`
        + `${ButtonSVG.getVerticalLine(this.options.height, -borderRadius)}`
        + `${ButtonSVG.getHorizontalBottomLine(this.options.width)}`
        + `${ButtonSVG.getVerticalLine(-this.options.height, borderRadius)}`
        + `${ButtonSVG.getArcTopRight(borderRadius)}z`;

      const parameters = {
        x: 0, y: 0, width: this.options.width, height: this.options.height, radius: borderRadius
      };
      expect(ButtonSVG.getRectangleBorder(parameters))
        .toEqual(pathExpected);
    });

    it('returns the correct value if radius is 0', function() {
      const borderRadius = 0;
      const pathExpected = `${ButtonSVG.getPosition(0, 0)}`
        + `${ButtonSVG.getHorizontalTopLine(this.options.width, borderRadius)}`
        + `${ButtonSVG.getArcTopleft(borderRadius)}`
        + `${ButtonSVG.getVerticalLine(this.options.height, -borderRadius)}`
        + `${ButtonSVG.getHorizontalBottomLine(this.options.width)}`
        + `${ButtonSVG.getVerticalLine(-this.options.height, borderRadius)}`
        + `${ButtonSVG.getArcTopRight(borderRadius)}z`;

      const parameters = {
        x: 0, y: 0, width: this.options.width, height: this.options.height, radius: borderRadius
      };
      expect(ButtonSVG.getRectangleBorder(parameters))
        .toEqual(pathExpected);
    });
  });

  describe('::getPosition', function() {
    it('returns string which follows the model : Mx,y', function() {
      expect(ButtonSVG.getPosition(1, 2)).toEqual('M1,2');
    })
  });

  describe('::getHorizontalLine', function() {
    it('returns string which follows th emodel hx - Case border radius not null', function() {
      expect(ButtonSVG.getHorizontalTopLine(100, 2)).toEqual('h98');
      expect(ButtonSVG.getHorizontalBottomLine(100)).toEqual('h-100');
    });

    it('returns string which follows the model hx - Case border radius is null', function() {
      expect(ButtonSVG.getHorizontalTopLine(100, 0)).toEqual('h100');
      expect(ButtonSVG.getHorizontalBottomLine(100)).toEqual('h-100');
    })
  });

  describe('::getVerticalLine', function() {
    it('returns string which follows the model vx - Case border radius not null', function() {
      expect(ButtonSVG.getVerticalLine(40, 2)).toEqual('v42');
      expect(ButtonSVG.getVerticalLine(-40, 2)).toEqual('v-38');
    });

    it('returns string which follows the model vx - Case border radius is null', function() {
      expect(ButtonSVG.getVerticalLine(40, 0)).toEqual('v40');
      expect(ButtonSVG.getVerticalLine(-40, 0)).toEqual('v-40');
    })
  });

  describe('::getArcTopLeft', function() {
    it('returns string which follows the model ax,x 0 0 1 x,x - Case border radius not null', function() {
      expect(ButtonSVG.getArcTopleft(5)).toEqual('a5,5 0 0 1 5,5');
    });

    it('returns string which follows the model ax,x 0 0 1 x,x - Case border radius is null', function() {
      expect(ButtonSVG.getArcTopleft(0)).toEqual('a0,0 0 0 1 0,0');
    });
  });

  describe('::getArcTopRight', function() {
    it('returns string which follows the model ax,x 0 0 1 x,-x - Case border radius not null', function() {
      expect(ButtonSVG.getArcTopRight(5)).toEqual('a5,5 0 0 1 5,-5');
    });

    it('returns string which follows the model ax,x 0 0 1 x,-x - Case border radius is null', function() {
      expect(ButtonSVG.getArcTopRight(0)).toEqual('a0,0 0 0 1 0,0');
    });
  });

  describe('::verticalAlign', function() {

    let fontSize;
    let buttonHeight;
    let expectedYPosition;

    it('returns the y-position to center the text based on buttonHeight and fontSize', function() {
      fontSize = 18;
      buttonHeight = 40;
      expectedYPosition = 26.75;
      expect(ButtonSVG.verticalAlign(buttonHeight, fontSize)).toBe(expectedYPosition);

      fontSize = 14;
      buttonHeight = 60;
      expectedYPosition = 35.25;
      expect(ButtonSVG.verticalAlign(buttonHeight, fontSize)).toBe(expectedYPosition);
    });
  });

  describe('::convertFontSizeToHeight', function() {

    let fontSize;
    let textElementHeight;

    it('returns the actual height of svg text element based on the fontSize', function() {
      fontSize = 16;
      textElementHeight = 12;
      expect(ButtonSVG.convertFontSizeToHeight(fontSize)).toBe(textElementHeight);

      fontSize = 24;
      textElementHeight = 18;
      expect(ButtonSVG.convertFontSizeToHeight(fontSize)).toBe(textElementHeight);
    });
  });
});
