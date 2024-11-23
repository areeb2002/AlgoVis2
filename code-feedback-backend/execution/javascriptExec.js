const vm = require('vm');

function executeJavaScriptCode(code) {
  return new Promise((resolve, reject) => {
    try {
      // Create a secure context
      const context = vm.createContext({
        console: {
          log: (...args) => {
            output += args.join(' ') + '\n';
          }
        }
      });

      let output = '';
      
      // Run code in sandbox with timeout
      vm.runInContext(code, context, {
        timeout: 5000
      });

      resolve(output);
    } catch (err) {
      reject('Error in JavaScript code: ' + err.message); 
    }
  });
}

module.exports = { executeJavaScriptCode };
  