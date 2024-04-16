const fs = require('fs');
const path = require('path');

function renameFilesRecursively(directory) {
  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      renameFilesRecursively(filePath);
    } else {
      if (file.endsWith('.js')) {
        const newFilePath = path.join(directory, file.replace(/\.js$/, '.tsx'));
        fs.renameSync(filePath, newFilePath);
      }
    }
  });
}

renameFilesRecursively('/Users/jan/code/playground/todo');