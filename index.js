const ButtonGenerator = require('./lib/button-generator');

//Just for test
const options = {
  fontUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontName: 'Open Sans',
  backgroundColor: '#000000',
  textColor: '#fff',
  hasSoftCorner: true,
  width: 40,
  height: 130,
  content:'Feedback'
};
const button = new ButtonGenerator();
button.generate(options);
