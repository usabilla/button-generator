const ButtonGenerator = require('../lib/app');
const fs = require('fs-promise');
const faker = require('faker');
const path = require('path');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.buttonGenerator = new ButtonGenerator();
    this.directoryPath = './dest';
    this.fileName = faker.system.fileName();
    this.source = faker.image.imageUrl();
    this.buffer = {};
    spyOn(this.buttonGenerator, 'svg2png').and.returnValue(Promise.resolve(this.buffer));
    spyOn(fs, 'readFile').and.returnValue(Promise.resolve(this.buffer));
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('#generatePNG', function() {

    it('reads file, converts to png, and writes it', function(done) {
      this.buttonGenerator.generatePNG(this.source, this.directoryPath, this.fileName)
        .then(() => {
          expect(fs.readFile).toHaveBeenCalledWith(this.source);
          expect(this.buttonGenerator.svg2png).toHaveBeenCalledWith(this.buffer);
          expect(fs.writeFile).toHaveBeenCalledWith(path.join(this.directoryPath, `${this.fileName}.png`),this.buffer);
          done();
        })
        .catch(done.fail);
    });
  });
});
