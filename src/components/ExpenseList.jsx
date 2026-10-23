
import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return (
      <div className="empty-expenses">
        <p>No Expenses Found</p>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>Transactions</h2>

      {expenses.map((expense) => (
        <div className="expense-item" key={expense.id}>

          <div className="expense-details">
            <h3>{expense.title}</h3>
            <p>
              {expense.category} • {expense.date}
            </p>
          </div>

          <strong className="expense-amount">
            ₹{Number(expense.amount).toFixed(2)}
          </strong>

          <div className="expense-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(expense)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(expense.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
