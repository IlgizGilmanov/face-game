exports.getCommonPaths = (__dirname) => {
  const [inputFolderPath, outputFolderPath] = [`${__dirname}/input`, `${__dirname}/output`];
  const imagesDir = `${outputFolderPath}/images`;
  return { inputFolderPath, outputFolderPath, imagesDir };
};
