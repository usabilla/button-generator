const ButtonSVG = require('../lib/button-svg');

describe('Button SVG', function() {

  beforeEach(function() {
    this.options = {
      fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
      fontName: 'Open Sans',
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

  describe('::getTopRoundedRect', function() {

    it('returns the correct value if radius is 10', function() {
      const borderRadius10 = 10;
      expect(ButtonSVG.getTopRoundedRect(0, 0, this.options.width, this.options.height, borderRadius10))
        .toEqual('M0,0h120a10,10 0 0 1 10,10v30h-130v-30a10,10 0 0 1 10,-10z');
    });

    it('returns the correct value if radius is 0', function() {
      const borderRadius0 = 0;
      expect(ButtonSVG.getTopRoundedRect(0, 0, this.options.width, this.options.height, borderRadius0))
        .toEqual('M0,0h130a0,0 0 0 1 0,0v40h-130v-40a0,0 0 0 1 0,0z');
    });
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

});
