const path = require('path');
const fs = require('fs');

function getInromationAboutFiles() {
  let pathOfFolder = path.join(__dirname, 'secret-folder');
  let currentDirectory = 'secret-folder';
  // console.log(pathOfFolder);
  fs.readdir(pathOfFolder, { withFileTypes: true }, function (err, files) {
    if (err) {
      console.log(`Ups, something went wrong) ${err.message}`);
    } else {
      console.log(`\nInformation about ${currentDirectory} directory files:\n`);
      files.forEach((file) => {
        if (file.isFile()) {
          // console.log(file);
          // let nameOfFile  = file.name;
          let pathOfFile = path.join(pathOfFolder, file.name);
          // console.log(pathOfFile);
          let ext = path.extname(pathOfFile);
          // console.log(typeof ext);
          fs.stat(pathOfFile, (err, stats) => {
            if (err) {
              console.log(`Ups, something went wrong) ${err.message}`);
            } else {
              // console.log(stats);
              let size = stats.size;
              // console.log(size);
              let nameOfFile = file.name
                .split('.')
                .slice(0, file.name.split('.').length - 1)
                .join('.');
              let nameOfExtension = ext.slice(1, ext.length);
              // console.log(nameOfFile);
              console.log(
                `${nameOfFile} - ${nameOfExtension} - ${(size / 1024).toFixed(
                  3,
                )}kb`,
              );
            }
          });
        }
      });
    }
  });
}

getInromationAboutFiles();
