const path = require('path');
const fs = require('fs');
const process = require('process');

function greeting() {
  // console.log(__dirname);
  let nameOfFile = path.join(__dirname, 'result.txt');
  const streamForWriting = fs.createWriteStream(nameOfFile);
  process.stdout.write('Hello, friend) What is your name?\n');
  process.stdout.write('Please: write answer here:  ');
  process.stdin.on('data', function (data) {
    let information = data.toString().trim();
    if (information !== 'exit') {
      streamForWriting.write(`${information}\n`);
      process.stdout.write('Write something intresting about yourself here:  ');
    } else {
      process.stdout.write('Good bye! \n');
      process.exit();
    }
  });
  process.on('exit', function () {
    process.stdout.write('Nice to meet you) \n');
  });
  process.on('SIGINT', function () {
    process.stdout.write('\nGood bye! \n');
    process.exit();
  });
}

greeting();
