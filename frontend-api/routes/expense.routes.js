const {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpenseById,
  deleteExpenseById,
} = require('../controllers/expense.controller');

const { sendRes, sendErr } = require('../utils/response-handler');
const validateExpense = require('../utils/validator');
const { sanitizeExpenseFields } = require('../utils/sanitizer');

const getExpenses = async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    sendRes(res, 200, 'success', expenses);
  } catch (error) {
    sendErr(res, 500, 'Internal Server Error', error);
  }
};

const getExpense = async (req, res, expenseId) => {
  try {
    const expense = await getExpenseById(expenseId);
    if (expense) {
      sendRes(res, 200, 'success', expense);
    } else {
      sendRes(res, 404, 'Expense not found');
    }
  } catch (error) {
    sendErr(res, 500, 'Internal Server Error', error);
  }
};

const createExpense = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', async () => {
    try {
      const newExpense = JSON.parse(body);
      const sanitizedExpense = sanitizeExpenseFields(newExpense);
      const { isValid, errors } = validateExpense(sanitizedExpense);
      if (!isValid) {
        return sendErr(res, 400, 'Validation Error', errors);
      }
      const addedExpense = await addExpense(sanitizedExpense);
      sendRes(res, 201, 'success', addedExpense);
    } catch (error) {
      sendErr(res, 500, 'Internal Server Error', error);
    }
  });
};

const updateExpense = async (req, res, expenseId) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', async () => {
    try {
      const updatedData = JSON.parse(body);
      const sanitizedExpense = sanitizeExpenseFields(updatedData);
      const { isValid, errors } = validateExpense(sanitizedExpense);
      if (!isValid) {
        return sendErr(res, 400, 'Validation Error', errors);
      }

      const updatedExpense = await updateExpenseById(
        expenseId,
        sanitizedExpense
      );
      if (updatedExpense) {
        sendRes(res, 200, 'success', updatedExpense);
      } else {
        sendRes(res, 404, 'Expense not found');
      }
    } catch (error) {
      sendErr(res, 500, 'Internal Server Error', error);
    }
  });
};

const deleteExpense = async (req, res, expenseId) => {
  try {
    const deletedExpense = await deleteExpenseById(expenseId);
    if (deletedExpense) {
      sendRes(res, 204);
    } else {
      sendRes(res, 404, 'Expense not found');
    }
  } catch (error) {
    sendErr(res, 500, 'Internal Server Error', error);
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
