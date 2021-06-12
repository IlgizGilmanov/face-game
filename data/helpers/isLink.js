exports.isLink = (string) => {
  // if url contains 'http' or 'https'
  return /^(?=.*?((\bhttp\b)|(\bhttps\b))).*$/.test(string);
};
