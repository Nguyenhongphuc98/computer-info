var os = require('os');
const { sysctl, profiler, getValueByKey, rowsToMap } = require('./utils');

// Execute method
function host() {
    return new Promise((resolve, reject) => {
        const h = {
            'item': 'host',
            'name': os.hostname()
        }
        resolve(h);
    })
}

function model() {
    return new Promise((resolve, reject) => {
        sysctl('hw.model', modelName => {
            const md = {
                'item': 'Model',
                'name': modelName.toString()
            }
            resolve(md);
        })
    })
}

function cpu() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            const c = {
                'item': 'CPU',
                'brand': cpu.toString()
            }
            resolve(c);
        })
    })
}

function user() {
    return new Promise((resolve, reject) => {
        const u = {
            'item': 'User',
            'name': os.userInfo().username
        }
        resolve(u);
    })
}

function thread() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.thread_count', numthreads => {
            const t = {
                'item': 'Thread',
                'numOfThread': numthreads.toString()
            }
            resolve(t);
        })
    })
}

function l2() {
    return new Promise((resolve, reject) => {
        sysctl('hw.l2cachesize', mem => {
            const m = {
                'item': 'L2',
                'sizeInBytes': mem.toString()
            }
            resolve(m);
        })
    })
}
function l3() {
    return new Promise((resolve, reject) => {
        sysctl('hw.l3cachesize', mem => {
            const m = {
                'item': 'L3',
                'sizeInBytes': mem.toString()
            }
            resolve(m);
        })
    })
}

function memory() {
    return new Promise((resolve, reject) => {
        sysctl('hw.memsize', mem => {
            const m = {
                'item': 'Memory',
                'sizeInBytes': mem.toString()
            }
            resolve(m);
        })
    })
}

function camera() {
    return new Promise((resolve, reject) => {
        profiler('SPCameraDataType', lines => {
            const rows = lines.filter(l => l !== '');
            const map = rowsToMap(rows, ':', true);
            const c = {
                'item': 'Camera',
                'name': rows[1].trim(),
                'modelID': getValueByKey(map, "Model ID"),
                'uniqueID': getValueByKey(map, "Unique ID")
            };
            resolve(c);
        }, true)
    })
}

function applePay() {
    return new Promise((resolve, reject) => {
        profiler('SPSecureElementDataType', map => {
            
            const ap = {
                'item': 'ApplePay',
                'platformID': getValueByKey(map, 'Platform ID'),
                'serialNumber': getValueByKey(map, 'Serial Number'),
                'JCOP_OS': getValueByKey(map, 'JCOP OS')
            };
            resolve(ap);
        })
    })
}

function bluetooth() {
    return new Promise((resolve, reject) => {
        profiler('SPBluetoothDataType', map => {
            const bth = {
                'item': 'Bluetooth',
                'version': getValueByKey(map, 'Apple Bluetooth Software Version'),
                'adress': getValueByKey(map, 'Address'),
                'manufacturer': getValueByKey(map, 'Manufacturer'),
                'transport': getValueByKey(map, 'Transport'),
                'chipset': getValueByKey(map, 'Chipset'),
                'productID': getValueByKey(map, 'Product ID')
            };
            resolve(bth);
        })
    })
}

function ethenet() {
    return new Promise((resolve, reject) => {
        profiler('SPEthernetDataType', map => {
            const eth = {
                'item': 'Ethenet',
                'version': getValueByKey(map, 'Version'),
                'type': getValueByKey(map, 'Type'),
                'BSDName': getValueByKey(map, 'BSD name'),
                'kextName': getValueByKey(map, 'Kext name'),
                'macAdress': getValueByKey(map, 'MAC Address'),
                'productID': getValueByKey(map, 'Product ID')
            };
            resolve(eth);
        })
    })
}

function graphics() {
    return new Promise((resolve, reject) => {
        profiler('SPDisplaysDataType', map => {
            const g = {
                'item': 'Graphics',
                'chipsetModel': getValueByKey(map, 'Chipset Model'),
                'type': getValueByKey(map, 'Type'),
                'deviceID': getValueByKey(map, 'Device ID'),
                'displayType': getValueByKey(map, 'Display Type'),
                'resolution': getValueByKey(map, 'Resolution'),
                'framebufferDepth': getValueByKey(map, 'Framebuffer Depth')
            };
            resolve(g);
        })
    })
}

