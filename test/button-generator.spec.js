const ButtonGenerator = require('../lib/button-generator');
const fs = require('fs-promise');
const faker = require('faker');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.buttonG = new ButtonGenerator();
    this.fileName = faker.system.fileName();
    this.buffer = {};
    spyOn(fs, 'mkdirs').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('createFile', function() {

    it('creates a folder if it does not exist then write into a file ', function(done) {
      const ext = faker.system.fileExt();
      ButtonGenerator.createFile(this.buffer, ext).then(() => {
        expect(fs.mkdirs).toHaveBeenCalledWith(ButtonGenerator.getOutputDirectory());
        expect(fs.writeFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath(ext), this.buffer);
        done();
      }).catch(done.fail);

    });
  });

  describe('getOutputPath', function() {

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
