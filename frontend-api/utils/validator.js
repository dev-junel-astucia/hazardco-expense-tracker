const isValidISODate = (dateStr) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString() === dateStr;
};

const validateExpense = (expense) => {
  const errors = {};

  if (!expense.title || typeof expense.title !== 'string') {
    errors.title = 'Title is required and must be a string.';
  }

  if (typeof expense.amount !== 'number' || isNaN(expense.amount)) {
    errors.amount = 'Amount is required and must be a valid number.';
  }

  if (!expense.category || typeof expense.category !== 'string') {
    errors.category = 'Category is required and must be a string.';
  }

  if (!expense.date || !isValidISODate(expense.date)) {
    errors.date = 'Date must be a valid ISO date string.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = validateExpense;
