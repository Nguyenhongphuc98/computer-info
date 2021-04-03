const { getComputerInfo } = require('./lib/main');

// Promise style
getComputerInfo([
    'cpu',      'bluetooth',
    'bios',     'power',    
    'software', 'disk',     
    'memory',   'display',  
    'graphics', 'sound',    
    'keyboard', 'network', 'afas'
  ], 200)
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
