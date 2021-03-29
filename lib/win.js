const {
    wmic, winExe, getValue, getFormFactor, getMemoryType, getChemistry,
     getBattreyStatus, getAvailability, getStatusInfo
} = require('./utils');

// Execute method
function cpu() {
    return new Promise((resolve, reject) => {

        wmic("cpu get /value", rows => {
            const c = {
                'item': 'cpu',
                'description': getValue(rows, 'name', '='),
                'l2cachesize': getValue(rows, 'l2cachesize', '='),
                'l3cachesize': getValue(rows, 'l3cachesize', '='),
                'manufacturer': getValue(rows, 'manufacturer', '='),
                'maxClockSpeed': getValue(rows, 'maxClockSpeed', '='),
                'numberOfCores': getValue(rows, 'numberOfCores', '='),
                'numberOfLogicalProcessors': getValue(rows, 'NumberOfLogicalProcessors', '='),
                'processorID': getValue(rows, 'processorID', '='),
                'processorType': getValue(rows, 'processorType', '='),
                'revision': getValue(rows, 'revision', '='),
                'systemName': getValue(rows, 'systemName', '=')
            }
            resolve(c);
        })
    })
}

function bluetooth() {
    return new Promise((resolve, reject) => {

        wmic('PATH Win32_PNPEntity WHERE Service="BTHUSB" get/format:value', rows => {
            const bth = {
                'item': 'Bluetooth',
                'classGuid': getValue(rows, 'ClassGuid', '='),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'name': getValue(rows, 'Name', '='),
                'deviceID': getValue(rows, 'DeviceID', '='),
                'status': getValue(rows, 'Status', '='),
                'hardwareID': getValue(rows, 'HardwareID', '='),
                'installDate': getValue(rows, 'InstallDate', '=')
            }
            resolve(bth);
        })
    })
}

function bios() {
    return new Promise((resolve, reject) => {

        wmic('bios get/format:value', rows => {
            const bi = {
                'item': 'BIOS',
                'name': getValue(rows, 'Name', '='),
                'BIOSVersion': getValue(rows, 'BIOSVersion', '='),
                'releaseDate': getValue(rows, 'ReleaseDate', '='),
                'currentLanguage': getValue(rows, 'CurrentLanguage', '='),
                'listOfLanguages': getValue(rows, 'ListOfLanguages', '='),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'serialNumber': getValue(rows, 'SerialNumber', '=')
            }
            resolve(bi);
        })
    })
}

function power() {
    return new Promise((resolve, reject) => {

        wmic('Path Win32_Battery get/format:value', rows => {
            const battery = {
                'item': 'power',
                'name': getValue(rows, 'Name', '='),
                'chemistry': getChemistry(getValue(rows, 'Chemistry', '=')),
                'batteryStatus': getBattreyStatus(getValue(rows, 'BatteryStatus', '=')),
                'availability': getAvailability(getValue(rows, 'Availability', '=')),
                'deviceID': getValue(rows, 'DeviceID', '='),
                'PNPDeviceID': getValue(rows, 'PNPDeviceID', '='),
                'serialNumber': getValue(rows, 'SerialNumber', '=')
            }
            resolve(battery);
        })
    })
}

function software() {
    return new Promise((resolve, reject) => {
        winExe('systeminfo /fo:list', data => {

            const rows = data.trim().split("\n");
            const sw = {
                'item': 'software',
                'hostName': getValue(rows, 'Host Name', ':'),
                'OSName': getValue(rows, 'OS Name', ':'),
                'OSVersion': getValue(rows, 'OS Version', ':'),
                'OSManufacturer': getValue(rows, 'OS Manufacturer', ':'),
                'productID': getValue(rows, 'Product ID', ':'),
                'originalInstallDate': getValue(rows, 'Original Install Date', ':'),
                'systemBootTime': getValue(rows, 'System Boot Time', ':'),
                'systemManufacturer': getValue(rows, 'System Manufacturer', ':'),
                'systemModel': getValue(rows, 'System Model', ':'),
                'systemType': getValue(rows, 'System Type', ':'),
                'BIOSVersion': getValue(rows, 'BIOS Version', ':'),
                'timeZone': getValue(rows, 'Time Zone', ':'),
                'totalPhysicalMemory': getValue(rows, 'Total Physical Memory', ':'),
            }
            resolve(sw);
        })
    })
}

function disk() {
    return new Promise((resolve, reject) => {
        wmic('diskdrive get /format:value', rows => {

            const di = {
                'item': 'disk',
                'name': getValue(rows, 'Name', '='),
                'bytesPerSector': getValue(rows, 'BytesPerSector', '='),
                'capabilityDescriptions': getValue(rows, 'CapabilityDescriptions', '='),
                'caption': getValue(rows, 'Caption', '='),
                'interfaceType': getValue(rows, 'InterfaceType', '='),
                'deviceID': getValue(rows, 'DeviceID', '='),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'firmwareRevision': getValue(rows, 'FirmwareRevision', '='),
                'serialNumber': getValue(rows, 'SerialNumber', '='),
                'size': getValue(rows, 'Size', '='),
                'status': getValue(rows, 'Status', '='),
                'totalSectors': getValue(rows, 'TotalSectors', '=')
            }
            resolve(di);
        })
    })
}

