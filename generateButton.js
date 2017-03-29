const ButtonGenerator = require('./lib/button-generator');

const button = {
  fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontName: 'Open Sans',
  fontSize: 18,
  backgroundColor: '#000000',
  textColor: '#fff',
  borderRadius: 10,
  width: 130,
  height: 40,
  text: 'TJIN',
  edge: 'top'
};

const buttonGenerator = new ButtonGenerator(button);

buttonGenerator.generate();
