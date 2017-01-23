const ButtonSVG = require('../lib/button-svg');

describe('Button SVG', function() {

  beforeEach(function() {
    this.buttonSVG = new ButtonSVG();
    this.options = {
      fontUrl: '//fonts.googleapis.com/css?family=Open+Sans',
      fontName: 'Open Sans',
      backgroundColor: '#000000',
      textColor: '#fff',
      hasSoftCorner: false,
      width: 40,
      height: 130,
      content: 'feedback'
    };
    this.buttonSVG.generate(this.options);
  });

  describe('#generateBody', function() {
    it('return virtual node object', function() {
      let tree = this.buttonSVG.generateBody(this.options);
      expect(tree.type).toBe('VirtualNode');
    });

    it('return virtual node with the first element is G', function() {
      let tree = this.buttonSVG.generateBody(this.options);
      expect(tree.tagName).toEqual('G');
    });
  });

  describe('#generateStyle', function() {
    it('return virtual node object', function() {
      let tree = this.buttonSVG.generateStyle();
      expect(tree.type).toBe('VirtualNode');
    });

    it('return virtual node with the first element is DEFS', function() {
      let tree = this.buttonSVG.generateStyle();
      expect(tree.tagName).toEqual('DEFS');
    });
  });

  describe('#generate', function() {
    it('return virtual node object', function() {
      let tree = this.buttonSVG.generate(this.options);
      expect(tree.type).toBe('VirtualNode');
    });

    it('return virtual node with the first element is SVG', function() {
      let tree = this.buttonSVG.generate(this.options);
      expect(tree.tagName).toEqual('SVG');
    });

    it('return virtual node with the first children tagname is DEFS', function() {
      let tree = this.buttonSVG.generate(this.options);
      expect(tree.children[0].tagName).toEqual('DEFS');
    });

    it('return virtual node with the second children tag name is G', function() {
      let tree = this.buttonSVG.generate(this.options);
      expect(tree.children[1].tagName).toEqual('G');
    });
  });


});
