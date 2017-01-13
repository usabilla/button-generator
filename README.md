BUTTON GENERATOR
===

This module permit to generate a button picture (png format) based on parameters.



##Setup
```
yarn install
```

## how to use it
For generating a button 


``` 
buttonGenerator.generate(options)
```

with options, an list of parameters. Example :
```
options = {
  fontUrl : '//fonts.googleapis.com/css?family=Open+Sans'
  backgroundColor : '#4286f4',
  textColor:'#000000',
  content: 'Feedback',
  hasSoftCorner : true
  size : {
      width: 40,
      height: 130
   }
}
```
  


