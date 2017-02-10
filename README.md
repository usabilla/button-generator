Button Generator
===

This module generates a button image (png format) based on parameters.

##Setup
```
yarn install
```
## Usage
For generating a button we require these properties:
 - A font CSS url - `options.fontCssUrl`
 - A string for the font name - `options.fontName`
 - A number value for the font size - `options.fontSize`
 - A hexadecimal code for the background color of the button - `options.backgroundColor`
 - A hexadecimal code for the text color of the button - `options.textColor`
 - A number value for the border radius (px) - `option.borderRadius`
 - A number value for the width of the button (px) - `options.width`
 - A number value for the height of the button (px) - `options.height`
 - A string for the content text of the button - `options.text`
 - A string for the placement position of the button. The available options are: right, left, top, bottom. - `options.edge`

 The method `generate(options)` will generate a virtual dom tree buffer then a png image.

## Example
```
const options = {
  fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontName: 'Open Sans',
  fontSize: 18,
  backgroundColor: '#000000',
  textColor: '#fff',
  borderRadius: 3,
  width: 40,
  height: 130,
  text: 'Feedback',
  edge: 'left'
};
const button = new ButtonGenerator(options);
button.generate()
```
## Output
The generate method will produce a png file in the `output` folder.



