const util = require('util');
const exec = require('child_process').exec;

// Mac cmd ====================================
function sysctl(cmd, callback) {
  // -n : Use this option to disable printing of the key name when printing values.
  const fullCmd = 'sysctl -n ' + cmd;
  exe(fullCmd, callback);
}

function profiler(cmd, callback) {
  const fullCmd = 'system_profiler ' + cmd;
  exe(fullCmd, callback);
}

// Win cmd ====================================
function wmic(cmd, callback) {
  const fullCmd = 'wmic ' + cmd;

  exec(fullCmd, (e, stdout) => {
    const filtered = stdout.replace(/(^[ \t]*\n\r)/gm, "");
    const rows = filtered.split("\n");
    callback(rows);
  })
}

// Excute cmd
// use for mac
function exe(cmd, callback) {
  exec(cmd, (e, stdout) => {
    const filtered = stdout.replace(/(^[ \t]*\n)/gm, "");
    const rows = filtered.split("/\n|\r/");
    callback(rows);
  })
}

function winExe(cmd, callback) {
  exec(cmd, (e, stdout) => {
    callback(stdout);
  })
}

function getValue(lines, property, separator, trimmed) {
  separator = separator || ':';
  property = property.toLowerCase();
  trimmed = trimmed || false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].toLowerCase().replace(/[\t\r]/g, '');
    if (trimmed) {
      line = line.trim();
    }
    if (line.startsWith(property)) {
      const parts = trimmed ? lines[i].trim().split(separator) : lines[i].split(separator);
      if (parts.length >= 2) {
        parts.shift();
        return parts.join(separator).trim();
      } else {
        return '';
      }
    }
  }
  return '';
}

function getMemoryType(id) {
  switch (id) {
    case '1': return "Other";
    case '2': return "DRAM";
    case '3': return "Synchronous DRAM";
    case '4': return "Cache DRAM";
    case '5': return "EDO";
    case '6': return "EDRAM";
    case '7': return "VRAM";
    case '8': return "SRAM";
    case '9': return "RAM";
    case '10': return "ROM";
    case '11': return "Flash";
    case '12': return "EEPROM";
    case '13': return "FEPROM";
    case '14': return "EPROM";
    case '15': return "CDRAM";
    case '16': return "3DRAM";
    case '17': return "SDRAM";
    case '18': return "SGRAM";
    case '19': return "RDRAM";
    case '20': return "DDR";
    case '21': return "DDR2";
    case '22': return "DDR2 FB-DIMM";
    case '23': return "DDR3";
    case '24': return "FBD2";
    case '0':
    default:
      return "Unknown";
  }
}

function getFormFactor(id) {
  switch (id) {
    case '1': return "Other";
    case '2': return "SIP";
    case '3': return "DIP";
    case '4': return "ZJP";
    case '5': return "SOJ";
    case '6': return "Proprietary";
    case '7': return "SIMM";
    case '8': return "DIMM";
    case '9': return "TSOP";
    case '10': return "PGA";
    case '11': return "RIMM";
    case '12': return "SODIMM";
    case '13': return "SRIMM";
    case '14': return "SMD";
    case '15': return "SSMP";
    case '16': return "QFP";
    case '17': return "TQFP";
    case '18': return "SOIC";
    case '19': return "LCC";
    case '20': return "PLCC";
    case '21': return "BGA";
    case '22': return "FPBGA";
    case '23': return "LGA";
    case '0':
    default:
      return "Unknown";
  }
}

function getAvailability(id) {
  switch (id) {
    case '1': return "Other";
    case '2': return "Unknown";
    case '3': return "Runing/Full Power";
    case '4': return "Warning";
    case '5': return "In Test";
    case '6': return "Not Applicable";
    case '7': return "Power Off";
    case '8': return "Off Line";
    case '9': return "Off Duty";
    case '10': return "Degraded";
    case '11': return "Not Installed";
    case '12': return "Install Error";
    case '13': return "Power Save - Unknown";
    case '14': return "Power Save - Low Power Mode";
    case '15': return "Power Save - Standby";
    case '16': return "Power Cycle";
    case '17': return "Power Save - Warning";
    case '18': return "Paused";
    case '19': return "Not Ready";
    case '20': return "Not Configured";
    case '21': return "Quiesced";
    case '22': return "BatteryRechargeTime";
    default:
      return "Unknown";
  }
}

function getChemistry(id) {
  switch (id) {
    case '1': return "Other";
    case '2': return "Unknown";
    case '3': return "Lead Acid";
    case '4': return "Nickel Cadmium";
    case '5': return "Nickel Metal Hydride";
    case '6': return "Lithium-ion";
    case '7': return "Zinc air";
    case '8': return "Lithium Polymer";
    default:
      return "Unknown";
  }
}

function getBattreyStatus(id) {
  switch (id) {
    case '1': return "Other";
    case '2': return "Unknown";
    case '3': return "Fully Charged";
    case '4': return "Low";
    case '5': return "Critial";
    case '6': return "Charging";
    case '7': return "Charging and High";
    case '8': return "charging and Low";
    case '9': return "charging and Critical";
    case '10': return "Undefined";
    case '10': return "Partially Charged";
    default:
      return "Unknown";
  }
}

function csvToObject(csv, name) {
  const lines = csv.split(/\r\n|\n/);
  const rows = [];

  // filter empty rows
  lines.forEach(r => {
    if (r !== '') {
      rows.push(r);
    }
  });

  let object = { 'item': name };
  const headings = rows[0].split(',');

  if (rows.length === 2) {
    // just one row data
    const datas = rows[1].split(',');
    for (let i = 0; i < headings.length; i++) {
      object[headings[i]] = datas[i];
    }
  } else {
    // in multis rows, we let it in parts
    for (let i = 1; i < rows.length; i++) {
      const datas = rows[i].replace(/"/g, "").split(',');
      for (let j = 0; j < headings.length; j++) {
        object['parts'][i - 1][headings[j]] = datas[j];
      }
    }
  }
  return object;
}

module.exports = {
  sysctl,
  profiler,
  wmic,
  getValue,
  getAvailability,
  getChemistry,
  getBattreyStatus,
  winExe,
  csvToObject,
  getMemoryType,
  getFormFactor
};