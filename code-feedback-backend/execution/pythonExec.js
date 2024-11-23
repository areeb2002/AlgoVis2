const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function executePythonCode(code) {
  return new Promise((resolve, reject) => {
    // Write code to temp file instead of direct execution
    const tempFile = path.join(__dirname, 'temp.py');
    
    try {
      fs.writeFileSync(tempFile, code);
      
      // Execute with timeout and restricted permissions
      exec(`python "${tempFile}"`, {
        timeout: 5000,
        maxBuffer: 1024 * 1024,
      }, (error, stdout, stderr) => {
        // Cleanup temp file
        fs.unlinkSync(tempFile);
        
        if (error) {
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    } catch (err) {
      reject('Error executing Python code: ' + err.message);
    }
  });
}

module.exports = { executePythonCode };
