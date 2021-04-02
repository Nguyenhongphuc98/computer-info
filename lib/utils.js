const exec = require('child_process').exec;

// Key/value meaning ====================================
const memoryTypes = new Map([
    ['0', 'Unknown'],
    ['1', "Other"],
    ['2', "DRAM"],
    ['3', "Synchronous DRAM"],
    ['4', "Cache DRAM"],
    ['5', "EDO"],
    ['6', "EDRAM"],
    ['7', "VRAM"],
    ['8', "SRAM"],
    ['9', "RAM"],
    ['10', "ROM"],
    ['11', "Flash"],
    ['12', "EEPROM"],
    ['13', "FEPROM"],
    ['14', "EPROM"],
    ['15', "CDRAM"],
    ['16', "3DRAM"],
    ['17', "SDRAM"],
    ['18', "SGRAM"],
    ['19', "RDRAM"],
    ['20', "DDR"],
    ['21', "DDR2"],
    ['22', "DDR2 FB-DIMM"],
    ['23', "DDR3"],
    ['24', "FBD2"]
]);

const formFactors = new Map([
    ['1', 'Other'],
    ['2', 'SIP'],
    ['3', 'DIP'],
    ['4', 'ZJP'],
    ['5', 'SOJ'],
    ['6', 'Proprietary'],
    ['7', 'SIMM'],
    ['8', 'DIMM'],
    ['9', 'TSOP'],
    ['10', 'PGA'],
    ['11', 'RIMM'],
    ['12', 'SODIMM'],
    ['13', 'SRIMM'],
    ['14', 'SMD'],
    ['15', 'SSMP'],
    ['16', 'QFP'],
    ['17', 'TQFP'],
    ['18', 'SOIC'],
    ['19', 'LCC'],
    ['20', 'PLCC'],
    ['21', 'BGA'],
    ['22', 'FPBGA'],
    ['23', 'LGA'],
    ['0', 'Unknown']
]);

const availabilities = new Map([
    ['1', 'Other'],
    ['2', 'Unknown'],
    ['3', 'Runing/Full Power'],
    ['4', 'Warning'],
    ['5', 'In Test'],
    ['6', 'Not Applicable'],
    ['7', 'Power Off'],
    ['8', 'Off Line'],
    ['9', 'Off Duty'],
    ['10', 'Degraded'],
    ['11', 'Not Installed'],
    ['12', 'Install Error'],
    ['13', 'Power Save - Unknown'],
    ['14', 'Power Save - Low Power Mode'],
    ['15', 'Power Save - Standby'],
    ['16', 'Power Cycle'],
    ['17', 'Power Save - Warning'],
    ['18', 'Paused'],
    ['19', 'Not Ready'],
    ['20', 'Not Configured'],
    ['21', 'Quiesced'],
    ['22', 'BatteryRechargeTime']
]);

const chemistries = new Map([
    ['1', 'Other'],
    ['2', 'Unknown'],
    ['3', 'Lead Acid'],
    ['4', 'Nickel Cadmium'],
    ['5', 'Nickel Metal Hydride'],
    ['6', 'Lithium-ion'],
    ['7', 'Zinc air'],
    ['8', 'Lithium Polymer']
]);

const batteryStatus = new Map([
    ['1', 'Other'],
    ['2', 'Unknown'],
    ['3', 'Fully Charged'],
    ['4', 'Low'],
    ['5', 'Critial'],
    ['6', 'Charging'],
    ['7', 'Charging and High'],
    ['8', 'charging and Low'],
    ['9', 'charging and Critical'],
    ['10', 'Undefined'],
    ['10', 'Partially Charged']
]);

// Mac cmd ====================================
function sysctl(cmd, callback) {
    // -n : Use this option to disable printing of the key name when printing values.
    const fullCmd = 'sysctl -n ' + cmd;
    macExe(fullCmd, true, callback);
}

function profiler(cmd, callback, isRaw) {
    const fullCmd = 'system_profiler ' + cmd;
    macExe(fullCmd,isRaw, callback);
}

function macExe(cmd,isRaw = false, callback) {
    exec(cmd, (e, stdout) => {
        const rows = stdout.toString().split("\n");
        callback(isRaw ? rows : rowsToMap(rows, ':', true));
    })
}

// Win cmd ====================================
function wmic(cmd, callback) {
    const fullCmd = 'wmic ' + cmd;

    exec(fullCmd, (e, stdout) => {
        const filtered = stdout.replace(/(^[ \t]*\n\r)/gm, "");
        const rows = filtered.split("\n");
        const map = rowsToMap(rows, '='); // all wmic return key-value format =
        callback(map);
    });
}

function winExe(cmd, callback) {
    exec(cmd, (e, stdout) => {
        callback(stdout);
    })
}

function getMemoryType(id) {
    return memoryTypes.get(id) || 'Unknown';
}

function getFormFactor(id) {
    return formFactors.get(id) || "Unknown";
}

function getAvailability(id) {
    return availabilities.get(id) || "Unknown";
}

function getChemistry(id) {
    return chemistries.get(id) || "Unknown";
}

function getBattreyStatus(id) {
    return batteryStatus.get(id) || "Unknown";
}

function getStatusInfo(ids) {
    sttInfos = ids.split(' - ');
    let infoStr = '';

    function idToStr(id) {
        switch (id) {
            case '1': return "Other";
            case '2': return "Unknown";
            case '3': return "Enable";
            case '4': return "Disable";
            case '5': return "Not Applicable";
            default:
                return "Unknown";
        }
    }

    for (let i = 0; i < sttInfos.length; i++) {
        infoStr = infoStr + ' - ' + idToStr(sttInfos[i]);
    }
    if (infoStr.startsWith(' - ')) {
        infoStr = infoStr.substring(3);
    }

    return infoStr;
}

function rowsToMap(lines, separator, trimmed) {
    separator = separator || ':';
    trimmed = trimmed || false;

    const data = new Map();
    for (let i = 0; i < lines.length; i++) {
        // preprocess
        let line = lines[i].toLowerCase().replace(/[\t\r]/g, '');
        if (trimmed) {
            line = line.trim();
        }

        // Map key-value
        const parts = trimmed ? lines[i].trim().split(separator) : lines[i].split(separator);
        if (parts.length >= 2) {
            const key = parts.shift().toLowerCase();
            const value = parts.join(separator).trim();
            data.set(key, data.get(key) ? data.get(key) + ' - ' + value : value);
        }
    }

    return data;
}

function getValueByKey(map, key) {
    const k = key.toLowerCase();
    return map.get(k);
}

module.exports = {
    sysctl,
    profiler,
    wmic,
    getAvailability,
    getChemistry,
    getBattreyStatus,
    winExe,
    getMemoryType,
    getFormFactor,
    getStatusInfo,
    getValueByKey,
    rowsToMap,
    rawItemToObject
};

function rawItemToObject(item, raw, seperator = ':') {
    let o = {};
    const lines = rowsToMap(raw, seperator);

    for (const key in item) {
        o[key] = getValueByKey(lines, item[key]) || item[key];
    }
    return o;
}