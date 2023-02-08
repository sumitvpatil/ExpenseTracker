import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
export const Homepage = () => {
  return (
    <div className='main-div'>
      <div className="col1">
        <h1 className='header'><span className='box'>ET</span></h1>
        <div className="text">
          <p className='text-header'>Expense Tracker</p>
          <br/>
          <p>An easy way to manage all your expenses at a single place!!</p>
        </div>
      </div>
      <div className="col2">
        <div className="row1">
          <h1 className='row-header'>$ ₹ €</h1>
        </div>
        <div className="row2"></div>
        <div className="row3">
          <Link to='/login'><button className='btn'>Get Started</button></Link>
        </div>
      </div>
    </div>
  );
}
