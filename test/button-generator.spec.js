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
    this.buffer = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    spyOn(fs, 'mkdirs').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('#generate', function() {

    beforeEach(function() {
      const toFile = jasmine.createSpy('toFile');
      const sharpObj = {
        toFile,
        rotate: function() {
          return this;
        }
      };
      this.sharpObj = sharpObj;
      ButtonGenerator.sharp = function() {
        return sharpObj;
      };
      spyOn(ButtonGenerator, 'sharp').and.callThrough();
      spyOn(sharpObj, 'rotate').and.callThrough();
      this.buttonSVG = new ButtonSVG(this.options);
      spyOn(this.buttonSVG, 'generate').and.returnValue(Promise.resolve());
      spyOn(ButtonSVG, 'stringify').and.returnValue('');

      this.buttonG.generate();
    });

    it('calls stringify function', function() {
      expect(ButtonSVG.stringify).toHaveBeenCalled();
    });

    it('calls sharp module methods', function() {
      expect(ButtonGenerator.sharp).toHaveBeenCalled();
      expect(this.sharpObj.rotate).toHaveBeenCalledWith(this.buttonG.getOrientationAngle());
      expect(this.sharpObj.toFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath('png'));
    });
  });

  describe('::createFile', function() {

    it('creates a folder if it does not exist then write into a file ', function(done) {
      const ext = faker.system.fileExt();
      ButtonGenerator.createFile(this.buffer, ext).then(() => {
        expect(fs.mkdirs).toHaveBeenCalledWith(ButtonGenerator.OUPUT_DIRECTORY);
        expect(fs.writeFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath(ext), this.buffer);
        done();
      }).catch(done.fail);
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

    it('returns 0 if edge property is top', function() {
      const options = {
        edge: 'top'
      };
      const buttonGenerator = new ButtonGenerator(options);
      expect(buttonGenerator.getOrientationAngle()).toEqual(0);
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
