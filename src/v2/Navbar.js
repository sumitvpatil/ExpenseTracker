import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [name,setName] = useState(props.name);
  const [active,setActive] = useState(true);
  const [profileFlag,setProfileFlag] = useState(false);
  const [settingsFlag,setSettingsFlag] = useState(false);
  const handleOptionClick=(opt)=>{
    if(opt==='opt1'){
        if(active){
            return;
        }
        else{
            document.getElementById('opt1').classList.add('active')
            document.getElementById('opt2').classList.remove('active')
            setActive(true);
        }
    }
    else{
        if(active){
            document.getElementById('opt2').classList.add('active')
            document.getElementById('opt1').classList.remove('active')
            setActive(false);
        }
        else{
            return;
        }
    }
  }
  const handleProfileClick=()=>{
    setProfileFlag(!profileFlag)
  }
  const logout=(e)=>{
    e.stopPropagation();
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/');
  }
  const handleSettingsClick=()=>{
    setSettingsFlag(true);
    setProfileFlag(false);
  }

  return (
    <>
    <div className='navbar'>
        <div className="navbar-logo">
            <div className='logo'>
                <p>ET</p>
            </div>
        </div>
        <div className="navbar-options">
            <p id='opt1' onClick={()=>{handleOptionClick('opt1')}} className='active balance-option'>BALANCE</p>
            <p id='opt2' onClick={()=>{handleOptionClick('opt2')}} className='expenses-option'>EXPENSE</p>
        </div>
        <div className="navbar-buttons">
            <div onClick={()=>{handleProfileClick()}}className='image-container'>
                <p>Hi&nbsp;&nbsp;{name}&nbsp;⮟</p>
            </div>
        </div>
    </div>
    <div className='body-container'>
        {profileFlag && <div className='profile-section'>
            <p onClick={()=>{handleSettingsClick()}}>Account Settings</p>
            <p onClick={(e)=>{logout(e)}}>Logout</p>
        </div>}
    </div>
    {settingsFlag &&
    <div className='settings-container'>
        <div className='settings-box'>
        <div className='popup-header'>
            <p onClick={()=>{setSettingsFlag(false)}}>X</p>
        </div>
        </div>
    </div>}
    </>
  )
}

export default Navbar