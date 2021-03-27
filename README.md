# mycomputer-info 
Get computer information with just one line
## Installation
```
npm i mycomputer-info 
```
:blush:
## Usage
:purple_heart::purple_heart: computer-info provide two way to get info. Promise and callback style.
```
const { getComputerInfo } = require('mycomputer-info');
```
```
// Promise style
getComputerInfo(['category1', 'category2'[, categoryn])
    .then(v => {
        console.log(v);
    })
    .catch(e => {
        console.log(e);
    })

// Callback style
getComputerInfo(['category1', 'category2'[, categoryn],
    (data, err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    }
)
```
## Support categories
### :purple_heart::purple_heart:Mac:
```
'host', 'model', 'cpu', 'user', 'thread', 'l3', 'l2', 'memory', 'camera', 'applePay', 'bluetooth', 'ethenet', 'graphics', 'hardware', 'wifi', 'power', 'disk', 'ram', 'software'
```
### :purple_heart::purple_heart:Win:
```
'cpu', 'bluetooth', 'bios', 'power', 'software', 'disk', 'memory', 'display', 'network', 'graphics', 'sound'
```
# What's in next version
Guess :eyes::eyes:
