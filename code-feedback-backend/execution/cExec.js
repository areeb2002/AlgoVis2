const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Executes C code
function executeCCode(code) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'temp.c';
    fs.writeFileSync(tempFileName, code);  // Write C code to a temporary file

    // Compile and run the C code
    exec(`gcc ${tempFileName} -o temp && ./temp`, (error, stdout, stderr) => {
      fs.unlinkSync(tempFileName);  // Remove temporary file
      if (error) {
        reject(stderr || 'Error executing C code');
      } else {
        resolve(stdout);  // Return execution output
      }
    });
  });
}

module.exports = { executeCCode };
