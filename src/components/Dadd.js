import React, { useContext, useState } from 'react';
import './dashboard.css';

import {GlobalContext} from '../context/GlobalState';
import { APIROUTES } from '../routes/routes';
var income_radio=true;
var expense_radio=false;
export const Dadd = () => {
  const [text,setText] = useState('');
  const [amount,setAmount] = useState('');
  const {addTransaction} = useContext(GlobalContext);
  const {transactions} = useContext(GlobalContext);

  function btnClicked(e){
    e.preventDefault();
    var flag=1;
    if(text==='' || amount===''){
      return;
    }
    if(expense_radio===true && income_radio===false){
      flag=-1;
    }
    var temp_id=localStorage.getItem('id')*100000;
    if(transactions.length!==0){
      temp_id=transactions[0].id+1;
    }
    const newTransaction={
      userId:localStorage.getItem('id'),
      _id: temp_id,
      details:text,
      amount:amount*flag
    }
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify(newTransaction)
    };
    fetch(APIROUTES.route+'/addTransaction',requestOptions);
    addTransaction(newTransaction);
    setText('');
    setAmount('');
  }

  function Income(e){
    income_radio=true;
    expense_radio=false;
  }
  function Expense(){
    income_radio=false;
    expense_radio=true;
  }
  return (
    <>
          <div className="l-header">
            <p className="b-txt5">Add Transaction</p>
          </div>
          <form className='addData' onSubmit={btnClicked}>
            <div className="t-field1">
              <div className="t-radio">
                <span>
                  <input onClick={(e)=>Income()} defaultChecked value={income_radio} className='r-btn1' type="radio" name='type'/>
                </span>
                <span>
                  <input onClick={(e)=>Expense()} className='r-btn2' value={expense_radio} type="radio" name='type'/>
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
              <button className='add-btn'>Add Transaction</button>
            </div>
          </form>
    </>
  )
}