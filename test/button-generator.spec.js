const ButtonGenerator = require('../lib/button-generator');
const fs = require('fs-promise');
const faker = require('faker');
const path = require('path');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.buttonG = new ButtonGenerator();
    this.directoryPath = './dest';
    this.fileName = faker.system.fileName();
    this.source = faker.image.imageUrl();
    this.buffer = {};
    spyOn(fs, 'mkdirs').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('createFile', function() {

    it('create a folder if not exist then write into a file ', function(done) {
      let ext = faker.system.fileExt();
      ButtonGenerator.createFile(this.buffer, ext).then(() => {
        expect(fs.mkdirs).toHaveBeenCalledWith(this.buttonG.getOutputDirectory());
        expect(fs.writeFile).toHaveBeenCalledWith(ButtonGenerator.getOutputPath(ext), this.buffer);
        done();
      }).catch(done.fail);

    });
  });

  describe('getOutputPath', function() {

    it('return a path string', function() {
      let path = ButtonGenerator.getOutputPath(faker.system.fileExt());
      expect(path).toMatch('^(.+)\/([^/]+)$');
    });

    it('return a path string and finish by a file with extension given', function() {
      let path = ButtonGenerator.getOutputPath('svg');
      let pathsGroup = path.split('.');
      expect(pathsGroup[pathsGroup.length - 1]).toBe('svg');
    })
  });
});
