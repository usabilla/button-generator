const fs = require('fs');
const path = require('path');
const ButtonGenerator = require('../lib/app');

const SOURCE_SVG = path.resolve('./lib/resources/button-example.svg');
const BUILD_DIR = path.resolve('./test');
const TEST_FILE_PNG_NAME = 'button-example';

describe('ButtonGenerator', function() {
  beforeEach(function() {
    this.buttonGenerator = new ButtonGenerator();
    spyOn(this.buttonGenerator, 'svg2png').and.callThrough();
  });

  describe('#generatePNG', function() {

    it('accepts a SVG file and generates a PNG into the given directory', function(done) {
      this.buttonGenerator.generatePNG(SOURCE_SVG, BUILD_DIR,TEST_FILE_PNG_NAME)
        .then(() => {
          const files = fs.readdirSync(BUILD_DIR);
          let fileFound = files.find((file) => {
            return file === TEST_FILE_PNG_NAME+'.png'
          });
          expect(fileFound).not.toEqual(undefined);
          expect(path.parse(fileFound).ext).toBe('.png');
          done();
        })
        .catch(done.fail);
    });

    it('uses svg2png to convert files', function(done) {
      this.buttonGenerator.generatePNG(SOURCE_SVG, BUILD_DIR,TEST_FILE_PNG_NAME)
        .then(() => {
          expect(this.buttonGenerator.svg2png).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });
  });

});
