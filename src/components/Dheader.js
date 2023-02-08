import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import './dashboard.css';

export const Dheader = () => {
  const navigate = useNavigate();
  const {transactions} = useContext(GlobalContext);
  const name = localStorage.getItem('name');
  const amount = transactions.map(transaction=>transaction.amount);
  const total = amount.reduce((acc,item)=>(acc+=item),0).toFixed(2);
  const income = amount
  .filter(item=>item>0)
  .reduce((acc,item)=>(acc+=item),0)
  .toFixed(2);
  const expense= (amount
  .filter(item=>item<0)
  .reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
  function btnClicked(e){
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <>
    <div className="b-row1">
        <div className='b-logo'>
        <h1><span className='b-box'>ET</span></h1>
        </div>
        <div className='b-items'>
        <p className="b-txt">Hi {name}</p>
        <button onClick={(e)=>{
            btnClicked(e);
        }} className="b-btn">Logout</button>
        </div>
    </div>
    <div className="b-row2">
        <div className="b-header">
        <p className="b-txt1">Your Balance</p>
        <p className="b-txt2">${total}</p>
        </div>
    </div>
    <div className="b-row3">
        <div className="b-area">
        <div className="b-income">
            <div className="i-header">
            <p className="b-txt5">Income</p>
            <p className="b-txt3">${income}</p>
            </div>
        </div>
        <div className="b-expense">
            <div className="e-header">
            <p className="b-txt5">Expense</p>
            <p className="b-txt4">${expense}</p>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
