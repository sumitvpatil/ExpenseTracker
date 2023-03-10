/*eslint-disable*/

import React, { useState,useContext, useEffect } from 'react'
import './dashboard.css';
import { Dheader } from './Dheader';
import { Dadd } from './Dadd';
import { Dlist } from './Dlist';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading,setIsloading]=useState(false);
  const {listTransaction} = useContext(GlobalContext);
  const id = localStorage.getItem('id');
  useEffect(()=>{
    setIsloading(true);
    if(localStorage.getItem('token')===null){
      navigate('/');
    }
    fetch('https://et-server-r0g6.onrender.com/tracker/getTransaction/'+id).then((response)=>response.json()).then((res)=>{
      setIsloading(false);
      listTransaction(res.transactions);
    })
  },[])
  return (
    <>
    {isLoading?<div className="loading">
        <PuffLoader color="#3C91E6" />
    </div>:<></>}
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
    </>
  )
}
