const { generateId } = require('../utils/generator');

// Initial data in-memory
let expenseObj = [
  {
    id: '1',
    title: 'Office Supplies',
    amount: 150,
    category: 'Office',
    date: '1970-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Travel Expenses',
    amount: 200,
    category: 'Travel',
    date: '1970-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Client Lunch',
    amount: 75,
    category: 'Food',
    date: '1970-01-01T00:00:00.000Z',
  },
];

// get all expenses
const getAllExpenses = async () => {
  return Promise.resolve(expenseObj);
};

// get expense by id
const getExpenseById = async (id) => {
  const expense = expenseObj.find((item) => item.id === id);
  return Promise.resolve(expense);
};

// create new expense
const addExpense = async (expense) => {
  const newId = generateId('hcexp-');
  expense.id = newId;
  expenseObj.push(expense);
  return Promise.resolve(expense);
};

// update expense by id
const updateExpenseById = async (id, updatedData) => {
  const index = expenseObj.findIndex((i) => i.id === id);
  if (index !== -1) {
    expenseObj[index] = { ...expenseObj[index], ...updatedData };
    return Promise.resolve(expenseObj[index]);
  }
  return Promise.resolve(null);
};

// delete expense by id
const deleteExpenseById = async (id) => {
  const index = expenseObj.findIndex((i) => i.id === id);
  if (index !== -1) {
    const deletedExpense = expenseObj.splice(index, 1);
    return Promise.resolve(deletedExpense);
  }
  return Promise.resolve(null);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpenseById,
  deleteExpenseById,
};
