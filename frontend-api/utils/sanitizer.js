const expenseSchema = require('../models/expense.model');

const sanitizeExpenseFields = (input) => {
  const sanitized = {};

  for (const key in expenseSchema) {
    if (key in input && typeof input[key] === expenseSchema[key]) {
      sanitized[key] = input[key];
    }
  }

  return sanitized;
};

module.exports = {
  sanitizeExpenseFields,
};
