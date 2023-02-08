import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Dtransaction = ({transaction}) => {
  const sign = transaction.amount<0?'-':'+';
  const {deleteTransaction}=useContext(GlobalContext);
  function btnClicked(id){
    deleteTransaction(id);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://et-server-r0g6.onrender.com/tracker/delete/'+id,requestOptions).then((response)=>response.json()).then((res)=>console.log(res));
  }
  return (
    <li className={transaction.amount<0?'minus':'plus'}>
        {transaction.details}<span>{sign}${Math.abs(transaction.amount)}</span><button         className="delete-btn" onClick={()=>btnClicked(transaction.id)}>x</button>
    </li>
  )
}
