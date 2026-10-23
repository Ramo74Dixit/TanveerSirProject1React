import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryCards from "./components/SummaryCards";
function getCurrentMonth() {
  const now = new Date();
  return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
}
function loadExpenses() {
  try {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const App = () => {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [month, setMonth] = useState(getCurrentMonth);
  const [editingExpense, setEditingExpense] = useState(null);
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  function handleSave(data) {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingExpense.id ? { ...expense, ...data } : expense,
        ),
      );
      setEditingExpense(null);
    } else {
      const newExpense = { id: crypto.randomUUID(), ...data };
      setExpenses((prev) => [...prev, newExpense]);
    }
  }

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
  }
  const filteredExpenses = expenses.filter((expense) =>
    expense.date.startsWith(month),
  );
  return (
    <div>
      <h1 style={{color:"white"}}>Expense Tracker</h1>
      <SummaryCards expenses={filteredExpenses} />
      <ExpenseForm
        key={editingExpense?.id ?? "new"}
        initialExpense={editingExpense}
        onSave={handleSave}
        onCancel={() => setEditingExpense(null)}
      />
      <div>
        <label htmlFor="month">Filter By Month</label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <ExpenseList
        expenses={filteredExpenses}
        onEdit={setEditingExpense}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
