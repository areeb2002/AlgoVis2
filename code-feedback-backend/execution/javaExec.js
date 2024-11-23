const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Executes Java code
function executeJavaCode(code) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'Temp.java';
    fs.writeFileSync(tempFileName, code);  // Write Java code to a temporary file

    // Compile and run the Java code
    exec(`javac ${tempFileName} && java Temp`, (error, stdout, stderr) => {
      fs.unlinkSync(tempFileName);  // Remove temporary file
      if (error) {
        reject(stderr || 'Error executing Java code');
      } else {
        resolve(stdout);  // Return execution output
      }
    });
  });
}

module.exports = { executeJavaCode };
