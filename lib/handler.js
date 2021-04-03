const { exec } = require('child_process');
const { mac, systemProfilers, sysctls, requests } = require('./mac');
const { win, wmics, cmds } = require('./win');
const { rawItemToObject } = require('./utils');

const os = process.platform;

// type constans
const commandType = {
    'profiler': 'profiler',
    'sysctl': 'sysctl'
}

const osType = {
    'darwin': 'darwin',
    'win32': 'win32'
}

// use to know the way to clip output
// use in windows enviroment
const tagType = {
    'wmic': 'wmic',
    'cmd': 'cmd'
}

// all result receive from stdout, ordered same cmdqueue
let rawResult = {};
//{
//     'cmd_type': {
//         'isError': false,
//         'message': '',
//         'rows': []
//     },
//}

// queue of excutable command, each command type may contain more than one param
let systemQueue = [];
// index of processing command
let queueIndex = 0;
// final result
let result = {};

function getSystemCommand(categories) {
    const queue = [];

    switch (os) {
        case osType.darwin:
            // posiable queue item
            queue.push({
                'type': commandType.profiler,
                'fullCmd': 'system_profiler',
                'items': []
            });
            queue.push({
                'type': commandType.sysctl,
                'fullCmd': 'sysctl',
                'items': []
            });

            categories.forEach(c => {
                if (systemProfilers.has(c)) {
                    queue[0].fullCmd += (' ' + systemProfilers.get(c));
                    queue[0].items.push(c);
                } else if (sysctls.has(c)) {
                    queue[1].fullCmd += (' ' + sysctls.get(c));
                    queue[1].items.push(c);
                }
            });
            break;

        case osType.win32:
            categories.forEach(c => {
                if (wmics.has(c)) {
                    queue.push({
                        'type': c,
                        'fullCmd': 'wmic ' + wmics.get(c),
                        'items': [c],
                        'tag': tagType.wmic
                    });
                } else if (cmds.has(c)) {
                    queue.push({
                        'type': c,
                        'fullCmd': cmds.get(c),
                        'items': [c],
                        'tag': tagType.cmd
                    });
                }
            });
            break;

        default:
            break;
    }

    // Remove unuse cmd queue
    return queue.filter(c => c.items.length !== 0);
}

// convert stdout to to raw result
// stdout may success or failure
function observerStdout(err, stdout, stderr) {

    const queueItem = systemQueue[queueIndex];
    rawResult[queueItem.type] = rawResult[queueItem.type] || {};
    const rawItem = rawResult[queueItem.type];

    if (err) {
        rawItem.isError = true;
        rawItem.message = stderr.replace(/[\r\n]/g, '');
        rawItem.rows = queueItem.items;
    } else {
        rawItem.rows = stdout;
        rawItem.message = 'Command excute successfuly';
    }
}

// handle raw data from stdout of each command type
// divide it to parts raw item
function rawToParts(queueItem, callback) {
    if (systemQueue.find(e => e.type === queueItem.type)) {
        const rawItem = rawResult[queueItem.type];

        if (rawItem.isError) {
            // some thing cause error when excute cmdType command
            result.failureItems.push({
                'items': rawItem.rows,
                'reason': rawItem.message
            });
        } else {

            // parse raw data to parts,
            // each part present fo one result of an category
            const categories = queueItem.items;
            let rows = rawItem.rows;
            if (queueItem.tag === tagType.wmic) {
                rows = rows.replace(/(^[ \t]*\n\r)/gm, "");
            }
            rows = rows.split('\n');

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
        case osType.darwin:
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

        case osType.win32:
            systemQueue.forEach(e => {
                rawToParts(e, (rows, categories) => {
                    for (let i = 0; i < categories.length; i++) {
                        parts[categories[i]] = rows;
                    }
                })
            })
            break;

        default:
            break;
    }

    const outputTemplate = os == osType.darwin ? mac : win;
    const osSep = os == osType.darwin ? ":" : "=";

    {
        let seperator;
        let resultObject

        for (const key in parts) {
            seperator = (key === 'software' || key === 'network') ? ":" : osSep;
            resultObject = rawItemToObject(outputTemplate[key], parts[key], seperator);
            result.successItems.push(resultObject);
        }
    }
}

function getInfoOf(categories, waittime = 0) {

    if (categories.length === 0) {
        return Promise.reject('Number of categories invalid (=0)')
    }

    // reset entry var
    systemQueue = getSystemCommand(categories);
    queueIndex = 0;
    rawResult = {};

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

module.exports = { getInfoOf };