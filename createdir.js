const fs = require('fs');
const path = 'buttons';

createButtonsDirectory = fs.mkdirSync(path);
console.log(path);
