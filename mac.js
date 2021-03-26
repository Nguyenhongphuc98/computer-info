var os = require('os');
const { sysctl, profiler } = require('./utils');

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
                'name': modelName
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
                'brand': cpu
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
                'number of thread': numthreads
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
                'size (bytes)': mem
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
                'size (bytes)': mem
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
                'size (bytes)': mem
            }
            resolve(m);
        })
    })
}

// 8. Camera
function camera() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPCameraDataType', rows => {
                const camera = {
                    'item': 'Camera',
                    'name': rows[1].trim().slice(0, -1),
                    'modelID': rows[2].split(":")[1].trim(),
                    'uniqueID': rows[3].split(":")[1].trim()
                };
                resolve(camera);
            })
        })
    })
}

// 9. Apple pay
function applePay() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPSecureElementDataType', rows => {
                const applePay = {
                    'item': 'ApplePay',
                    'platformID': rows[2].split(":")[1].trim(),
                    'serialNumber': rows[3].split(":")[1].trim()
                };
                resolve(applePay);
            })
        })
    })
}

// 10. Bluetooth
function bluetooth() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPBluetoothDataType', rows => {
                const bluetooth = {
                    'item': 'Bluetooth',
                    'version': rows[1].split(":")[1].trim(),
                    'adress': rows[3].split(":")[1].trim()
                };
                resolve(bluetooth);
            })
        })
    })

}

// 11. Ethernet
function ethenet() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPEthernetDataType', rows => {
                const ethernet = {
                    'item': 'Ethenet',
                    'version': rows[6].split(":")[1].trim(),
                    'macAdress': rows[7].split(": ")[1].trim()
                };
                resolve(ethernet);
            })
        })
    })
}

// 12. Graphics
function graphics() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPDisplaysDataType', rows => {
                const graphics = {
                    'item': 'Graphics',
                    'chipsetModel': rows[2].split(":")[1].trim(),
                    'type': rows[3].split(": ")[1].trim(),
                    'deviceID': rows[7].split(": ")[1].trim()
                };
                resolve(graphics);
            })
        })
    })
}
// 13. Hardware
function hardware() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPHardwareDataType', rows => {
                const hardware = {
                    'item': 'Hardware',
                    'modelName': rows[2].split(":")[1].trim(),
                    'modelIdentifier': rows[3].split(": ")[1].trim(),
                    'processerName': rows[4].split(": ")[1].trim(),
                    'processerSpeed': rows[5].split(": ")[1].trim(),
                    'numProcesser': rows[6].split(": ")[1].trim(),
                    'totalCore': rows[7].split(": ")[1].trim(),
                    'l1Cache': rows[8].split(": ")[1].trim(),
                    'l2Cache': rows[9].split(": ")[1].trim(),
                    'memory': rows[11].split(": ")[1].trim(),
                    'bootRomVersion': rows[12].split(": ")[1].trim(),
                    'serialNumber': rows[13].split(": ")[1].trim(),
                    'hardWareUUID': rows[14].split(": ")[1].trim()
                };
                resolve(hardware);
            })
        })
    })
}

// 14. Wifi
function wifi() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPNetworkLocationDataType', rows => {
                const wifi = {
                    'item': 'Wifi',
                    'type': rows[5].split(":")[1].trim(),
                    'macAdress': rows[7].split(": ")[1].trim(),
                };
                resolve(wifi);
            })
        })
    })
}
// 15. Power
function power() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPPowerDataType', rows => {
                const power = {
                    'item': 'Power',
                    'serialNumber': rows[3].split(":")[1].trim(),
                    'manufactuter': rows[4].split(": ")[1].trim(),
                    'deviceName': rows[5].split(": ")[1].trim()
                };
                resolve(power);
            })
        })
    })
}
// 16. Disk
function disk() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPNVMeDataType', rows => {
                const hardware = {
                    'item': 'Disk',
                    'capacity': rows[3].split(": ")[1].trim(),
                    'model': rows[5].split(":")[1].trim(),
                    'serialNumber': rows[7].split(": ")[1].trim(),
                    'volumeUUID': rows[21].split(": ")[1].trim()
                };
                resolve(hardware);
            })
        })
    })
}

// 17. Ram
function ram() {
    return new Promise((resolve, reject) => {
        sysctl('machdep.cpu.brand_string', cpu => {
            profiler('SPMemoryDataType', rows => {
                const ram = {
                    'item': 'Ram',
                    'size': rows[5].split(": ")[1].trim() + " * " + rows[13].split(": ")[1].trim(),
                    'type': rows[6].split(":")[1].trim() + " * " + rows[14].split(": ")[1].trim(),
                    'speed': rows[7].split(": ")[1].trim() + " * " + rows[15].split(": ")[1].trim(),
                    'manufactuter': rows[9].split(": ")[1].trim() + " * " + rows[17].split(": ")[1].trim(),
                    'partNumber': rows[10].split(": ")[1].trim() + " * " + rows[18].split(": ")[1].trim(),
                    'serialNumber': rows[11].split(": ")[1].trim() + " * " + rows[19].split(": ")[1].trim()
                };
                resolve(ram);
            })
        })
    })
}

// 18. Software overview
function software() {
    return new Promise((resolve, reject) => {
        profiler('SPSoftwareDataType', rows => {
            const software = {
                'item': 'Software',
                'systemVersion': rows[2].split(": ")[1].trim(),
                'kernelVersion': rows[3].split(":")[1].trim(),
                'bootVolume': rows[4].split(": ")[1].trim(),
                'computerName': rows[6].split(": ")[1].trim(),
                'userName': rows[7].split(": ")[1].trim(),
                'timeSinceBoot': rows[10].split(": ")[1].trim()
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