import React, { useState } from 'react'
import "./ExpenseForm.css"
const ExpenseForm = (
    {
        onSave,initialExpense,onCancel
    }
) => {
    const [title,setTitle]=useState(initialExpense?.title??"");
    const [category,setCategory]=useState(initialExpense?.category??"Food");
    const [amount,setAmount]=useState(initialExpense?.amount??"");
    const [date,setDate]=useState(initialExpense?.date??new Date().toLocaleDateString("en-CA"));
    const categories=[
        "Food",
        "Travel",
        "Shopping",
        "bills",
        "Entertainment",
        "others"
    ]
    function handleSubmit(e){
         e.preventDefault();
         if(!title.trim()|| Number(amount)<=0 || !date){
            return;
         }
         onSave({
            title:title.trim(),
            amount:Number(amount),
            category,
            date
         })
    }

return (
  <div className="expense-container">
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{initialExpense?"Edit Expense" :"Add Expense"}</h2>

      <input
        placeholder="Expense Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        min="1"
        step="1"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        {
            categories.map(x=>(
                <option key={x} value={x}>{x}</option>
            ))
        }
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <button type="submit">{initialExpense ? "UpdateExpense":"Add Expense"}</button>
      {initialExpense && (<button type="button" onClick={onCancel}>
        Cancel
      </button>)}
    </form>
  </div>
);

}

export default ExpenseForm