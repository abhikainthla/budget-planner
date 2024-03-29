import React, { useEffect, useState } from 'react'

function Planner() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState('Food');
    const [amount, setAmmout] = useState(1);
    const [remaining, setRemaining] = useState(5000);
    const [spent, setSpent] = useState(0);
    const [budget, setBudget] = useState(5000)
    const [addAmount, setAddAmount] = useState(0);

    const Obj = new Date();
    let day = ("0" + Obj.getDate()).slice(-2),
        month = ("0" + (Obj.getMonth() + 1)).slice(-2),
        year = Obj.getFullYear(),
        createdAt = `${day}/${month}/${year}`;

        useEffect(() => {   
            let data = localStorage.getItem("data");
            console.log(data);
            let totalAmount;
            if (data) {
                let parsedData = JSON.parse(data);
                setExpenses(parsedData);
                 totalAmount = parsedData.reduce((acc, curr) => acc + curr.amount, 0);
                setSpent(totalAmount);
                setRemaining(budget - totalAmount);
            } else {
                localStorage.setItem("data", JSON.stringify([]));
                setExpenses([]);
            }
        
            const savedBudget = localStorage.getItem("money");
            if (savedBudget) {
                const parsedBudget = JSON.parse(savedBudget).budget;
                console.log(parsedBudget);
                setBudget(parsedBudget);
                setRemaining(parsedBudget - totalAmount); 
            }
        }, []); 
        
        const addExpense = () =>{
            const newExpense = { category, amount, createdAt};
            const money = { budget: budget }; 
            setRemaining(remaining - amount);
            setSpent(spent + amount);
            setExpenses([...expenses, newExpense]);
            localStorage.setItem("data", JSON.stringify([...expenses, newExpense]));
            localStorage.setItem("money", JSON.stringify(money)); 
        }
        
function handleAmmount(e){
    setAmmout(parseInt(e.target.value));

}

const deleteItem  = (index) => {
    const newArr = [...expenses];
    const deletedAmount = newArr[index].amount;
    newArr.splice(index, 1);
    setExpenses(newArr);
    setRemaining(remaining + deletedAmount);
    setSpent(spent - deletedAmount);
    localStorage.setItem("data", JSON.stringify(newArr));    
};

function handleAdd(){
    const addedBudget = budget + addAmount;
    setBudget(addedBudget);
    setRemaining(remaining + addAmount);
    setAddAmount(0);
}

function handleReset(){
    localStorage.clear();
    window.location.reload()
}
  return (
    <div className='container'>
        <div className='heading'><h1>My Budget Planner</h1></div>
        <div className='planner'>
            <div className='budget'>Budget: Rs.{budget}</div>
            <div className='remaining'>Remaining: Rs.{remaining}</div>
            <div className='spent'>Spant so far: Rs.{spent}</div>
        </div>
        <div className='input-fields'>
            <label>Add Money:</label>
            <input type='number' value={addAmount} onChange={e => setAddAmount(parseInt(e.target.value))}  />
            <button onClick={handleAdd}>Add</button>
        </div>
        <div className='input-fields'>
            <label htmlFor="category">Category:</label>
            <select id="category" name='category' value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Shoping">Shoping</option>
                <option value="Bills">Bills</option>
                <option value="Others">Others</option>
            </select>
            <br/><br/>
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name='amount' min="1" value={amount} onChange={handleAmmount}/>
            <button onClick={addExpense}>Add Expense</button>
        </div>
        <table>
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount(Rs.)</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody id='expenses'>
          {expenses.map((item, index) => (
                        <tr key={index}>
                            <td>{item.createdAt.toLocaleString()}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td><button className='delete-btn' onClick={() => deleteItem(index)}>Delete</button></td>
                        </tr>
                    ))}
          </tbody>
      </table>
      <div className='reset'>
      <hr/>

      <button className='reset-btn' onClick={handleReset}>Reset</button>
      </div>


    </div>
  )
}

export default Planner