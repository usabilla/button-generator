const ButtonGenerator = require('../lib/button-generator');
const ButtonSVG = require('../lib/button-svg');
const fs = require('fs-promise');
const faker = require('faker');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.options = {};
    this.buttonG = new ButtonGenerator(this.options);
    this.buffer = {};
    spyOn(fs, 'mkdirs').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('#generate', function() {

    beforeEach(function() {
      const toFile = jasmine.createSpy('toFile');
      this.buttonSVG = new ButtonSVG(this.options);
      spyOn(this.buttonSVG, 'generate').and.returnValue(Promise.resolve());
      spyOn(ButtonSVG, 'stringify').and.returnValue('');
      spyOn(ButtonGenerator, 'sharp').and.returnValue({toFile});
      this.buttonG.generate();
    });

    it('calls stringify function', function() {
      expect(ButtonSVG.stringify).toHaveBeenCalled();
    });

    it('calls sharp module methods', function() {
      expect(ButtonGenerator.sharp).toHaveBeenCalled();
      expect(ButtonGenerator.sharp().toFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath('png'));
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
});
