const { exec } = require('child_process');
const { mac, systemProfilers, sysctls, requests } = require('./lib/mac');
const { rawItemToObject } = require('./lib/utils')

const os = process.platform;

// type constans
const commandType = {
    'profiler': 'profiler',
    'sysctl': 'sysctl'
}

// global var
let rawResult = {}; // all result receive from stdout, ordered same cmdqueue
let systemQueue = []; // queue of excutable command, each command type may contain more than one param
let queueIndex = 0; // index of processing command
let result = {}; // final result

function getSystemCommand(categories) {
    const queue = [{
        'type': commandType.profiler,
        'fullCmd': 'system_profiler',
        'items': []
    },
    {
        'type': commandType.sysctl,
        'fullCmd': 'sysctl',
        'items': []
    }]

    categories.forEach(c => {
        switch (os) {
            case 'darwin':
                if (systemProfilers.has(c)) {
                    queue[0].fullCmd += (' ' + systemProfilers.get(c));
                    queue[0].items.push(c);
                } else if (sysctls.has(c)) {
                    queue[1].fullCmd += (' ' + sysctls.get(c));
                    queue[1].items.push(c);
                }
                break;

            case 'win32':
                //do for win
                break;

            default:
                break;
        }
    });

    // Remove unuse cmd queue
    return queue.filter(c => c.items.length !== 0);
}

// convert stdout to to raw result
// stdout may success or failure
function observerStdout(err, stdout, stderr) {
    const queueItem = systemQueue[queueIndex];
    const rawItem = rawResult[queueItem.type];

    switch (os) {
        case 'darwin':
            if (err) {
                rawItem.isError = true;
                rawItem.message = stderr;
                rawItem.rows = queueItem.items;
            } else {
                rawItem.rows = stdout;
                rawItem.message = 'Command excute successfuly';
            }
            break;

        case 'win32':
            //do for win
            break;

        default:
            break;
    }
}

// handle raw data from stdout of each command type
// divide it to parts raw item
function rawToParts(cmdType, callback) {
    if (systemQueue.find(e => e.type === cmdType)) {
        const rawItem = rawResult[cmdType];

        // some thing cause error when excute cmdType command
        if (rawItem.isError) {
            result.failureItems.push({
                'items': rawItem.rows,
                'reason': rawItem.message
            });
        } else {

            // parse raw data to parts,
            // each part present fo one result of an category
            const rows = rawItem.rows.split('\n');
            const categories = systemQueue.find(e => e.type === cmdType).items;

            // Depend on cmdType will process in dif way
            callback(rows, categories);
        }
    }
}

// parse parts to final data >> result
function parseStdout() {
    // Reset before add more values;
    result = {
        'successItems': [],
        'failureItems': []
    };
    let parts = {}; // each raw data present a category output

    switch (os) {

        case 'darwin':
            rawToParts(commandType.profiler, (rows, categories) => {
                let currentCate = categories.shift();
                let nextCate = categories.shift();
                parts[currentCate] = [];

                for (let i = 0; i < rows.length; i++) {
                    const r = rows[i];
                    // compare to actual key result instead of category name
                    if (r.startsWith(requests.get(nextCate))) {
                        // add new item to items     
                        parts[nextCate] = [r.trim()];
                        currentCate = nextCate;
                        nextCate = categories.shift();;
                    } else {
                        parts[currentCate].push(r.trim());
                    }
                }
            })

            rawToParts(commandType.sysctl, (rows, categories) => {
                for (let i = 0; i < categories.length; i++) {
                    parts[categories[i]] = rows[i];
                }
            })

            break;

        case 'win32':
            //do for win
            break;

        default:
            break;
    }

    for (const key in parts) {
        result.successItems.push(rawItemToObject(mac[key], parts[key]));
    }
}
function getInfoOf(categories, waittime = 0) {

    // reset entry var
    systemQueue = getSystemCommand(categories);
    queueIndex = 0;
    rawResult = {
        'profiler': {
            'isError': false,
            'message': '',
            'rows': []
        },
        'sysctl': {
            'isError': false,
            'message': '',
            'rows': [] // data if success and categories if failure
        }
    };

    return new Promise((resolve, reject) => {
        function execute(cmd) {
            exec(cmd, (err, stdout, stderr) => {
                observerStdout(err, stdout, stderr);

                if (queueIndex < systemQueue.length - 1) {
                    queueIndex += 1;
                    setTimeout(() => {
                        execute(systemQueue[queueIndex].fullCmd);
                    }, waittime);
                } else {

                    parseStdout();
                    if (result.successItems.length !== 0) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                }
            })
        }

        execute(systemQueue[queueIndex].fullCmd);
    });
}

getInfoOf(['host', 'model', 'cpu', 'user', 'thread', 'l3', 'l2', 'memory', 'camera', 'applePay', 'bluetooth', 'ethenet', 'graphics', 'hardware', 'wifi', 'power', 'disk', 'ram', 'software'])
.then(data =>{
    console.log(data);
})