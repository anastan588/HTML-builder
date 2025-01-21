const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

function makeHtmlPage() {
  let pathOfFileTemplate = path.join(__dirname, 'template.html');
  let pathOfFolderWithHTMLComponets = path.join(__dirname, 'components');
  let pathOfFolderWithCssComponets = path.join(__dirname, 'styles');
  // console.log(pathOfFileTemplate);
  // console.log(pathOfFolderWithHTMLComponets);
  let pathOfDestinationFolder = path.join(__dirname, 'project-dist');

  //   console.log(pathOfFileWritingIndexHtml);
  fsPromises
    .mkdir(pathOfDestinationFolder, { recursive: true })
    .then(function () {
      // console.log('New directory created successfully');
      let pathOfFileWritingIndexHtml = path.join(
        pathOfDestinationFolder,
        'index.html',
      );
      const streamForWritingIndexHtml = fs.createWriteStream(
        pathOfFileWritingIndexHtml,
      );
      let pathOfFileWritingIStyleCss = path.join(
        pathOfDestinationFolder,
        'style.css',
      );
      const streamForWritingStyleCss = fs.createWriteStream(
        pathOfFileWritingIStyleCss,
      );
      const streamForReadingTemplateFile = fs.createReadStream(
        pathOfFileTemplate,
        'utf-8',
      );
      streamForReadingTemplateFile.on('data', (partOfInformation) => {
        let innerTextInFile = partOfInformation;
        let innerTextInFileForCHange = '';
        fs.readdir(
          pathOfFolderWithHTMLComponets,
          { withFileTypes: true },
          function (err, files) {
            if (err) {
              console.log(`Ups, something went wrong) ${err.message}`);
            } else {
              // console.log('\nInformation about current directory files:');
              // console.log(files.length);
              let arrayOfExp = [];
              let countOfHTmlExp = 0;
              for (let i = 0; i < files.length; i += 1) {
                // console.log(files[i].name);
                arrayOfExp.push(files[i].name.split('.')[1]);
                if (files[i].name.split('.')[1] === 'html') {
                  countOfHTmlExp += 1;
                }
              }
              // console.log(arrayOfExp);
              // console.log(countOfHTmlExp);
              let count = 0;
              files.forEach((file) => {
                if (file.isFile(count)) {
                  // console.log(file);
                  // let nameOfFile  = file.name;
                  let pathOfFile = path.join(
                    pathOfFolderWithHTMLComponets,
                    file.name,
                  );
                  const streamForReadingFile = fs.createReadStream(
                    pathOfFile,
                    'utf-8',
                  );
                  // console.log(pathOfFile);
                  let ext = path.extname(pathOfFile);
                  // console.log(ext);
                  if (ext === '.html') {
                    let nameOfFile = file.name.split('.')[0];
                    //   console.log(nameOfFile);
                    // console.log(innerTextInFile);
                    let templateTag = new RegExp(`{{${nameOfFile}}}`, 'g');
                    // console.log(templateTag);

                    if (innerTextInFile.match(templateTag)) {
                      // console.log(count);
                      streamForReadingFile.on('data', (innerText) => {
                        // console.log(innerText);
                        //   console.log(templateTag);
                        innerTextInFile = innerTextInFile.replace(
                          templateTag,
                          innerText,
                        );
                        innerTextInFileForCHange = innerTextInFile;
                        //    console.log(innerTextInFileForCHange);
                        count = count + 1;
                        // console.log(count);
                        //   console.log(countOfHTmlExp);
                        if (files.indexOf(file) === files.length - 1) {
                          streamForWritingIndexHtml.write(
                            innerTextInFileForCHange,
                          );
                        }
                      });
                    }
                  }
                }
              });
            }
          },
        );
      });
      fs.readdir(
        pathOfFolderWithCssComponets,
        { withFileTypes: true },
        function (err, files) {
          if (err) {
            console.log(`Ups, something went wrong) ${err.message}`);
          } else {
            files.forEach((file) => {
              if (file.isFile()) {
                //   console.log(file);
                let pathOfCssFileReading = path.join(
                  pathOfFolderWithCssComponets,
                  file.name,
                );
                let ext = path.extname(pathOfCssFileReading);
                const streamForReadingCssFile = fs.createReadStream(
                  pathOfCssFileReading,
                  'utf-8',
                );
                if (ext === '.css') {
                  streamForReadingCssFile.pipe(streamForWritingStyleCss);
                  streamForReadingCssFile.on('error', (err) =>
                    console.log(`Ups, something went wrong) ${err.message}`),
                  );
                }
              }
            });
          }
        },
      );
    })
    .catch(function (err) {
      console.log(`Ups, something went wrong) ${err}`);
    });
  let pathOfCurrentFolderAssets = path.join(__dirname, 'assets');
  let pathOfDestinationFolderAssets = path.join(
    pathOfDestinationFolder,
    'assets',
  );
  copyAssetsDirectory(pathOfCurrentFolderAssets, pathOfDestinationFolderAssets);
}

function copyAssetsDirectory(
  pathOfCurrentFolderAssets,
  pathOfDestinationFolderAssets,
) {
  fs.access(pathOfDestinationFolderAssets, (err) => {
    if (!err) {
      fs.rm(pathOfDestinationFolderAssets, { recursive: true }, (err) => {
        if (!err) {
          // console.log('folder deleted');
          copyAssetsDir(
            pathOfCurrentFolderAssets,
            pathOfDestinationFolderAssets,
          );
        }
      });
    } else {
      copyAssetsDir(pathOfCurrentFolderAssets, pathOfDestinationFolderAssets);
    }
  });
}

function copyAssetsDir(
  pathOfCurrentFolderAssets,
  pathOfDestinationFolderAssets,
) {
  fsPromises
    .mkdir(pathOfDestinationFolderAssets, { recursive: true })
    .then(function () {
      //   console.log('New directory created successfully');
    })
    .catch(function (err) {
      console.log(`Ups, something went wrong) ${err}`);
    });
  // fs.readdir(
  //   pathOfDestinationFolderAssets,
  //   { withFileTypes: true },
  //   function (err, files) {
  //     files.forEach((file) => {
  //       if (file.isFile()) {
  //         fsPromises.unlink(
  //           path.join(pathOfDestinationFolderAssets, file.name),
  //         );
  //       }
  //     });
  //   },
  // );
  fs.readdir(
    pathOfCurrentFolderAssets,
    { withFileTypes: true },
    function (err, files) {
      files.forEach((file) => {
        if (file.isFile()) {
          let pathOfCurrentFolderAssetsFile = path.join(
            pathOfCurrentFolderAssets,
            file.name,
          );
          let pathOfDestinationFolderAssetsFile = path.join(
            pathOfDestinationFolderAssets,
            file.name,
          );
          fsPromises
            .copyFile(
              pathOfCurrentFolderAssetsFile,
              pathOfDestinationFolderAssetsFile,
            )
            .then(function () {
              // console.log('File Copied to the new Directory');
            })
            .catch(function (err) {
              console.log(`Ups, something went wrong) ${err}`);
            });
        } else if (file.isDirectory()) {
          // console.log(file.name);
          copyAssetsDirectory(
            path.join(pathOfCurrentFolderAssets, file.name),
            path.join(pathOfDestinationFolderAssets, file.name),
          );
        }
      });
    },
  );
}

makeHtmlPage();
