import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Homepage } from './components/Homepage';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { GlobalProvider } from './context/GlobalState';
import UserHome from './v2/UserHome';
import Expense from './v2/Expense';



function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        {/* <Route path='/dashboard' element={<UserHome/>}></Route>
        <Route path='/expense' element={<Expense/>}></Route> */}
      </Routes>
    </GlobalProvider>
  );
}

export default App;
