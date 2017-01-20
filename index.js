const ButtonGenerator = require('./lib/button-generator');

//Just for test
const options = {
  fontUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  backgroundColor: '#000000',
  textColor: '#fff',
  hasSoftCorner: false,
  width: 40,
  height: 130
};
const content = 'Feedback';
const button = new ButtonGenerator();
button.generate(options,content);
