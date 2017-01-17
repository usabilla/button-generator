const ButtonGenerator = require('../lib/app');
const fs = require('fs-promise');
const faker = require('faker');

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.buttonGenerator = new ButtonGenerator();
    this.directoryPath = './dest';
    this.source = faker.image.imageUrl();

    spyOn(this.buttonGenerator, 'svg2png').and.returnValue(Promise.resolve());
    spyOn(fs, 'readFile').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('#generatePNG', function() {

    it('reads file, converts to png, and writes it', function(done) {
      this.buttonGenerator.generatePNG(this.source, this.directoryPath, faker.system.fileName())
        .then(() => {
          expect(fs.readFile).toHaveBeenCalledWith(this.source);
          expect(this.buttonGenerator.svg2png).toHaveBeenCalled();
          expect(fs.writeFile).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });
  });
});
