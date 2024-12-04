const { expenses } = require('../models/expenseModel');

const addExpense = (req, res) => {
    const { category, amount, date } = req.body;
    // Validation
    if (!category || amount <= 0 || !date) {
        return res.status(400).json({ status: "fail", error: "Invalid data" });
    }
    expenses.push({ category, amount, date });
    res.json({ status: "success", data: { category, amount, date } });
};

module.exports = { addExpense };

const getExpenses = (req, res) => {
    const { category, startDate, endDate } = req.query;

    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === category);
    }
    if (startDate && endDate) {
        filteredExpenses = filteredExpenses.filter(exp =>
            new Date(exp.date) >= new Date(startDate) && new Date(exp.date) <= new Date(endDate)
        );
    }

    res.json({ status: "success", data: filteredExpenses });
};

module.exports = { addExpense, getExpenses };

const analyzeSpending = (req, res) => {
    const spendingByCategory = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ status: "success", data: { spendingByCategory, totalSpending } });
};

module.exports = { addExpense, getExpenses, analyzeSpending };
