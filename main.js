const macOS = require('./mac');
const winOS = require('./win');

let platf;
let components = [];

if (process.platform === 'darwin') {
    platf = macOS;
    components = ['host', 'model', 'cpu', 'user', 'thread', 'l3', 'l2', 'memory', 'camera', 'applePay', 'bluetooth', 'ethenet', 'graphics', 'hardware', 'wifi', 'power', 'disk', 'ram', 'software'];
} else {
    platf = winOS;
    components = ['cpu', 'bluetooth', 'bios', 'power', 'software', 'disk', 'memory', 'screen', 'network'];
}

function getComputerInfo(categories, callback) {
    // Filter invalid args
    const invalids = [];
    const valids = [];

    categories.forEach(c => {
        if (components.includes(c)) {
            valids.push(c);
        } else {
            invalids.push(c);
        }
    });

    return new Promise((resolve, reject) => {

        if (invalids.length === categories.length) {
            const message = 'No categories found!!!';
            if (callback) { callback(null, message); }
            reject(message);
        } else {

            let excuteables = [];
            let result = {};
            if (invalids.length !== 0) {
                result['invalidCategories'] = invalids.toString();
            }
            result['validCategories'] = valids.toString();
            result['categories'] = []

            valids.forEach(c => {
                excuteables.push(getExcuteable(c));
            })

            Promise.all(excuteables)
                .then(values => {
                    values.forEach(v => {
                        result['categories'].push(v);
                    })

                    if (callback) { callback(result, null); }
                    resolve(result);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    })
}

function getExcuteable(category) {
    switch (category) {
        // Both =============================================
        case 'cpu': return platf.cpu();
        case 'power': return platf.power();
        case 'disk': return platf.disk();
        case 'memory': return platf.memory();
        case 'bluetooth': return platf.bluetooth();
        case 'software': return platf.software();

        // MacOS =============================================
        case 'camera': return platf.camera();
        case 'host': return platf.host();
        case 'model': return platf.model();
        case 'user': return platf.user();
        case 'thread': return platf.thread();
        case 'l3': return platf.l3();
        case 'l2': return platf.l2();
        case 'applePay': return platf.applePay();
        case 'ethenet': return platf.ethenet();
        case 'graphics': return platf.graphics();
        case 'hardware': return platf.hardware();
        case 'wifi': return platf.wifi();
        case 'ram': return platf.ram();

        // Windows only =============================================
        case 'bios': return platf.bios();
        case 'screen': return platf.screen();
        case 'network': return platf.network();
    }
}

module.exports = { getComputerInfo }