function executeJavaCode(code) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'Temp.java';
    const classFileName = 'Temp.class';

    try {
      fs.writeFileSync(tempFileName, code); // Write Java code to a temporary file

      // Compile Java code
      exec(`javac ${tempFileName}`, (compileError, _, compileStderr) => {
        if (compileError) {
          fs.unlinkSync(tempFileName); // Cleanup source file
          reject(compileStderr || 'Compilation error in Java code');
          return;
        }

        // Execute compiled Java code
        exec(`java Temp`, (execError, stdout, execStderr) => {
          // Cleanup temporary files
          fs.unlinkSync(tempFileName);
          if (fs.existsSync(classFileName)) fs.unlinkSync(classFileName);

          if (execError) {
            reject(execStderr || 'Error executing Java code');
          } else {
            resolve(stdout);
          }
        });
      });
    } catch (err) {
      reject('Error setting up Java execution: ' + err.message);
    }
  });
}

module.exports = { executeJavaCode };
