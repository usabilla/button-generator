const ButtonGenerator = require('../lib/app');
const path = require('path');
const fs = require('fs-promise');

const SOURCE_SVG = path.resolve('./lib/resources/button-example.svg');
const BUILD_DIR = path.resolve('./test');
const TEST_FILE_PNG_NAME = 'button-example';

describe('ButtonGenerator', function() {

  beforeEach(function() {
    this.buttonGenerator = new ButtonGenerator();
    spyOn(this.buttonGenerator, 'svg2png').and.returnValue(Promise.resolve());
    spyOn(fs, 'readFile').and.returnValue(Promise.resolve());
    spyOn(fs, 'writeFile').and.returnValue(Promise.resolve());
  });

  describe('#generatePNG', function() {

    it('reads file, converts to png, and writes it', function(done) {
      this.buttonGenerator.generatePNG(SOURCE_SVG, BUILD_DIR, TEST_FILE_PNG_NAME)
        .then(() => {
          expect(fs.readFile).toHaveBeenCalledWith(SOURCE_SVG);
          expect(this.buttonGenerator.svg2png).toHaveBeenCalled();
          expect(fs.writeFile).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });
  });
});
