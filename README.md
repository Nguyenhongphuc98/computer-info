# computer-info
Get computer information with just one line
# Quick start
## Installation
waiting to distribute, please pull this code and add to your project :blush:
## Usage
:purple_heart::purple_heart: computer-info provide two way to get info. Promise and callback style.
```
const { getComputerInfo } = require('./main');
```
```
// Promise style
getComputerInfo(['cpu', 'bluetooth', 'bios', 'power', 'software', 'disk', 'memory', 'screen', 'network', 'ehe1', 'ehehe2'])
    .then(v => {
        console.log(v);
    })
    .catch(e => {
        console.log(e);
    })

// Callback style
getComputerInfo(['cpu', 'bluetooth', 'bios',
    'power', 'software', 'disk', 'memory', 'screen',
    'network', 'ehe1', 'ehehe2'],
    (data, err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    }
)
```
# What's in next version
Guess :eyes::eyes:
