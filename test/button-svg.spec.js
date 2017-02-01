const ButtonSVG = require('../lib/button-svg');

describe('Button SVG', function() {

  beforeEach(function() {
    this.options = {
      fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
      fontName: 'Open Sans',
      backgroundColor: '#000000',
      color: '#fff',
      borderRadius: 3,
      width: 40,
      height: 130,
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

  describe('#generateStyle', function() {

    beforeEach(function() {
      this.styleTree = this.buttonSVG.generateStyle();
    });

    it('return virtual node object', function() {
      expect(this.styleTree.type).toBe('VirtualNode');
    });

    it('returns virtual node with the first element is DEFS', function() {
      expect(this.styleTree.tagName).toEqual('DEFS');
    });
  });

});
