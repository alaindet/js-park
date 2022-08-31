function rot13(input) {

  const result = [];
  const limits = 'azAZ';
  const lowerInf = limits.charCodeAt(0);
  const lowerSup = limits.charCodeAt(1);
  const upperInf = limits.charCodeAt(2);
  const upperSup = limits.charCodeAt(3);
  const maxDiff = lowerSup - lowerInf;

  for (let i = 0, len = input.length; i < len; i++) {
    const charCode = input.charCodeAt(i)
    let subCharCode = charCode + 13;

    // lowercase
    if (charCode >= lowerInf && charCode <= lowerSup) {
      if (subCharCode > lowerSup) {
        subCharCode -= maxDiff + 1;
      }
      result.push(subCharCode);
      continue;
    }

    // uppercase
    if (charCode >= upperInf && charCode <= upperSup) {
      if (subCharCode > upperSup) {
        subCharCode -= maxDiff + 1;
      }
      result.push(subCharCode);
      continue;
    }

    // leave as it is
    result.push(charCode)
  }

  return String.fromCharCode(...result);
}

module.exports = rot13;
