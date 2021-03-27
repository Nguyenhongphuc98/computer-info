var os = require('os');
const { sysctl, profiler, getValue } = require('./utils');

//ioreg -c IOPlatformExpertDevice -d 2 
// => get board_id, IOPlatformUUID, IOPlatformSerialNumber same serial number of mac, serial-number.

// 1. Get host name
function host() {
    return new Promise((resolve, reject) => {
        const h = {
            'item': 'host',
            'name': os.hostname()
        }
        resolve(h);
    })
}

// 2. Get model name
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

// 3. Get CPU info
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

// 4. User name
function user() {
    return new Promise((resolve, reject) => {
        const u = {
            'item': 'User',
            'name': os.userInfo().username
        }
        resolve(u);
    })
}

// 5. Thread count
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

// 6. Li caches per core
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

// 7. Memory
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

// 8. Camera
function camera() {
    return new Promise((resolve, reject) => {
        profiler('SPCameraDataType', lines => {
            const rows = lines.filter(l => l !== '');
            const camera = {
                'item': 'Camera',
                'name': rows[1].trim(),
                'modelID': getValue(rows, "Model ID", ":", true),
                'uniqueID': getValue(rows, "Unique ID", ":", true)
            };
            resolve(camera);
        })
    })
}

// 9. Apple pay
function applePay() {
    return new Promise((resolve, reject) => {
        profiler('SPSecureElementDataType', rows => {
            const applePay = {
                'item': 'ApplePay',
                'platformID': getValue(rows, 'Platform ID', ':', true),
                'serialNumber': getValue(rows, 'Serial Number', ':', true),
                'JCOP_OS': getValue(rows, 'JCOP OS', ':', true)
            };
            resolve(applePay);
        })
    })
}

// 10. Bluetooth
function bluetooth() {
    return new Promise((resolve, reject) => {
        profiler('SPBluetoothDataType', rows => {
            const bluetooth = {
                'item': 'Bluetooth',
                'version': getValue(rows, 'Apple Bluetooth Software Version', ':', true),
                'adress': getValue(rows, 'Address', ':', true),
                'manufacturer': getValue(rows, 'Manufacturer', ':', true),
                'transport': getValue(rows, 'Transport', ':', true),
                'chipset': getValue(rows, 'Chipset', ':', true),
                'productID': getValue(rows, 'Product ID', ':', true)
            };
            resolve(bluetooth);
        })
    })
}

// 11. Ethernet
function ethenet() {
    return new Promise((resolve, reject) => {
        profiler('SPEthernetDataType', rows => {
            const ethernet = {
                'item': 'Ethenet',
                'version': getValue(rows, 'Version', ':', true),
                'type': getValue(rows, 'Type', ':', true),
                'BSDName': getValue(rows, 'BSD name', ':', true),
                'kextName': getValue(rows, 'Kext name', ':', true),
                'macAdress': getValue(rows, 'MAC Address', ':', true),
                'productID': getValue(rows, 'Product ID', ':', true)
            };
            resolve(ethernet);
        })
    })
}

// 12. Graphics
function graphics() {
    return new Promise((resolve, reject) => {
        profiler('SPDisplaysDataType', rows => {
            const graphics = {
                'item': 'Graphics',
                'chipsetModel': getValue(rows, 'Chipset Model', ':', true),
                'type': getValue(rows, 'Type', ':', true),
                'deviceID': getValue(rows, 'Device ID', ':', true),
                'displayType': getValue(rows, 'Display Type', ':', true),
                'resolution': getValue(rows, 'Resolution', ':', true),
                'framebufferDepth': getValue(rows, 'Framebuffer Depth', ':', true)
            };
            resolve(graphics);
        })
    })
}
// 13. Hardware
function hardware() {
    return new Promise((resolve, reject) => {
        profiler('SPHardwareDataType', rows => {
            const hardware = {
                'item': 'Hardware',
                'modelName': getValue(rows, 'Model Name', ':', true),
                'modelIdentifier': getValue(rows, 'Model Identifier', ':', true),
                'processerName': getValue(rows, 'Processor Name', ':', true),
                'processerSpeed': getValue(rows, 'Processor Speed', ':', true),
                'numProcesser': getValue(rows, 'Number of Processors', ':', true),
                'totalCore': getValue(rows, 'Total Number of Cores', ':', true),
                'l2Cache': getValue(rows, 'L2 Cache (per Core)', ':', true),
                'l3Cache': getValue(rows, 'L3 Cache', ':', true),
                'memory': getValue(rows, 'Memory:', ':', true),
                'bootRomVersion': getValue(rows, 'Boot ROM Version', ':', true),
                'serialNumber': getValue(rows, 'Serial Number (system)', ':', true),
                'hardWareUUID': getValue(rows, 'Hardware UUID', ':', true)
            };
            resolve(hardware);
        })
    })
}

// 14. Wifi
function wifi() {
    return new Promise((resolve, reject) => {
        profiler('SPNetworkLocationDataType', rows => {
            const wifi = {
                'item': 'Wifi',
                'type': getValue(rows, 'Type:', ':', true),
                'macAdress': getValue(rows, 'Hardware (MAC) Address', ':', true)
            };
            resolve(wifi);
        })
    })
}
// 15. Power
function power() {
    return new Promise((resolve, reject) => {
        profiler('SPPowerDataType', rows => {
            const power = {
                'item': 'Power',
                'serialNumber': getValue(rows, 'Serial Number', ':', true),
                'manufactuter': getValue(rows, 'Manufacturer', ':', true),
                'deviceName': getValue(rows, 'Device Name', ':', true),
                'firmwareVersion': getValue(rows, 'Firmware Version', ':', true),
                'capacitymAh': getValue(rows, 'Full Charge Capacity (mAh)', ':', true),
                'cycleCount': getValue(rows, 'Cycle Count', ':', true),
                'condition': getValue(rows, 'Condition:', ':', true)
            };
            resolve(power);
        })
    })
}
// 16. Disk
function disk() {
    return new Promise((resolve, reject) => {
        profiler('SPNVMeDataType', rows => {
            const hardware = {
                'item': 'Disk',
                'capacity': getValue(rows, 'Capacity:', ':', true),
                'model': getValue(rows, 'Model:', ':', true),
                'serialNumber': getValue(rows, 'Serial Number', ':', true),
                'volumeUUID': getValue(rows, 'Volume UUID', ':', true)
            };
            resolve(hardware);
        })
    })
}

// 17. Ram
function ram() {
    return new Promise((resolve, reject) => {
        profiler('SPMemoryDataType', rows => {
            const ram = {
                'item': 'Ram',
                'size': getValue(rows, 'Size', ':', true, true),
                'type': getValue(rows, 'Type', ':', true, true),
                'speed': getValue(rows, 'Speed', ':', true, true),
                'manufactuter': getValue(rows, 'Manufacturer', ':', true, true),
                'partNumber': getValue(rows, 'Part Number', ':', true, true),
                'serialNumber': getValue(rows, 'Serial Number', ':', true, true)
            };
            resolve(ram);
        })
    })
}

// 18. Software overview
function software() {
    return new Promise((resolve, reject) => {
        profiler('SPSoftwareDataType', rows => {
            const software = {
                'item': 'Software',
                'systemVersion': getValue(rows, 'System Version', ':', true),
                'kernelVersion': getValue(rows, 'Kernel Version', ':', true),
                'bootVolume': getValue(rows, 'Boot Volume', ':', true),
                'userName': getValue(rows, 'User Name', ':', true),
                'timeSinceBoot': getValue(rows, 'Time since boot', ':', true),
            };
            resolve(software);
        })
    })
}

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
    software
};