const path = require('path');
const fs = require('fs');

function makeCommonCssFile() {
  let pathOfStylesFolder = path.join(__dirname, 'styles');
  let pathOfDestinationFolder = path.join(__dirname, 'project-dist');
  let pathOfFileWriting = path.join(pathOfDestinationFolder, 'bundle.css');
  const streamForWriting = fs.createWriteStream(pathOfFileWriting);
  fs.readdir(
    pathOfStylesFolder,
    { withFileTypes: true },
    function (err, files) {
      if (err) {
        console.log(`Ups, something went wrong) ${err.message}`);
      } else {
        files.forEach((file) => {
          if (file.isFile()) {
            //   console.log(file);
            let pathOfFileReading = path.join(pathOfStylesFolder, file.name);
            let ext = path.extname(pathOfFileReading);
            const streamForReading = fs.createReadStream(
              pathOfFileReading,
              'utf-8',
            );
            if (ext === '.css') {
              streamForReading.pipe(streamForWriting);
              // streamForReading.on("data", (chunk) => {
              //   console.log('write');
              //   streamForWriting.write(`${chunk.toString()}\n`);
              // });
              streamForReading.on('error', (err) =>
                console.log(`Ups, something went wrong) ${err.message}`),
              );
            }
          }
        });
        console.log('\nCss file created successfully)');
      }
    },
  );
}

makeCommonCssFile();
