const ButtonGenerator = require('../lib/button-generator');
const ButtonSVG = require('../lib/button-svg');
const fs = require('fs-promise');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.options = {
      fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
      fontName: 'Open Sans',
      fontSize: 18,
      backgroundColor: '#000000',
      textColor: '#fff',
      borderRadius: 3,
      width: 40,
      height: 130,
      text: 'feedback',
      edge: 'left'
    };
    this.buttonG = new ButtonGenerator(this.options);
    spyOn(fs, 'mkdirs').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
    this.sharpObj = jasmine.createSpyObj('sharpObj', ['toBuffer', 'rotate']);
    this.sharpObj.rotate.and.returnValue(this.sharpObj);
    this.sharpObj.toBuffer.and.returnValue(Promise.resolve());
    spyOn(ButtonGenerator, 'sharp').and.returnValue(this.sharpObj);
    spyOn(ButtonGenerator, 'svg2png').and.returnValue(Promise.resolve());
  });

  describe('#generate', function() {
    beforeEach(function() {
      this.buttonSVG = new ButtonSVG(this.options);
      spyOn(this.buttonSVG, 'generate').and.returnValue(Promise.resolve());
      spyOn(ButtonSVG, 'stringify').and.returnValue('');
    });

    it('calls stringify function', function() {
      this.buttonG.generate();
      expect(ButtonSVG.stringify).toHaveBeenCalled();
    });

    it('calls sharp module methods', function(done) {
      expect(this.buttonG.generate()).toResolve(done, () => {
        expect(ButtonGenerator.sharp).toHaveBeenCalled();
        expect(this.sharpObj.rotate).toHaveBeenCalledWith(this.buttonG.getOrientationAngle());
        expect(this.sharpObj.toBuffer).toHaveBeenCalled();
      });
    });

    it('calls svg2png', function(done) {
      expect(this.buttonG.generate()).toResolve(done, () => {
        expect(ButtonGenerator.svg2png).toHaveBeenCalled();
      });
    });
  });


  describe('::getOrientationAngle', function() {
    it('returns 0 if orientation not found', function() {
      const options = {
        edge: 'labelNotFound'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(0);
    });

    it('returns 90 if edge property is left', function() {
      const options = {
        edge: 'left'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(90);
    });

    it('returns 270 if edge property is right', function() {
      const options = {
        edge: 'right'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(270);
    });

    it('returns 180 if edge property is top', function() {
      const options = {
        edge: 'top'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(180);
    });

    it('returns 0 if edge property is bottom', function() {
      const options = {
        edge: 'bottom'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(0);
    });
  })
});
