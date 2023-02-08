import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import './dashboard.css';
import { Dtransaction } from './Dtransaction';

export const Dlist = () => {
  const {transactions} = useContext(GlobalContext);
  return (
    <>
      <div className="l-header">
          <p className="b-txt5">Transaction List</p>
      </div>
      <div className="l-content">
      <ul className="content-list">
        {transactions.map(transaction => (<Dtransaction key={transaction.id} transaction={transaction}/>))}
      </ul>
      </div>
    </>
  )
}
