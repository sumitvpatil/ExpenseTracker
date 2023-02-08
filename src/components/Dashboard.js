/*eslint-disable*/

import React, { useContext, useEffect } from 'react'
import './dashboard.css';
import { Dheader } from './Dheader';
import { Dadd } from './Dadd';
import { Dlist } from './Dlist';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const {listTransaction} = useContext(GlobalContext);
  const id = localStorage.getItem('id');
  useEffect(()=>{
    if(localStorage.getItem('token')===null){
      navigate('/');
    }
    fetch('https://et-server-r0g6.onrender.com/tracker/getTransaction/'+id).then((response)=>response.json()).then((res)=>{
      listTransaction(res.transactions);
    })
  },[])
  return (
    <div className="dashboard">
      <div className="balance">
        <Dheader/>
      </div>
      <div className="transaction">


        <div className="add">
          <Dadd/>
        </div>


        <div className="list">
          <Dlist/>
        </div>
      </div>
    </div>
  )
}
