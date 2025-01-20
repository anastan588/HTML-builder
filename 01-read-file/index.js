const path = require('path');
const fs = require('fs');

function readFile() {
  // console.log(path.dirname(__filename));
  // console.log(path.join(__dirname, 'text.txt'));
  // console.log(path.resolve(__dirname, 'text.txt'));
  let pathOfFile = path.join(__dirname, 'text.txt');
  const streamForReading = fs.createReadStream(pathOfFile, 'utf-8');
  streamForReading.on('data', (partOfInformation) =>
    console.log(`File content:\n\n${partOfInformation}`),
  );
  streamForReading.on('error', (err) =>
    console.log(`Ups, something went wrong) ${err.message}`),
  );
}

readFile();
