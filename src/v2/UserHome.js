import React, {useContext } from 'react';
import './v2.css';
import { GlobalContext } from '../context/GlobalState';
import Navbar from './Navbar';
import Balance from './Balance';
import Expense from './Expense';

const UserHome = () => {
  const {user,active} = useContext(GlobalContext);
  return (
    <>
    <Navbar name={user.name}/>
    {active && <Balance/>}
    {!active && <Expense/>}
    </>
  )
}

export default UserHome