const { mcomponents } = require('./mac');
const { wcomponents } = require('./win');
const { getInfoOf } = require('./handler');

// Either macOS or winOS be executed
const components = process.platform === 'darwin' ? mcomponents :  wcomponents;

/**
 * Collect device info base on provide categories
 * @param {array} categories - Array of items need to get
 * @param {number} waittime - Time pending between perfom process to exe cmd
 * @param {function} callback - Called when task complete or err. this is optional
 * @returns promise
 */
function getComputerInfo(categories, waittime, callback) {
    const invalids = [];
    const valids = [];

    categories.forEach(c => {
        if (components.includes(c)) {
            valids.push(c);
        } else {
            invalids.push(c);
        }
    });

    return new Promise((resolve, reject) => {

        if (valids.length === 0) {
            const message = 'No categories found!!!';
            if (callback) { callback(null, message); }
            reject(message);
        } else {

            function addAdditionInfo(result) {
                result.invalids = invalids.toString();
                result.valids = valids.toString();
                return result;
            }

            getInfoOf(valids, waittime)
                .then(
                    (data) => {
                        const finalValue = addAdditionInfo(data);
                        if (callback) {
                            callback(finalValue);
                        }
                        resolve(finalValue);
                    },
                    (err) => {
                        const finalValue = addAdditionInfo(err);
                        if (callback) {
                            callback(finalValue);
                        }
                        reject(finalValue);
                    })
        }
    })
}
module.exports = { getComputerInfo }