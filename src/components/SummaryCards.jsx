
import React from "react";
import "./SummaryCard.css";

export default function SummaryCards({ expenses }) {

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);

    return acc;
  }, {});

  return (
    <div className="summary-container">

      <div className="summary-stats">

        <div className="summary-card total-card">
          <h3>Total Spending</h3>
          <h2>₹{total.toFixed(2)}</h2>
        </div>

        <div className="summary-card transaction-card">
          <h3>Total Transactions</h3>
          <h2>{expenses.length}</h2>
        </div>

      </div>

      <div className="category-breakdown">

        <h3>Category Wise Breakdown</h3>

        {Object.entries(categoryTotals).length === 0 ? (
          <p className="no-categories">
            No expenses to display
          </p>
        ) : (
          Object.entries(categoryTotals).map(
            ([category, amount]) => {

              const percentage =
                total > 0 ? (amount / total) * 100 : 0;

              return (
                <div className="category-item" key={category}>

                  <div className="category-info">
                    <span className="category-name">
                      {category}
                    </span>

                    <span className="category-amount">
                      ₹{amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                </div>
              );
            }
          )
        )}

      </div>

    </div>
  );
}
