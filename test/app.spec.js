const fs = require('fs');
const path = require('path');
const ButtonGenerator = require('../lib/app');

const SOURCE_SVG = path.resolve('./lib/resources/button.svg');
const BUILD_DIR = path.resolve('./test');

describe('ButtonGenerator', function() {
  beforeEach(function() {
    this.buttonGenerator = new ButtonGenerator();
    spyOn(this.buttonGenerator, 'svg2png').and.callThrough();
  });

  describe('#generatePNG', function() {

    it('accepts a SVG file and generates a PNG into the given directory', function(done) {
      this.buttonGenerator.generatePNG(SOURCE_SVG, BUILD_DIR)
        .then(() => {
          const files = fs.readdirSync(BUILD_DIR);
          expect(path.parse(files[2]).ext).toBe('.png'); //TODO index need to be dynamic
          done();
        })
      .catch(done.fail);
    });

    it('uses svg2png to convert files', function(done) {
      this.buttonGenerator.generatePNG(SOURCE_SVG, BUILD_DIR)
        .then(() => {
          expect(this.buttonGenerator.svg2png).toHaveBeenCalled();
          done();
        })
      .catch(done.fail);
    });

    //it('uses SVG file name for PNG filename');



  });

});
