const {
    wmic, winExe, getValue, getFormFactor, getMemoryType, getChemistry,
     getBattreyStatus, getAvailability, getStatusInfo
} = require('./utils');

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

// consider div to mutil parts
function power() {
    return new Promise((resolve, reject) => {

        wmic('Path Win32_Battery get/format:value', rows => {
            const battery = {
                'item': 'power',
                'name': getValue(rows, 'Name', '='),
                'Chemistry': getChemistry(getValue(rows, 'Chemistry', '=')),
                'BatteryStatus': getBattreyStatus(getValue(rows, 'BatteryStatus', '=')),
                'Availability': getAvailability(getValue(rows, 'Availability', '=')),
                'DeviceID': getValue(rows, 'DeviceID', '='),
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
                'ProductID': getValue(rows, 'Product ID', ':'),
                'OriginalInstallDate': getValue(rows, 'Original Install Date', ':'),
                'SystemBootTime': getValue(rows, 'System Boot Time', ':'),
                'SystemManufacturer': getValue(rows, 'System Manufacturer', ':'),
                'SystemModel': getValue(rows, 'System Model', ':'),
                'SystemType': getValue(rows, 'System Type', ':'),
                'BIOSVersion': getValue(rows, 'BIOS Version', ':'),
                'TimeZone': getValue(rows, 'Time Zone', ':'),
                'TotalPhysicalMemory': getValue(rows, 'Total Physical Memory', ':'),
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
                'BytesPerSector': getValue(rows, 'BytesPerSector', '='),
                'CapabilityDescriptions': getValue(rows, 'CapabilityDescriptions', '='),
                'Caption': getValue(rows, 'Caption', '='),
                'InterfaceType': getValue(rows, 'InterfaceType', '='),
                'DeviceID': getValue(rows, 'DeviceID', '='),
                'Manufacturer': getValue(rows, 'Manufacturer', '='),
                'FirmwareRevision': getValue(rows, 'FirmwareRevision', '='),
                'SerialNumber': getValue(rows, 'SerialNumber', '='),
                'Size': getValue(rows, 'Size', '='),
                'Status': getValue(rows, 'Status', '='),
                'TotalSectors': getValue(rows, 'TotalSectors', '=')
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
                'DeviceLocator': getValue(rows, 'DeviceLocator', '='),
                'Capacity': getValue(rows, 'Capacity', '='),
                'FormFactor': getFormFactor(getValue(rows, 'FormFactor', '=')),
                'Manufacturer': getValue(rows, 'Manufacturer', '='),
                'MemoryType': getMemoryType(getValue(rows, 'MemoryType', '=')),
                'PartNumber': getValue(rows, 'PartNumber', '='),
                'SerialNumber': getValue(rows, 'SerialNumber', '='),
                'Speed': getValue(rows, 'Speed', '=')
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
                'Caption': getValue(rows, 'Caption', '='),
                'MonitorType': getValue(rows, 'MonitorType', '='),
                'MonitorManufacturer': getValue(rows, 'MonitorManufacturer', '='),
                'Name': getValue(rows, 'Name', '='),
                'ScreenHeight': getValue(rows, 'ScreenHeight', '='),
                'ScreenWidth': getValue(rows, 'ScreenWidth', '=')
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
                'StatusInfo': getStatusInfo(getValue(rows, 'StatusInfo', '=', false, true)),
                'Status': getValue(rows, 'Status=', '=', false, true),
                'PNPDeviceID': getValue(rows, 'PNPDeviceID', '=', false, true),
                'Manufacturer': getValue(rows, 'Manufacturer', '=', false, true)
            }
            resolve(s);
        })
    })
}

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
    sound
};
