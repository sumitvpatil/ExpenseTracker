import React, { useEffect, useContext,useState } from 'react';
import './v2.css';
import { GlobalContext } from '../context/GlobalState';
import { APIROUTES } from '../routes/routes';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const Balance = () => {
    const navigate = useNavigate();
    const {listTransaction} = useContext(GlobalContext);
    const {transactions} = useContext(GlobalContext);
    const {user} = useContext(GlobalContext);
    const {userData} =useContext(GlobalContext);
    console.log(transactions);
    const filteredList=transactions.slice(0,6);
    const [isLoading,setIsloading]=useState(false);
    const id = localStorage.getItem('id');
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
    const [flag,setFlag] = useState(false);
    const [transactionObj,setTransactionObj] = useState(null);
    useEffect(()=>{
      setIsloading(true);
      if(localStorage.getItem('token')===null){
        navigate('/');
      }
      fetch(APIROUTES.route+'/getTransaction/'+id,{
        headers:{
          'auth-token':localStorage.getItem('token')
        }
      }).then((response)=>response.json()).then((res)=>{
        setIsloading(false);
        listTransaction(res.transactions);
      })
      fetch(APIROUTES.route+'/getUserById/'+id,{
        headers:{
          'auth-token':localStorage.getItem('token')
        }
      }).then((response)=>response.json()).then((res)=>{
        setIsloading(false);
        userData(res.user);
      })
    },[])
    const handleTransactionClick=(transaction)=>{
      setFlag(true);
      setTransactionObj(transaction)
    }
    return (
      <>
      {isLoading?<div className="loading">
          <PuffLoader color="#3C91E6" />
      </div>:<></>}
      <div className='homepage-container'>
          <div className='main-container'>
            <div className='area1'>
              <div className="balance-card">
                <div className='card-details'>
                  <p className='card-text'>AVAILABLE BALANCE</p>
                  <p className='card-amt'>{user.currency}&nbsp;{total}</p>
                  <br />
                  <p className='card-number'>XXXX-XXXX-XXXX-XXXX-XXXX</p>
                  <p className='card-name'>{name}</p>
                </div>
                <div className='logo'>
                  <p>ET</p>
                </div>
              </div>
  
              <div className='cash-flow'>
                <div className="income-card">
                  <p>⮟</p>
                  <div className='card-text'>
                    <p className='text'>INCOME</p>
                    <p className='amt'>{user.currency}&nbsp;{income}</p>
                  </div>
                </div>
                <div className="expense-card">
                  <p>⮟</p>
                  <div className='card-text'>
                    <p className='text'>EXPENSE</p>
                    <p className='amt'>{user.currency}&nbsp;{expense}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='area2'>
              <div className='transaction-container'>
                <div className='transaction-header'>
                  <p>LATEST TRANSACTIONS</p>
                </div>
                <div className="transaction-list">
                    {filteredList.map((transaction,index)=>(
                      <div key={index} onClick={()=>{handleTransactionClick(transaction)}} id={`box${index}`} className={transaction.amount<0?'red-border transaction-box':'green-border transaction-box'}>
                        <p className='box-text'>{transaction.details}</p>
                        <p></p>
                        <p className='box-amount'>{user.currency}&nbsp;{Math.abs(transaction.amount)}</p>
                      </div>
                    ))}
                </div>
                {flag && 
                  <div className='popup-container'>
                    <div className='popup'>
                      <div className='popup-header'>
                        <p onClick={()=>{setFlag(false)}}>X</p>
                      </div>
                      <div className='popup-body'>
                        <p className='popup-text'>Transaction Details&nbsp;&#128463;</p>
                        <p className='popup-value'>{transactionObj.details}</p>
                        <br />
                        <p className='popup-text'>Amount &#128176;</p>
                        <p className='popup-value'>{user.currency}&nbsp;{Math.abs(transactionObj.amount)}&nbsp;{transactionObj.amount>=0?<span className='credit'>⮟</span>:<span className='debit'>⮟</span>}</p>
                        <br />
                        <div className="date-time">
                          <div className='popup-date'>
                            <p className='popup-text'>Date&nbsp;&#128197;</p>
                            <p className='popup-value'>{transactionObj.date.substr(0,10)}</p>
                          </div>
                          <div className='popup-time'>
                            <p className='popup-text'>
                            Time&nbsp;&#128337;</p>
                            <p className='popup-value'>{transactionObj.date.substr(11,8)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
      </div>
      </>
    )
}

export default Balance