const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function executePythonCode(code) {
  return new Promise((resolve, reject) => {
    // Ensure the temp directory exists
    const tempDir = path.resolve(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFile = path.join(tempDir, 'temp.py');

    try {
      // Write code to temp file
      fs.writeFileSync(tempFile, code);

      // Execute Python code with timeout and safe buffer size
      exec(`python "${tempFile}"`, {
        timeout: 5000, // Timeout in ms
        maxBuffer: 1024 * 1024, // 1 MB buffer
      }, (error, stdout, stderr) => {
        // Cleanup temp file
        fs.unlinkSync(tempFile);

        if (error) {
          console.error('Python Execution Error:', error.message); // Log the error
          reject(stderr || 'Python execution error: ' + error.message);
        } else {
          resolve(stdout.trim()); // Trim extra spaces in output
        }
      });
    } catch (err) {
      reject('Error executing Python code: ' + err.message);
    }
  });
}

module.exports = { executePythonCode };