function memory() {
    return new Promise((resolve, reject) => {
        wmic('memorychip get /format:value', rows => {

            const m = {
                'item': 'memory',
                'deviceLocator': getValue(rows, 'DeviceLocator', '='),
                'capacity': getValue(rows, 'Capacity', '='),
                'formFactor': getFormFactor(getValue(rows, 'FormFactor', '=')),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'memoryType': getMemoryType(getValue(rows, 'MemoryType', '=')),
                'partNumber': getValue(rows, 'PartNumber', '='),
                'serialNumber': getValue(rows, 'SerialNumber', '='),
                'speed': getValue(rows, 'Speed', '=')
            }
            resolve(m);
        })
    })
}

function display() {
    return new Promise((resolve, reject) => {
        wmic('desktopmonitor get /format:value', rows => {

            const d = {
                'item': 'display',
                'caption': getValue(rows, 'Caption', '='),
                'monitorType': getValue(rows, 'MonitorType', '='),
                'monitorManufacturer': getValue(rows, 'MonitorManufacturer', '='),
                'name': getValue(rows, 'Name', '='),
                'screenHeight': getValue(rows, 'ScreenHeight', '='),
                'screenWidth': getValue(rows, 'ScreenWidth', '=')
            }
            resolve(d);
        })
    })
}

function graphics() {
    return new Promise((resolve, reject) => {
        wmic('path Win32_videocontroller get /format:value', rows => {

            const g = {
                'item': 'graphics',
                'name': getValue(rows, 'Name', '='),
                'adapterCompatibility': getValue(rows, 'AdapterCompatibility', '='),
                'adapterDACType': getValue(rows, 'AdapterDACType', '='),
                'adapterRAM': getValue(rows, 'AdapterRAM', '='),
                'availability': getAvailability(getValue(rows, 'Availability', '=')),
                'currentBitsPerPixel': getValue(rows, 'CurrentBitsPerPixel', '='),
                'currentNumberOfColors': getValue(rows, 'CurrentNumberOfColors', '='),
                'currentRefreshRate': getValue(rows, 'CurrentRefreshRate', '='),
                'driverVersion': getValue(rows, 'DriverVersion', '=')
            }
            resolve(g);
        })
    })
}

function network() {
    return new Promise((resolve, reject) => {
        winExe('getmac /fo list /v', data => {

            const rows = data.trim().split("\n");
            let index = 0;
            let arr = [];
            arr[0] = [];

            rows.forEach(r => {
                if (r === '\r' || r === '\n') {
                    // this is line seperater between NIC
                    index++;
                    arr[index] = [];
                } else {
                    arr[index].push(r);
                }
            });

            const n = {
                'item': 'network'
            };

            for (let i = 0; i < arr.length; i++) {
                const stt = i + 1;
                n['connectionName' + stt] = getValue(arr[i], 'Connection Name', ':');
                n['networkAdapter' + stt] = getValue(arr[i], 'Network Adapter', ':');
                n['physicalAddress' + stt] = getValue(arr[i], 'Physical Address', ':');
                n['transportName' + stt] = getValue(arr[i], 'Transport Name', ':');
            }

            resolve(n);
        })
    })
}

function sound() {
    return new Promise((resolve, reject) => {
        wmic('path Win32_SoundDevice get/format:value', rows => {

            const s = {
                'item': 'sound',
                'productName': getValue(rows, 'ProductName', '=', false, true),
                'statusInfo': getStatusInfo(getValue(rows, 'StatusInfo', '=', false, true)),
                'status': getValue(rows, 'Status=', '=', false, true),
                'PNPDeviceID': getValue(rows, 'PNPDeviceID', '=', false, true),
                'manufacturer': getValue(rows, 'Manufacturer', '=', false, true)
            }
            resolve(s);
        })
    })
}

function keyboard() {
    return new Promise((resolve, reject) => {
        wmic('path Win32_Keyboard get/format:value', rows => {

            const k = {
                'item': 'keyboard',
                'name': getValue(rows, 'Name', '=', false, true),
                'description': getStatusInfo(getValue(rows, 'Description', '=', false, true)),
                'status': getValue(rows, 'Status=', '=', false, true),
                'PNPDeviceID': getValue(rows, 'PNPDeviceID', '=', false, true),
                'numberOfFunctionKeys': getValue(rows, 'NumberOfFunctionKeys', '=', false, true),
                'layout': getValue(rows, 'Layout', '=', false, true),
                'deviceID': getValue(rows, 'DeviceID', '=', false, true)
            }
            resolve(k);
        })
    })
}

// support categoties
const components = ['cpu', 'bluetooth', 'bios', 'power', 'software', 'disk', 'memory', 'display', 'network', 'graphics', 'sound', 'keyboard'];
// const fullExecutables = new Map([
//     ['cpu', cpu()],
//     ['power', power()],
//     ['disk', disk()],
//     ['memory', memory()],
//     ['bluetooth', bluetooth()],
//     ['software', software()],
//     ['bios', bios()],
//     ['display', display()],
//     ['network', network()],
//     ['graphics', graphics()],
//     ['sound', sound()],
//     ['keyboard', keyboard()]
// ])

module.exports = {
    cpu,
    bluetooth,
    bios,
    power,
    software,
    disk,
    memory,
    display,
    network,
    graphics,
    sound,
    keyboard,
    components
    // fullExecutables
};
