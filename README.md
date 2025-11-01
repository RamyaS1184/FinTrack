# FinTrack - Personal Budget Tracker

FinTrack is a responsive and modern web-based personal finance manager. It allows users to set a monthly budget, track their expenses, and visualize their spending habits through an interactive pie chart. The application is built with vanilla JavaScript, Tailwind CSS, and Chart.js, and it uses `localStorage` to persist data in the browser.

This project includes a stylish landing page (`home.html`) and the main budget tracker application (`index.html`).

---

## ✨ Features

* **Set Monthly Budget:** Define your total budget to track against.
* **Add Expenses:** Easily record transactions with amount, description, category, and date.
* **Dynamic Summary:** Instantly see your total budget, total spent, and remaining balance.
* **Visual Feedback:** The remaining balance automatically turns red when it falls below ₹500.
* **Expense Breakdown:** An interactive pie chart (using **Chart.js**) shows your spending distribution by category (Food, Rent, Utilities, Transport, Others).
* **Expense History:** View a clean table of all your expenses, sorted by date (newest first).
* **Delete Expenses:** Remove any expense entry with a single click.
* **Data Persistence:** Your budget and expenses are saved in the browser's `localStorage`, so your data is always there when you return.
* **Fully Responsive:** A clean, mobile-friendly interface built with **Tailwind CSS**.

---

## 🛠️ Technologies Used

* **HTML5:** For the application structure.
* **CSS3 :** For all styling and the responsive, utility-first design.
* **Vanilla JavaScript (ES6+):** For all application logic, DOM manipulation, and event handling.
* **Chart.js:** For the interactive and beautiful pie chart visualization.
* **Font Awesome:** For icons (wallet, trash bin, etc.).
* **Browser `localStorage`:** For persisting user data (budget and expenses).

---

## 🏁 Getting Started

To run this project locally, simply follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/fintrack-budget-tracker.git](https://github.com/your-username/fintrack-budget-tracker.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd fintrack-budget-tracker
    ```

3.  **Open the application:**
    You can open the `index.html` or `home.html` file directly in your web browser.

    For the best experience (as recommended by the `.vscode/settings.json` file), serve the project with a local server. If you use Visual Studio Code, you can use the [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension:
    * Right-click on `index.html`.
    * Select "Open with Live Server".

---

## 💡 How to Use

1.  **Open the App:** Launch the `index.html` file.
2.  **Set Your Budget:** In the "Set Monthly Budget" section, enter your total budget amount and click "Set Budget".
3.  **Add an Expense:** Fill in the "Amount", "Description", "Category", and "Date" fields in the "Add Expense" form and click "Add Expense".
4.  **Track Your Spending:** Your "Budget Summary" (Budget, Spent, Remaining), the "Expense Breakdown" chart, and the "Recent Expenses" table will all update automatically.
5.  **Delete an Expense:** Click the red trash can icon (`<i class="fas fa-trash"></i>`) in the "Recent Expenses" table to remove an entry.
6.  **Revisit:** Close the browser and reopen it. Your data will still be there!
