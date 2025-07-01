const sendRes = (res, statusCode, statusMessage = '', data = null) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ statusMessage, statusCode, data }));
};

const sendErr = (res, statusCode, statusMessage = '', error) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ statusMessage, statusCode, error }));
};

module.exports = {
  sendRes,
  sendErr,
};
