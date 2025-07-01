const http = require('http');
const url = require('url');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('./routes/expense.routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // set cors header
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all for the mean time
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  let pathname = url.parse(req.url).pathname;
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1); // remove trailing slash
  }
  const expenseId = pathname.split('/')[3]; // get the 3rd segment of pathname

  if (pathname === '/api/expenses' && req.method === 'GET') {
    return getExpenses(req, res);
  }

  if (pathname.match(/^\/api\/expenses\/[\w-]+$/) && req.method === 'GET') {
    return getExpense(req, res, expenseId);
  }

  if (pathname === '/api/expenses' && req.method === 'POST') {
    return createExpense(req, res);
  }

  if (pathname.match(/^\/api\/expenses\/[\w-]+$/) && req.method === 'PATCH') {
    return updateExpense(req, res, expenseId);
  }

  if (pathname.match(/^\/api\/expenses\/[\w-]+$/) && req.method === 'DELETE') {
    return deleteExpense(req, res, expenseId);
  }

  res.statusCode = 404;
  res.end(
    JSON.stringify({ message: `Can't find ${pathname} on this server!` })
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
