Button Generator
===

This node module generates a buffer of a button png image based on a set of parameters. It is used in the [Usabilla Themes Publisher](https://github.com/usabilla/themes-publisher) to create feedback buttons.

## Setup
```
yarn install
```
## Usage
For generating a button we require these properties:
 - A font CSS url - `options.fontCssUrl` OR a font file url - `options.fontFileUrl` (optional, will default to CSS url if both are defined)
 - A string for the font name - `options.fontName`
 - A number value for the font size - `options.fontSize`
 - A hexadecimal code for the background color of the button - `options.backgroundColor`
 - A hexadecimal code for the text color of the button - `options.textColor`
 - A number value for the border radius (px) - `option.borderRadius`
 - A number value for the width of the button (px) - `options.width`
 - A number value for the height of the button (px) - `options.height`
 - A string for the content text of the button - `options.text`
 - A string for the placement position of the button. The available options are: right, left, top, bottom. - `options.edge`

 The method `generate(options)` will generate a png buffer.

## Example
```
const options = {
  fontCssUrl: '//fonts.googleapis.com/css?family=Open+Sans',
  fontFileUrl: 'http://www.amazon.com/my-font.woff',
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
button
  .generate()
  .then(buffer => console.log(buffer))
```
