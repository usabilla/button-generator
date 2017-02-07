const ButtonGenerator = require('../lib/button-generator');
const ButtonSVG = require('../lib/button-svg');
const fs = require('fs-promise');
const faker = require('faker');

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
    const toFile = jasmine.createSpy('toFile');
    const toBuffer = jasmine.createSpy('toBuffer');
    this.sharpObj = {
      toFile,
      toBuffer,
      rotate: function() {
        return this;
      }
    };
    ButtonGenerator.sharp = () => this.sharpObj;
    spyOn(ButtonGenerator, 'sharp').and.callThrough();
    spyOn(this.sharpObj, 'rotate').and.callThrough();
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

    it('calls sharp module methods', function() {
      this.buttonG.generate();
      expect(ButtonGenerator.sharp).toHaveBeenCalled();
      expect(this.sharpObj.rotate).toHaveBeenCalledWith(this.buttonG.getOrientationAngle());
    });
  });

  describe('#getBuffer', function() {
    it('calls toBuffer', function() {
      this.buttonG.getBuffer();
      expect(this.sharpObj.toBuffer).toHaveBeenCalled();
    });
  });

  describe('#getPng', function() {
    it('calls toFile', function() {
      this.buttonG.getPng();
      expect(this.sharpObj.toFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath('png'));
    });
  });

  describe('::getOutputPath', function() {
    it('returns a path which is a string', function() {
      const path = ButtonGenerator.getOutputPath(faker.system.fileExt());
      expect(path).toMatch('^(.+)\/([^/]+)$');
    });

    it('returns a path that includes the correct extension', function() {
      const path = ButtonGenerator.getOutputPath('svg');
      const pathsGroup = path.split('.');
      expect(pathsGroup[pathsGroup.length - 1]).toBe('svg');
    })
  });

  describe('::getOrientationAngle', function() {
    it('returns 0 if orientation not found', function() {
      const options = {
        edge: 'labelNotFound'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(0);
    });

    it('returns 270 if edge property is left', function() {
      const options = {
        edge: 'left'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(270);
    });

    it('returns 0 if edge property is top', function() {
      const options = {
        edge: 'top'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(0);
    });
  })
});
