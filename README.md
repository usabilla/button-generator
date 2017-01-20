Button Generator
===

This module permit to generate a button image (svg and png format) based on parameters.

##Setup
```
yarn install
```

## Usage
``` 
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
button.generate(options,content)
```
## Output
The generate method will produce two files :
- svg file
- png file
  


