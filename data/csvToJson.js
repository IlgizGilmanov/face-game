// Export zip archive with users' data from notion
// Extract archive and put all contents of the archive in the `data/input` folder (create if not exists)
// run `node data/csvToJson.js` command in terminal (you need to have an installed nodejs)
// Converted json file will be in `output` folder, userpics - in `output/images`

// More info: https://www.npmjs.com/package/csvtojson

const func = async () => {
  const fs = require('fs');
  const csvToJson = require('csvtojson');
  const { getCsvFileNames, getCommonPaths, getFormattedRecords, saveImage } = require('./helpers');

  const { inputFolderPath, outputFolderPath, imagesDir } = getCommonPaths(__dirname);

  // create 'images' folder if not exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }
  // create 'output' folder if not exists
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
  }

  console.log('\x1b[36m%s\x1b[0m', 'Data file search...');

  const fileNames = getCsvFileNames(inputFolderPath);

  if (!fileNames.length) {
    console.log('\x1b[31m%s\x1b[0m', 'File not found!');
    throw new Error('File not found!');
  }

  console.log('\x1b[32m%s\x1b[0m', `File found: ${fileNames[0]}`);
  console.log('\x1b[36m%s\x1b[0m', 'Data processing...');

  const records = await csvToJson().fromFile(`${inputFolderPath}/${fileNames[0]}`);

  if (!records || !records.length) {
    console.log('\x1b[31m%s\x1b[0m', 'Records not found!');
    throw new Error('Records not found!');
  }

  let formattedRecords = getFormattedRecords(__dirname, records);

  formattedRecords.forEach(async (record) => {
    await saveImage(record);
  });

  fs.writeFile(
    `${outputFolderPath}/team-directory.json`,
    JSON.stringify(
      formattedRecords.map(({ name, photoPath }) => ({
        name,
        photoPath,
      })),
      null,
      2,
    ),
    (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('\x1b[32m%s\x1b[0m', "Results are saved in a 'team-directory.json' file");
    },
  );
};

try {
  func();
} catch (error) {
  console.log('\x1b[31m', error);
}
