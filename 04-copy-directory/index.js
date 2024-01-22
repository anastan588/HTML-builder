const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

let pathOfCurrentFolder = path.join(__dirname, 'files');
let pathOfCopyFolder = path.join(__dirname, 'files-copy');

function copyDirectory(pathOfCurrentFolder, pathOfCopyFolder) {
  fsPromises
    .mkdir(pathOfCopyFolder, { recursive: true })
    // .then(function () {
    //   console.log("New directory created successfully");
    // })
    .catch(function (err) {
      console.log(`Ups, something went wrong) ${err}`);
    });
  fs.readdir(pathOfCopyFolder, { withFileTypes: true }, function (err, files) {
    files.forEach((file) => {
      if (file.isFile()) {
        fsPromises.unlink(path.join(pathOfCopyFolder, file.name));
      }
    });
  });
  fs.readdir(
    pathOfCurrentFolder,
    { withFileTypes: true },
    function (err, files) {
      files.forEach((file) => {
        if (file.isFile()) {
          let pathOfCurrentFile = path.join(pathOfCurrentFolder, file.name);
          let pathOfCopyFile = path.join(pathOfCopyFolder, file.name);
          fsPromises
            .copyFile(pathOfCurrentFile, pathOfCopyFile)
            // .then(function () {
            //   console.log("File Copied to the new Directory");
            // })
            .catch(function (err) {
              console.log(`Ups, something went wrong) ${err}`);
            });
        } else if (file.isDirectory()) {
          copyDirectory(
            path.join(pathOfCurrentFolder, file.name),
            path.join(pathOfCopyFolder, file.name),
          );
        }
      });
    },
  );
  console.log('\nFiles copied to the new directory');
}
copyDirectory(pathOfCurrentFolder, pathOfCopyFolder);
