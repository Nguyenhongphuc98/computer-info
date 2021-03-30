const {
    wmic, winExe, getValue, getFormFactor, getMemoryType, getChemistry,
     getBattreyStatus, getAvailability, getStatusInfo, rowsToMap, getValueByKey
} = require('./utils');

// Execute method
function cpu() {
    return new Promise((resolve, reject) => {

        wmic("cpu get /value", map => {
            const c = {
                'item': 'cpu',
                'description':getValueByKey(map, 'name'),
                'l2cachesize':getValueByKey(map, 'l2cachesize'),
                'l3cachesize':getValueByKey(map, 'l3cachesize'),
                'manufacturer':getValueByKey(map, 'manufacturer'),
                'maxClockSpeed':getValueByKey(map, 'maxClockSpeed'),
                'numberOfCores':getValueByKey(map, 'numberOfCores'),
                'numberOfLogicalProcessors':getValueByKey(map, 'NumberOfLogicalProcessors'),
                'processorID':getValueByKey(map, 'processorID'),
                'processorType':getValueByKey(map, 'processorType'),
                'revision':getValueByKey(map, 'revision'),
                'systemName':getValueByKey(map, 'systemName', '=')
            }
            resolve(c);
        })
    })
}

function bluetooth() {
    return new Promise((resolve, reject) => {

        wmic('PATH Win32_PNPEntity WHERE Service="BTHUSB" get/format:value', map => {
            const bth = {
                'item': 'Bluetooth',
                'classGuid': getValueByKey(map, 'ClassGuid'),
                'manufacturer': getValueByKey(map, 'Manufacturer'),
                'name': getValueByKey(map, 'Name'),
                'deviceID': getValueByKey(map, 'DeviceID'),
                'status': getValueByKey(map, 'Status'),
                'hardwareID': getValueByKey(map, 'HardwareID'),
                'installDate': getValueByKey(map, 'InstallDate')
            }
            resolve(bth);
        })
    })
}

function bios() {
    return new Promise((resolve, reject) => {

        wmic('bios get/format:value', map => {
            const bi = {
                'item': 'BIOS',
                'name': getValueByKey(map, 'Name'),
                'BIOSVersion': getValueByKey(map, 'BIOSVersion'),
                'releaseDate': getValueByKey(map, 'ReleaseDate'),
                'currentLanguage': getValueByKey(map, 'CurrentLanguage'),
                'listOfLanguages': getValueByKey(map, 'ListOfLanguages'),
                'manufacturer': getValueByKey(map, 'Manufacturer'),
                'serialNumber': getValueByKey(map, 'SerialNumber')
            }
            resolve(bi);
        })
    })
}

function power() {
    return new Promise((resolve, reject) => {

        wmic('Path Win32_Battery get/format:value', map => {
            const battery = {
                'item': 'power',
                'name': getValueByKey(map, 'Name'),
                'chemistry': getChemistry(getValueByKey(map, 'Chemistry')),
                'batteryStatus': getBattreyStatus(getValueByKey(map, 'BatteryStatus')),
                'availability': getAvailability(getValueByKey(map, 'Availability')),
                'deviceID': getValueByKey(map, 'DeviceID'),
                'PNPDeviceID': getValueByKey(map, 'PNPDeviceID')
            }
            resolve(battery);
        })
    })
}

function software() {
    return new Promise((resolve, reject) => {
        winExe('systeminfo /fo:list', data => {

            const rows = data.trim().split("\n");
            const map = rowsToMap(rows, ':');
            const sw = {
                'item': 'software',
                'hostName': getValueByKey(map, 'Host Name'),
                'OSName': getValueByKey(map, 'OS Name'),
                'OSVersion': getValueByKey(map, 'OS Version'),
                'OSManufacturer': getValueByKey(map, 'OS Manufacturer'),
                'productID': getValueByKey(map, 'Product ID'),
                'originalInstallDate': getValueByKey(map, 'Original Install Date'),
                'systemBootTime': getValueByKey(map, 'System Boot Time'),
                'systemManufacturer': getValueByKey(map, 'System Manufacturer'),
                'systemModel': getValueByKey(map, 'System Model'),
                'systemType': getValueByKey(map, 'System Type'),
                'BIOSVersion': getValueByKey(map, 'BIOS Version'),
                'timeZone': getValueByKey(map, 'Time Zone'),
                'totalPhysicalMemory': getValueByKey(map, 'Total Physical Memory')
            }
            resolve(sw);
        })
    })
}

