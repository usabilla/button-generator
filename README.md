Button Generator
===

This module generates a button image (png format) based on parameters.

##Setup
```
yarn install
```
## Usage
For generating a button we require these properties :
 - a font css url - `options.fontCssUrl`
 - A string for the font name - `options.fontName`
 - A code hexadecimal for the color background of button - `options.backgroundColor`
 - A code hexadecimal for the text of the button - `options.color`
 - A number value for the border Radius (pixel) - `option.borderRadius`
 - A number value for the width of the button - `options.width`
 - A number value for the height of the button - `options.height`
 - A string for the content text of the button - `options.text`
 
 Then the method `generate(options)` will generate a virtual Dom tree buffer then a png image
 
## Example
``` 
const options = {
  fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontName: 'Open Sans',
  backgroundColor: '#000000',
  color: '#fff',
  borderRadius: false,
  width: 40,
  height: 130,
  text: 'Feedback'
};
const button = new ButtonGenerator();
button.generate(options)
```
## Output
The generate method will produce two files :
- svg file
- png file
  


