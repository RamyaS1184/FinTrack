// DOM Elements
const budgetAmountInput = document.getElementById('budgetAmount');
const setBudgetBtn = document.getElementById('setBudget');
const budgetError = document.getElementById('budgetError');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseDescriptionInput = document.getElementById('expenseDescription');
const expenseCategoryInput = document.getElementById('expenseCategory');
const expenseDateInput = document.getElementById('expenseDate');
const addExpenseBtn = document.getElementById('addExpense');
const expenseError = document.getElementById('expenseError');
const totalBudgetDisplay = document.getElementById('totalBudget');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const remainingBalanceDisplay = document.getElementById('remainingBalance');
const expenseList = document.getElementById('expenseList');
const currentDateDisplay = document.getElementById('currentDate');

// Chart setup
const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart;

// App state
let budget = 0;
let expenses = [];
const CATEGORIES = ['Food', 'Rent', 'Utilities', 'Transport', 'Others'];

// Initialize the app
function init() {
    // Set current date
    const today = new Date();
    currentDateDisplay.textContent = today.toLocaleDateString();
    expenseDateInput.valueAsDate = today;

    // Load data from localStorage
    loadData();

    // Set up event listeners
    setBudgetBtn.addEventListener('click', setBudget);
    addExpenseBtn.addEventListener('click', addExpense);

    // Initialize chart
    initChart();

    // Update UI
    updateDisplay();
}

// Set budget function
function setBudget() {
    const amount = parseFloat(budgetAmountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        budgetError.classList.remove('hidden');
        return;
    }

    budgetError.classList.add('hidden');
    budget = amount;
    saveData();
    updateDisplay();
}

// Add expense function
function addExpense() {
    const amount = parseFloat(expenseAmountInput.value);
    const description = expenseDescriptionInput.value.trim();
    const category = expenseCategoryInput.value;
    const date = expenseDateInput.value;

    // Validate inputs
    if (isNaN(amount) || amount <= 0 || !description || !category || !date) {
        expenseError.classList.remove('hidden');
        return;
    }

    expenseError.classList.add('hidden');

    // Add to expenses array
    expenses.push({
        id: Date.now(),
        amount,
        description,
        category,
        date
    });

    // Clear form
    expenseAmountInput.value = '';
    expenseDescriptionInput.value = '';
    expenseCategoryInput.value = '';
    expenseDateInput.valueAsDate = new Date();

    // Save and update
    saveData();
    updateDisplay();
}

// Delete expense function
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveData();
    updateDisplay();
}

// Calculate totals
function calculateTotals() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBalance = budget - totalExpenses;
    return { totalExpenses, remainingBalance };
}

// Update UI display
function updateDisplay() {
    const { totalExpenses, remainingBalance } = calculateTotals();

    // Update summary
    totalBudgetDisplay.textContent = `₹${budget.toFixed(2)}`;
    totalExpensesDisplay.textContent = `₹${totalExpenses.toFixed(2)}`;
    remainingBalanceDisplay.textContent = `₹${remainingBalance.toFixed(2)}`;

    // Visual feedback for budget status
    if (remainingBalance < 500) {
        remainingBalanceDisplay.classList.add('text-red-500');
        remainingBalanceDisplay.classList.remove('text-green-500');
    } else {
        remainingBalanceDisplay.classList.add('text-green-500');
        remainingBalanceDisplay.classList.remove('text-red-500');
    }

    // Update expense list
    renderExpenseList();

    // Update chart
    updateChart();
}

// Render expense list
function renderExpenseList() {
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No expenses added yet
            </td>
        `;
        expenseList.appendChild(row);
        return;
    }

    // Sort by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedExpenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${new Date(expense.date).toLocaleDateString()}</td>
            <td class="px-6 py-4">${expense.description}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${getCategoryColor(expense.category)}">
                    ${expense.category}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">₹${expense.amount.toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="deleteExpense(${expense.id})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        'Food': 'bg-cyan-100 text-cyan-800',
        'Rent': 'bg-emerald-100 text-emerald-800',
        'Utilities': 'bg-blue-100 text-blue-800',
        'Transport': 'bg-teal-100 text-teal-800',
        'Others': 'bg-slate-100 text-slate-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
}

// Initialize chart
function initChart() {
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: CATEGORIES,
            datasets: [{
                data: CATEGORIES.map(cat => 0),
                                backgroundColor: [
                    'rgba(6, 182, 212, 0.7)',   // cyan-400 (Food)
                    'rgba(20, 184, 166, 0.7)',  // teal-400 (Rent)
                    'rgba(245, 158, 11, 0.7)',  // blue-400 (Utilities)
                    'rgba(16, 185, 129, 0.7)',  // emerald-400 (Transport)
                    'rgba(100, 116, 139, 0.7)'  // slate-400 (Others)
                ],

                borderColor: [
                    'rgba(6, 182, 212, 1)',
                    'rgba(8, 145, 178, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(5, 150, 105, 1)',
                    'rgba(20, 184, 166, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                        return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update chart data
function updateChart() {
    const categoryTotals = CATEGORIES.map(category => {
        return expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    });

    expenseChart.data.datasets[0].data = categoryTotals;
    expenseChart.update();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('budget', budget.toString());
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load data from localStorage
function loadData() {
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = localStorage.getItem('expenses');

    if (savedBudget) {
        budget = parseFloat(savedBudget);
        budgetAmountInput.value = budget;
    }

    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);