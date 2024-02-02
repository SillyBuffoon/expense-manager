import React, { useState } from "react";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Heading = () => {
    return (

        <>
            <div className="title-container">
                <h1>Expense Tracker</h1>
                <h2>Track your expenses online</h2>
            </div>
        </>
    
        )
}

const Balancecontainer = (props) => {

    return (
        <>
            <div className="balance-container">
                <h1>YOUR BALANCE</h1>
                <h1 className="moneycounter">${props.balance}</h1>
            </div>
        <div className="container">
            <div className="IncomeExpense-container">
                <div className="income">
                    <h1>Income</h1>
                    <h2>+{props.plus}</h2>
                </div>
                <Divider variant="middle" className="divider" orientation="vertical" flexItem />

                <div className="expenses">
                    <h1>Expenses</h1>
                    <h2>{props.minus}</h2>
                </div>               
            </div>
        </div>
        </>
    )
}
const Historytitle = () => {
  return (
    <>
      <h1 className="historyh1">History</h1>
      <Divider variant="middle"/>
      <br />
      <br />
    </>
  )
}
const Transaction = (props) => {
  const price = parseFloat(props.price);

  return (
      <div className={`transaction-container-${props.price > 0 ? "income" : "expense"} ${props.className}`}>
          <h1>{props.title}</h1>
          {props.price > 0 ? <h2>+{price}</h2> : <h2>{price}</h2>}
      </div>
  );
};


const Submittransaction = ({ onTransactionSubmit }, ) => {
  const [moneyvar, setmoneyvar] = useState('0');
  const [titlevar, setTitle] = useState('Transaction');
  return (
    <div className="submit-container">
      <h2>Add new Transaction</h2>
      <Divider variant="middle"></Divider>
      <div className="submit-container-form">
        <h2>Text</h2>
        <TextField className="centered-textfield" id="outlined-basic" label="Transaction" variant="outlined" value={titlevar} onChange={(e) => setTitle(e.target.value)}/>
        <h2>Amount</h2>
        <TextField className="centered-textfield" id="outlined-basic" label="Transaction" variant="outlined" value={moneyvar} onChange={(e) => setmoneyvar(e.target.value)}/>
        <br />
        <br />
        <Button variant="contained"
          onClick={() => {
            onTransactionSubmit({ title: titlevar, price: moneyvar });
            setmoneyvar('0');
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const App = () => {

  const [renderedTransactionKeys, setRenderedTransactionKeys] = useState(new Set());
  const [bal, setBal] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)

  const [transactions, setTransactions] = useState([
  ]);

  const handleTransactionSubmit = (newTransaction) => {
    if (isNaN(newTransaction.price) || newTransaction.price == 0) {
        alert('Enter a Correct Number')
    }
    else {
      setRenderedTransactionKeys((prevKeys) => new Set([...prevKeys, newTransaction.title]));
        setTransactions([newTransaction, ...transactions]);
        setBal(bal + parseFloat(newTransaction.price))
        newTransaction.price > 0 ? setIncome(income + parseFloat(newTransaction.price)) : setExpenses(expenses + parseFloat(newTransaction.price))  
    }
    
  };

  return (
    <>
      <Heading />
      <Balancecontainer balance = {bal} plus={parseFloat(income)} minus={expenses}/>
      <Historytitle />
      {transactions.map((transaction, index) => (
                index < 5 && (
                    <Transaction
                        key={transaction.title}
                        {...transaction}
                        className={renderedTransactionKeys.has(transaction.title) ? 'fade-in' : ''}
                    />
                )
            ))}
            <Submittransaction onTransactionSubmit={handleTransactionSubmit} />
        </>
    );
};


export default App;