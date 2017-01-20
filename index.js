const ButtonGenerator= require('./lib/button-generator');

/*Util for running module with command-line*/
if (process.argv.length != 9) {
  console.log('not enough arguments');
} else {
  const options = {
    fontUrl: process.argv[2],
    backgroundColor: process.argv[3],
    textColor: process.argv[4],
    content: process.argv[5],
    hasSoftCorner: process.argv[6],
    size: {
      width: process.argv[7],
      height: process.argv[8]
    }
  }
  console.log(options); //TODO don't trust input - check data type
  (new ButtonGenerator()).generate(options);
}
