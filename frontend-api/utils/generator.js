const crypto = require('crypto');

const generateId = (sourceIdentifier) => {
  const dateTime = new Date().getTime();
  const buffer = crypto.randomBytes(4); // 4 bytes
  const randomNumber = buffer.readUInt32BE(0);
  const fourRandomDigits = randomNumber.toString().substring(0, 6);
  return `${sourceIdentifier}${dateTime}${fourRandomDigits}`;
};

module.exports = { generateId };
