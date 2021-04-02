// var os = require('os');
// const { sysctl, profiler, getValueByKey, rowsToMap } = require('./utils');

// store actual key apear in stdout
const mac = {
    "wifi": {
        'item': 'wifi',
        'type': 'Type',
        'macAdress': 'Hardware (MAC) Address'
    },
    'software': {
        'item': 'software',
        'systemVersion': 'System Version',
        'kernelVersion': 'Kernel Version',
        'bootVolume': 'Boot Volume',
        'userName': 'User Name',
        'timeSinceBoot': 'Time since boot'
    },
    'ram': {
        'item': 'ram',
        'size': 'Size',
        'type': 'Type',
        'speed': 'Speed',
        'manufactuter': 'Manufacturer',
        'partNumber': 'Part Number',
        'serialNumber': 'Serial Number'
    },
    'disk': {
        'item': 'Disk',
        'capacity': 'Capacity',
        'model': 'Model',
        'serialNumber': 'Serial Number',
        'volumeUUID': 'Volume UUID'
    },
    'power': {
        'item': 'Power',
        'serialNumber': 'Serial Number',
        'manufactuter': 'Manufacturer',
        'deviceName': 'Device Name',
        'firmwareVersion': 'Firmware Version',
        'capacitymAh': 'Full Charge Capacity (mAh)',
        'cycleCount': 'Cycle Count',
        'condition': 'Condition'
    },
    'hardware': {
        'item': 'Hardware',
        'modelName': 'Model Name',
        'modelIdentifier': 'Model Identifier',
        'processerName': 'Processor Name',
        'processerSpeed': 'Processor Speed',
        'numProcesser': 'Number of Processors',
        'totalCore': 'Total Number of Cores',
        'l2Cache': 'L2 Cache (per Core)',
        'l3Cache': 'L3 Cache',
        'memory': 'Memory',
        'bootRomVersion': 'Boot ROM Version',
        'serialNumber': 'Serial Number (system)',
        'hardWareUUID': 'Hardware UUID'
    },
    'graphics': {
        'item': 'Graphics',
        'chipsetModel': 'Chipset Model',
        'type': 'Type',
        'deviceID': 'Device ID',
        'displayType': 'Display Type',
        'resolution': 'Resolution',
        'framebufferDepth': 'Framebuffer Depth'
    },
    'ethenet': {
        'item': 'Ethenet',
        'version': 'Version',
        'type': 'Type',
        'BSDName': 'BSD name',
        'kextName': 'Kext name',
        'macAdress': 'MAC Address',
        'productID': 'Product ID'
    },
    'bluetooth': {
        'item': 'Bluetooth',
        'version': 'Apple Bluetooth Software Version',
        'adress': 'Address',
        'manufacturer': 'Manufacturer',
        'transport': 'Transport',
        'chipset': 'Chipset',
        'productID': 'Product ID'
    },
    'applePay': {
        'item': 'ApplePay',
        'platformID': 'Platform ID',
        'serialNumber': 'Serial Number',
        'JCOP_OS': 'JCOP OS'
    },
    'camera': {
        'item': 'Camera',
        'modelID': "Model ID",
        'uniqueID': "Unique ID"
    },
    'memory': {
        'item': 'Memory',
        'sizeInBytes': 'hw.memsize'
    },
    'l3': {
        'item': 'L3',
        'sizeInBytes': 'hw.l3cachesize'
    },
    'l2': {
        'item': 'L2',
        'sizeInBytes': 'hw.l2cachesize'
    },
    'thread': {
        'item': 'Thread',
        'numOfThread': 'machdep.cpu.thread_count'
    },
    'cpu': {
        'item': 'CPU',
        'brand': 'machdep.cpu.brand_string'
    },
    'model': {
        'item': 'Model',
        'name': 'hw.model'
    }
};

// possiable params of system_profiler
const systemProfilers = new Map([
    ['camera', 'SPCameraDataType'],
    ['applePay', 'SPSecureElementDataType'],
    ['bluetooth', 'SPBluetoothDataType'],
    ['ethenet', 'SPEthernetDataType'],
    ['graphics', 'SPDisplaysDataType'],
    ['hardware', 'SPHardwareDataType'],
    ['wifi', 'SPNetworkLocationDataType'],
    ['power', 'SPPowerDataType'],
    ['disk', 'SPNVMeDataType'],
    ['ram', 'SPMemoryDataType'],
    ['software', 'SPSoftwareDataType']
]);

// possiable params of sysctl
const sysctls = new Map([
    ['model', 'hw.model'],
    ['cpu', 'machdep.cpu.brand_string'],
    ['thread', 'machdep.cpu.thread_count'],
    ['l2', 'hw.l2cachesize'],
    ['l3', 'hw.l3cachesize'],
    ['memory', 'hw.memsize']
]);

// request result - title use to div each part
const requests = new Map([
    ['camera', 'Camera'],
    ['applePay', 'Apple Pay'],
    ['bluetooth', 'Bluetooth'],
    ['ethenet', 'Ethernet Cards'],
    ['graphics', 'Graphics/Displays'],
    ['hardware', 'Hardware'],
    ['wifi', 'Locations'],
    ['power', 'Power'],
    ['ram', 'Memory'],
    ['software', 'Software'],
    ['disk', 'NVMExpress']
]);

module.exports = {
    components: Object.keys(mac),
    mac,
    systemProfilers,
    sysctls,
    requests
};