const {getComputerInfo} = require('./main');

getComputerInfo( ['cpu', 'bluetooth', 'bios', 'power', 'software', 'disk', 'memory', 'screen', 'network', 'ehe1', 'ehehe2'])
.then(v => {
    console.log(v);
})
.catch(e => {
    console.log(e);
})