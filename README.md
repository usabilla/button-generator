Button Generator
===

This module permit to generate a button image (svg and png format) based on parameters.

##Setup
```
yarn install
```
## Usage
For generating a button we require these properties :
 - a font css url - `options.fontUrl`
 - A string for the font name - `options.fontName`
 - A code hexadecimal for the color background of button - `options.backgroundColor`
 - A code hexadecimal for the text of the button - `options.textColor`
 - A boolean value (true/false) for the corner of the button. If true 3px will be apply to each corner - `options.hasSoftCorner`
 - A number value for the width of the button - `options.width`
 - A number value for the height of the button - `options.height`
 - A string for the content text of the button - `options.content`
 
 Then the method `generate(options)` will create a virtual dom tree and output the result in a svg file. Then, convert it as png file 
## Example
``` 
const options = {
  fontUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontName: 'Open Sans',
  backgroundColor: '#000000',
  textColor: '#fff',
  hasSoftCorner: false,
  width: 40,
  height: 130,
  content:'Feedback'
};
const button = new ButtonGenerator();
button.generate(options)
```
## Output
The generate method will produce two files :
- svg file
- png file
  


