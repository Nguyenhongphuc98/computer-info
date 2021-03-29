const { exec } = require("child_process");

function execute(tasks, elapse = 0) {
    if (!tasks || tasks.length === 0) {
        return;
    }

    let currrentTask = tasks.shift();
    const childProcess = exec(currrentTask.cmd);

    function next() {
        // if (tasks.length > 0) {
        //    setTimeout(() => {
        //         // console.log(tasks);
        //         currrentTask = tasks.shift();
        //         console.log(currrentTask);
        //         childProcess.stdin.write('wmic path Win32_SoundDevice get/format:value');
        //         // childProcess.stdin.end();
        //     }, elapse);
        // }
    }

    

    childProcess.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        // currrentTask.handle(data, null);
        // next();
    });
    childProcess.stdout.on("end", data => {
       
        console.log('end===========');
        // currrentTask.handle(data, null);
        // next();
    });

    childProcess.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        currrentTask.handle(null, data);
        next();
    });

    childProcess.on('error', (error) => {
        console.log(`error: ${error.message}`);
        // currrentTask.handle(null, error.message);
        // next();
    });

    childProcess.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

    childProcess.on('disconnect', () => {
        console.log('exit');
    })

    childProcess.stdin.write('wmic cpu get/value');
    childProcess.stdin.end();
}

let tasks = [
    {
        cmd: 'wmic path Win32_Keyboard get/format:value',
        handle: (data, err) => {
            // console.log(data);
        }
    }
]

execute(tasks);
