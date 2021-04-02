const { exec } = require("child_process");
var childProcess
var currrentTask;

function execute(tasks, elapse = 10) {
    if (!tasks || tasks.length === 0) {
        return;
    }

    currrentTask = tasks.shift();
    childProcess = exec(currrentTask.cmd);

    function next() {
        if (tasks.length > 0) {
            setTimeout(() => {
                currrentTask = tasks.shift();
                // console.log(currrentTask);
                // if (childProcess.writeable) {
                console.log('safe to');
                childProcess.stdin.write(currrentTask.cmd);
                childProcess.stdin.end();
            }, elapse);
        }
    }


    childProcess.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        console.log('ondata');
        currrentTask.handle(data, null);
        next();
    });

    childProcess.stdout.on("end", data => {
        console.log('end===========');
    });

    childProcess.stderr.on("data", data => {
        currrentTask.handle(null, data);
    });

    childProcess.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    childProcess.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

    childProcess.on('disconnect', () => {
        console.log('exit');
    })


}

let tasks = [
    {
        cmd: 'system_profiler SPSecureElementDataType && sysctl hw.model',
        handle: (data, err) => {
            // console.log(data);
        }
    },
    {
        cmd: 'SPBluetoothDataType\n\r',
        handle: (data, err) => {
            // console.log(data);
        }
    }
]

execute(tasks);



// const cp = require('child_process');

// function spawnInstance () {
//   const c = cp.spawn('wmic cpu get/format:value', {shell: true});
//   return command => {
//     return new Promise((resolve, reject) => {
//       c.stdout.on('data', d => resolve(String(d || 'empty stdout.\n')));
//       c.stderr.once('data', d => reject(String(d || 'empty stderr.\n')));
//       c.stdin.write(`echo "${command}" | bash;`);   // I tried this, not much better
//       c.stdin.write('\n');
//     });
//   };
// }

// (async () => {
//   const bash = spawnInstance();

//   console.log(await bash('wmic cpu get/format:value'));

//   console.log('now running cd node_modules...');
//   console.log(await bash('wmic path Win32_Keyboard get/format:value'));

// })()
// .catch(e =>
//   console.error(e)
// );