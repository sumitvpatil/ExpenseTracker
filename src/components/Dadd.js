import React, { useContext, useState } from 'react';
import './dashboard.css';

import {GlobalContext} from '../context/GlobalState';
var income_radio=true;
var expense_radio=false;
export const Dadd = () => {
  const [text,setText] = useState('');
  const [amount,setAmount] = useState('');
  const {addTransaction} = useContext(GlobalContext);

  function btnClicked(e){
    var flag=1;
    if(text==='' || amount===''){
      return;
    }
    console.log(income_radio);
    console.log(expense_radio);
    if(expense_radio===true && income_radio===false){
      flag=-1;
    }
    console.log(amount);
    const newTransaction={
      user_id:localStorage.getItem('id'),
      id: Math.floor(Math.random()*100000000),
      details:text,
      amount:amount*flag
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    };
    fetch('http://localhost:4000/tracker/addTransaction',requestOptions).then((response)=>response.json()).then((res)=>console.log(res));
    addTransaction(newTransaction);
  }

  function Income(e){
    income_radio=true;
    expense_radio=false;
  }
  function Expense(){
    console.log("E");
    income_radio=false;
    expense_radio=true;
  }
  return (
    <>
        <div className="l-header">
            <p className="b-txt5">Add Transaction</p>
          </div>

          <div className="t-field1">
            <div className="t-radio">
              <span>
                <input onClick={(e)=>Income()} defaultChecked className='r-btn1' type="radio" name='type'/>
              </span>
              <span>
                <input onClick={(e)=>Expense()} className='r-btn2' type="radio" name='type'/>
              </span>
            </div>
            <div className="t-field">
              <input value={text} onChange={(e)=>{setText(e.target.value)}} className='t-input1' type="text" placeholder='Enter Transaction Details'/>
            </div>
          </div>

          <div className="t-field2">
            <input value={amount} onChange={(e)=>{setAmount(e.target.value)}} className='t-input2' type="number" placeholder='Enter Transaction Amount'/>
          </div>

          <div className="t-btn">
            <button onClick={(e)=>{
              btnClicked(e)
            }} className='add-btn'>Add Transaction</button>
          </div>
    </>
  )
}