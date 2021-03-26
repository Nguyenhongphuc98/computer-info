const {
    wmic, winExe, getValue, getFormFactor, getMemoryType, getChemistry, getBattreyStatus, getAvailability
} = require('./utils');

function cpu() {
    return new Promise((resolve, reject) => {

        wmic("cpu get /value", rows => {
            const cpu = {
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
            resolve(cpu);
        })
    })
}

function bluetooth() {
    return new Promise((resolve, reject) => {

        wmic('PATH Win32_PNPEntity WHERE Service="BTHUSB" get/format:value', rows => {
            const bluetooth = {
                'item': 'Bluetooth',
                'classGuid': getValue(rows, 'ClassGuid', '='),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'name': getValue(rows, 'Name', '='),
                'deviceID': getValue(rows, 'DeviceID', '='),
                'status': getValue(rows, 'Status', '='),
                'hardwareID': getValue(rows, 'HardwareID', '='),
                'installDate': getValue(rows, 'InstallDate', '=')
            }
            resolve(bluetooth);
        })
    })
}

function bios() {
    return new Promise((resolve, reject) => {

        wmic('bios get/format:value', rows => {
            const bios = {
                'item': 'BIOS',
                'name': getValue(rows, 'Name', '='),
                'BIOSVersion': getValue(rows, 'BIOSVersion', '='),
                'releaseDate': getValue(rows, 'ReleaseDate', '='),
                'currentLanguage': getValue(rows, 'CurrentLanguage', '='),
                'listOfLanguages': getValue(rows, 'ListOfLanguages', '='),
                'manufacturer': getValue(rows, 'Manufacturer', '='),
                'serialNumber': getValue(rows, 'SerialNumber', '=')
            }
            resolve(bios);
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
            const software = {
                'item': 'software',
                'hostName': getValue(rows, 'Host Name', ':'),
                'OS Name': getValue(rows, 'OS Name', ':'),
                'OS Version': getValue(rows, 'OS Version', ':'),
                'OS Manufacturer': getValue(rows, 'OS Manufacturer', ':'),
                'Product ID': getValue(rows, 'Product ID', ':'),
                'Original Install Date': getValue(rows, 'Original Install Date', ':'),
                'System Boot Time': getValue(rows, 'System Boot Time', ':'),
                'System Manufacturer': getValue(rows, 'System Manufacturer', ':'),
                'System Model': getValue(rows, 'System Model', ':'),
                'System Type': getValue(rows, 'System Type', ':'),
                'BIOS Version': getValue(rows, 'BIOS Version', ':'),
                'Time Zone': getValue(rows, 'Time Zone', ':'),
                'Total Physical Memory': getValue(rows, 'Total Physical Memory', ':'),
            }
            resolve(software);
        })
    })
}

function disk() {
    return new Promise((resolve, reject) => {
        wmic('diskdrive get /format:value', rows => {

            const disk = {
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
            resolve(disk);
        })
    })
}

function memory() {
    return new Promise((resolve, reject) => {
        wmic('memorychip get /format:value', rows => {

            const memory = {
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
            resolve(memory);
        })
    })
}

function screen() {
    return new Promise((resolve, reject) => {
        wmic('desktopmonitor get /format:value', rows => {

            const screen = {
                'item': 'screen',
                'Caption': getValue(rows, 'Caption', '='),
                'MonitorType': getValue(rows, 'MonitorType', '='),
                'MonitorManufacturer': getValue(rows, 'MonitorManufacturer', '='),
                'Name': getValue(rows, 'Name', '='),
                'ScreenHeight': getValue(rows, 'ScreenHeight', '='),
                'ScreenWidth': getValue(rows, 'ScreenWidth', '=')
            }
            resolve(screen);
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

            const network = {
                'item': 'network'
            };

            for (let i = 0; i < arr.length; i++) {
                const stt = i + 1;
                network['connectionName ' + stt] = getValue(arr[i], 'Connection Name', ':');
                network['networkAdapter ' + stt] = getValue(arr[i], 'Network Adapter', ':');
                network['physicalAddress ' + stt] = getValue(arr[i], 'Physical Address', ':');
                network['transportName ' + stt] = getValue(arr[i], 'Transport Name', ':');
            }

            resolve(network);
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
    screen,
    network
};