function disk() {
    return new Promise((resolve, reject) => {
        wmic('diskdrive get /format:value', map => {

            const di = {
                'item': 'disk',
                'name': getValueByKey(map, 'Name'),
                'bytesPerSector': getValueByKey(map, 'BytesPerSector'),
                'capabilityDescriptions': getValueByKey(map, 'CapabilityDescriptions'),
                'caption': getValueByKey(map, 'Caption'),
                'interfaceType': getValueByKey(map, 'InterfaceType'),
                'deviceID': getValueByKey(map, 'DeviceID'),
                'manufacturer': getValueByKey(map, 'Manufacturer'),
                'firmwareRevision': getValueByKey(map, 'FirmwareRevision'),
                'serialNumber': getValueByKey(map, 'SerialNumber'),
                'size': getValueByKey(map, 'Size'),
                'status': getValueByKey(map, 'Status'),
                'totalSectors': getValueByKey(map, 'TotalSectors')
            }
            resolve(di);
        })
    })
}

function memory() {
    return new Promise((resolve, reject) => {
        wmic('memorychip get /format:value', map => {

            const m = {
                'item': 'memory',
                'deviceLocator':  getValueByKey(map, 'DeviceLocator'),
                'capacity':  getValueByKey(map, 'Capacity'),
                'formFactor': getFormFactor( getValueByKey(map, 'FormFactor')),
                'manufacturer':  getValueByKey(map, 'Manufacturer'),
                'memoryType': getMemoryType( getValueByKey(map, 'MemoryType')),
                'partNumber':  getValueByKey(map, 'PartNumber'),
                'serialNumber':  getValueByKey(map, 'SerialNumber'),
                'speed':  getValueByKey(map, 'Speed')
            }
            resolve(m);
        })
    })
}

function display() {
    return new Promise((resolve, reject) => {
        wmic('desktopmonitor get /format:value', map => {

            const d = {
                'item': 'display',
                'caption': getValueByKey(map, 'Caption'),
                'monitorType': getValueByKey(map, 'MonitorType'),
                'monitorManufacturer': getValueByKey(map, 'MonitorManufacturer'),
                'name': getValueByKey(map, 'Name'),
                'screenHeight': getValueByKey(map, 'ScreenHeight'),
                'screenWidth': getValueByKey(map, 'ScreenWidth')
            }
            resolve(d);
        })
    })
}

function graphics() {
    return new Promise((resolve, reject) => {
        wmic('path Win32_videocontroller get /format:value', map => {

            const g = {
                'item': 'graphics',
                'name': getValueByKey(map, 'Name'),
                'adapterCompatibility':getValueByKey(map, 'AdapterCompatibility'),
                'adapterDACType': getValueByKey(map, 'AdapterDACType'),
                'adapterRAM': getValueByKey(map, 'AdapterRAM'),
                'availability': getAvailability(getValueByKey(map, 'Availability')),
                'currentBitsPerPixel': getValueByKey(map, 'CurrentBitsPerPixel'),
                'currentNumberOfColors': getValueByKey(map, 'CurrentNumberOfColors'),
                'currentRefreshRate': getValueByKey(map, 'CurrentRefreshRate'),
                'driverVersion': getValueByKey(map, 'DriverVersion')
            }
            resolve(g);
        })
    })
}

function network() {
    return new Promise((resolve, reject) => {
        winExe('getmac /fo list /v', data => {

            const rows = data.trim().split("\n");
            const map = rowsToMap(rows, ':');
            const n = {
                'item': 'sound',
                'connectionName': getValueByKey(map, 'Connection Name'),
                'networkAdapter': getValueByKey(map, 'Network Adapter'),
                'physicalAddress': getValueByKey(map, 'Physical Address'),
                'transportName': getValueByKey(map, 'Transport Name')
            }

            resolve(n);
        })
    })
}

function sound() {
    return new Promise((resolve, reject) => {
        wmic('path Win32_SoundDevice get/format:value', map => {

            const s = {
                'item': 'sound',
                'productName': getValueByKey(map, 'ProductName'),
                'statusInfo': getStatusInfo(getValueByKey(map, 'StatusInfo')),
                'status': getValueByKey(map, 'Status'),
                'PNPDeviceID': getValueByKey(map, 'PNPDeviceID'),
                'manufacturer': getValueByKey(map, 'Manufacturer')
            }
            resolve(s);
        })
    })
}

function keyboard() {
    return new Promise((resolve, reject) => {
            wmic('path Win32_Keyboard get/format:value', map => {

            const k = {
                'item': 'keyboard',
                'name': getValueByKey(map, 'Name'),
                'description': getValueByKey(map, 'Description'),
                'status': getValueByKey(map, 'Status'),
                'PNPDeviceID': getValueByKey(map, 'PNPDeviceID'),
                'numberOfFunctionKeys': getValueByKey(map, 'NumberOfFunctionKeys'),
                'layout':getValueByKey(map, 'Layout'),
                'deviceID': getValueByKey(map, 'DeviceID')
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
