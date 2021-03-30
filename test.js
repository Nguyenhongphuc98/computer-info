const { getComputerInfo } = require('./lib/main');

// Promise style
getComputerInfo(['host', 'model', 'cpu', 'user', 'thread', 'l3', 'l2', 'memory', 'camera', 'applePay', 'bluetooth', 'ethenet', 'graphics', 'hardware', 'wifi', 'power', 'disk', 'ram', 'software'])
    .then(v => {
        console.log(v);
    })
    .catch(e => {
        console.log(e);
    })

// Callback style
// getComputerInfo(['cpu', 'bluetooth', 'bios',
//     'power', 'software', 'disk', 'memory', 'screen',
//     'network', 'ehe1', 'ehehe2'],
//     (data, err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//         }
//     }
// )
