const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function executeCppCode(code) {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, 'temp');
    const tempFile = path.join(tempDir, 'temp.cpp');
    const execFile = path.join(tempDir, 'temp.exe');

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      // Write code to file
      fs.writeFileSync(tempFile, code);

      // Build command based on platform
      const compileCmd = process.platform === 'win32' 
        ? `g++ "${tempFile}" -o "${execFile}"`
        : `g++ "${tempFile}" -o "${execFile.slice(0, -4)}"`;

      const runCmd = process.platform === 'win32'
        ? `"${execFile}"`
        : `"${execFile.slice(0, -4)}"`;

      // Compile and run
      exec(compileCmd, (error, stdout, stderr) => {
        if (error) {
          cleanup();
          reject(stderr || 'Compilation error occurred');
          return;
        }

        exec(runCmd, (error, stdout, stderr) => {
          cleanup();
          if (error) {
            reject(stderr || 'Execution error occurred');
          } else {
            resolve(stdout);
          }
        });
      });

      function cleanup() {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        if (fs.existsSync(execFile)) fs.unlinkSync(execFile);
        if (fs.existsSync(execFile.slice(0, -4))) fs.unlinkSync(execFile.slice(0, -4));
      }
    } catch (err) {
      reject('Error: ' + err.message);
    }
  });
}

module.exports = { executeCppCode };