function hardware() {
    return new Promise((resolve, reject) => {
        profiler('SPHardwareDataType', map => {
            const hw = {
                'item': 'Hardware',
                'modelName': getValueByKey(map, 'Model Name'),
                'modelIdentifier': getValueByKey(map, 'Model Identifier'),
                'processerName': getValueByKey(map, 'Processor Name'),
                'processerSpeed': getValueByKey(map, 'Processor Speed'),
                'numProcesser': getValueByKey(map, 'Number of Processors'),
                'totalCore': getValueByKey(map, 'Total Number of Cores'),
                'l2Cache': getValueByKey(map, 'L2 Cache (per Core)'),
                'l3Cache': getValueByKey(map, 'L3 Cache'),
                'memory': getValueByKey(map, 'Memory'),
                'bootRomVersion': getValueByKey(map, 'Boot ROM Version'),
                'serialNumber': getValueByKey(map, 'Serial Number (system)'),
                'hardWareUUID': getValueByKey(map, 'Hardware UUID')
            };
            resolve(hw);
        })
    })
}

function wifi() {
    return new Promise((resolve, reject) => {
        profiler('SPNetworkLocationDataType', map => {
            const wi = {
                'item': 'Wifi',
                'type': getValueByKey(map, 'Type'),
                'macAdress': getValueByKey(map, 'Hardware (MAC) Address')
            };
            resolve(wi);
        })
    })
}

function power() {
    return new Promise((resolve, reject) => {
        profiler('SPPowerDataType', map => {
            const po = {
                'item': 'Power',
                'serialNumber': getValueByKey(map, 'Serial Number'),
                'manufactuter': getValueByKey(map, 'Manufacturer'),
                'deviceName': getValueByKey(map, 'Device Name'),
                'firmwareVersion': getValueByKey(map, 'Firmware Version'),
                'capacitymAh': getValueByKey(map, 'Full Charge Capacity (mAh)'),
                'cycleCount': getValueByKey(map, 'Cycle Count'),
                'condition': getValueByKey(map, 'Condition')
            };
            resolve(po);
        })
    })
}

function disk() {
    return new Promise((resolve, reject) => {
        profiler('SPNVMeDataType', map => {
            const di = {
                'item': 'Disk',
                'capacity': getValueByKey(map, 'Capacity'),
                'model': getValueByKey(map, 'Model'),
                'serialNumber': getValueByKey(map, 'Serial Number'),
                'volumeUUID': getValueByKey(map, 'Volume UUID')
            };
            resolve(di);
        })
    })
}

function ram() {
    return new Promise((resolve, reject) => {
        profiler('SPMemoryDataType', map => {
            const r = {
                'item': 'Ram',
                'size': getValueByKey(map, 'Size'),
                'type': getValueByKey(map, 'Type'),
                'speed': getValueByKey(map, 'Speed'),
                'manufactuter': getValueByKey(map, 'Manufacturer'),
                'partNumber': getValueByKey(map, 'Part Number'),
                'serialNumber': getValueByKey(map, 'Serial Number')
            };
            resolve(r);
        })
    })
}

function software() {
    return new Promise((resolve, reject) => {
        profiler('SPSoftwareDataType', map => {
            const sw = {
                'item': 'Software',
                'systemVersion': getValueByKey(map, 'System Version'),
                'kernelVersion': getValueByKey(map, 'Kernel Version'),
                'bootVolume': getValueByKey(map, 'Boot Volume'),
                'userName': getValueByKey(map, 'User Name'),
                'timeSinceBoot': getValueByKey(map, 'Time since boot')
            };
            resolve(sw);
        })
    })
}

// support categoties
const components = ['host', 'model', 'cpu', 'user', 'thread', 'l3', 'l2', 'memory', 'camera', 'applePay', 'bluetooth', 'ethenet', 'graphics', 'hardware', 'wifi', 'power', 'disk', 'ram', 'software'];
// const fullExecutables = new Map([
//     ['cpu', cpu()],
//     ['power', power()],
//     ['disk', disk()],
//     ['memory', memory()],
//     ['bluetooth', bluetooth()],
//     ['software', software()],
//     ['camera', camera()],
//     ['host', host()],
//     ['model', model()],
//     ['user', user()],
//     ['thread', thread()],
//     ['l3', l3()],
//     ['l2', l2()],
//     ['applePay', applePay()],
//     ['ethenet', ethenet()],
//     ['graphics', graphics()],
//     ['hardware', hardware()],
//     ['wifi', wifi()],
//     ['ram', ram()]
// ])

module.exports = {
    host,
    model,
    cpu,
    user,
    thread,
    l3,
    l2,
    memory,
    camera,
    applePay,
    bluetooth,
    ethenet,
    graphics,
    hardware,
    wifi,
    power,
    disk,
    ram,
    software,
    components
    // fullExecutables
};