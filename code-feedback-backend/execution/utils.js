const fs = require('fs');
const path = require('path');

function ensureTempDir(dirname) {
  const tempDir = path.join(dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

function cleanupFiles(files) {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

module.exports = {
  ensureTempDir,
  cleanupFiles
}; 