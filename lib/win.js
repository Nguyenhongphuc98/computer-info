// map command type to system command ===========================================
// category - cmd type - params
const cmds = new Map([
    ['cpu', ['wmic', 'cpu get/value']],
    ['bluetooth', ['wmic', 'PATH Win32_PNPEntity WHERE Service="BTHUSB" get/format:value']],
    ['bios', ['wmic', 'bios get/format:value']],
    ['power', ['wmic', 'Path Win32_Battery get/format:value']],
    ['disk', ['wmic', 'diskdrive get/format:value']],
    ['memory', ['wmic', 'memorychip get/format:value']],
    ['display', ['wmic', 'desktopmonitor get/format:value']],
    ['graphics', ['wmic', 'path Win32_videocontroller get/format:value']],
    ['sound', ['wmic', 'path Win32_SoundDevice get/format:value']],
    ['keyboard', ['wmic', 'path Win32_Keyboard get/format:value']],
    ['software', ['systeminfo', '/fo:list']],
    ['network', ['getmac', '/fo:list /v']]
]);

// template output for each item(category) ======================================
const win = {
    'cpu': {
        'item': 'cpu',
        'description': 'name',
        'l2cachesize': 'l2cachesize',
        'l3cachesize': 'l3cachesize',
        'manufacturer': 'manufacturer',
        'maxClockSpeed': 'maxClockSpeed',
        'numberOfCores': 'numberOfCores',
        'numberOfLogicalProcessors': 'NumberOfLogicalProcessors',
        'processorID': 'processorID',
        'processorType': 'processorType',
        'revision': 'revision',
        'systemName': 'systemName'
    },
    'bluetooth': {
        'item': 'Bluetooth',
        'classGuid': 'ClassGuid',
        'manufacturer': 'Manufacturer',
        'name': 'Name',
        'deviceID': 'DeviceID',
        'status': 'Status',
        'hardwareID': 'HardwareID',
        'installDate': 'InstallDate'
    },
    'bios': {
        'item': 'BIOS',
        'name': 'Name',
        'BIOSVersion': 'BIOSVersion',
        'releaseDate': 'ReleaseDate',
        'currentLanguage': 'CurrentLanguage',
        'listOfLanguages': 'ListOfLanguages',
        'manufacturer': 'Manufacturer',
        'serialNumber': 'SerialNumber'
    },
    'power': {
        'item': 'power',
        'name': 'Name',
        'chemistry': 'Chemistry',
        'batteryStatus': 'BatteryStatus',
        'availability': 'Availability',
        'deviceID': 'DeviceID',
        'PNPDeviceID': 'PNPDeviceID'
    },
    'software': {
        'item': 'software',
        'hostName': 'Host Name',
        'OSName': 'OS Name',
        'OSVersion': 'OS Version',
        'OSManufacturer': 'OS Manufacturer',
        'productID': 'Product ID',
        'originalInstallDate': 'Original Install Date',
        'systemBootTime': 'System Boot Time',
        'systemManufacturer': 'System Manufacturer',
        'systemModel': 'System Model',
        'systemType': 'System Type',
        'BIOSVersion': 'BIOS Version',
        'timeZone': 'Time Zone',
        'totalPhysicalMemory': 'Total Physical Memory'
    },
    'disk': {
        'item': 'disk',
        'name': 'Name',
        'bytesPerSector': 'BytesPerSector',
        'capabilityDescriptions': 'CapabilityDescriptions',
        'caption': 'Caption',
        'interfaceType': 'InterfaceType',
        'deviceID': 'DeviceID',
        'manufacturer': 'Manufacturer',
        'firmwareRevision': 'FirmwareRevision',
        'serialNumber': 'SerialNumber',
        'size': 'Size',
        'status': 'Status',
        'totalSectors': 'TotalSectors'
    },
    'memory': {
        'item': 'memory',
        'deviceLocator': 'DeviceLocator',
        'capacity': 'Capacity',
        'formFactor': 'FormFactor',
        'manufacturer': 'Manufacturer',
        'memoryType': 'MemoryType',
        'partNumber': 'PartNumber',
        'serialNumber': 'SerialNumber',
        'speed': 'Speed'
    },
    'display': {
        'item': 'display',
        'caption': 'Caption',
        'monitorType': 'MonitorType',
        'monitorManufacturer': 'MonitorManufacturer',
        'name': 'Name',
        'screenHeight': 'ScreenHeight',
        'screenWidth': 'ScreenWidth'
    },
    'graphics': {
        'item': 'graphics',
        'name': 'Name',
        'adapterCompatibility': 'AdapterCompatibility',
        'adapterDACType': 'AdapterDACType',
        'adapterRAM': 'AdapterRAM',
        'availability': 'Availability',
        'currentBitsPerPixel': 'CurrentBitsPerPixel',
        'currentNumberOfColors': 'CurrentNumberOfColors',
        'currentRefreshRate': 'CurrentRefreshRate',
        'driverVersion': 'DriverVersion'
    },
    'sound': {
        'item': 'sound',
        'productName': 'ProductName',
        'statusInfo': 'StatusInfo',
            'status': 'Status',
            'PNPDeviceID': 'PNPDeviceID',
            'manufacturer': 'Manufacturer'
    },
    'keyboard': {
        'item': 'keyboard',
        'name': 'Name',
        'description': 'Description',
        'status': 'Status',
        'PNPDeviceID': 'PNPDeviceID',
        'numberOfFunctionKeys': 'NumberOfFunctionKeys',
        'layout': 'Layout',
        'deviceID': 'DeviceID'
    },
    'network': {
        'item': 'network',
        'connectionName':'Connection Name',
        'networkAdapter':'Network Adapter',
        'physicalAddress':'Physical Address',
        'transportName':'Transport Name'
    }
}

module.exports = {
    wcomponents: Object.keys(win),
    cmds,
    win
};