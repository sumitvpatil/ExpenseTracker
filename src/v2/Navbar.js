import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { APIROUTES } from '../routes/routes';
import { PuffLoader } from 'react-spinners';

const Navbar = (props) => {
  const navigate = useNavigate();
  const name = props.name;
  const {user,active} = useContext(GlobalContext);
  const {userData,updateActive} = useContext(GlobalContext);
  const [profileFlag,setProfileFlag] = useState(false);
  const [settingsFlag,setSettingsFlag] = useState(false);
  const [passwordFlag,setPasswordFlag] = useState(false);
  const [userName,setUserName] = useState(user.name);
  const [userEmail,setUserEmail] = useState(user.email);
  const [userContact,setUserContact] = useState(user.contact);
  const [userCurrency,setUserCurrency] = useState(user.currency);
  const [pass,setPass] = useState("");
  const [confPass,setConfPass] =useState("");
  const [isLoading,setIsloading] = useState(false);
  const [errorText,setErrorText] = useState("");
  const handleClose=()=>{
    setUserName(user.name);
    setUserEmail(user.email);
    setUserContact(user.contact);
    setUserCurrency(user.currency)
    setSettingsFlag(false);
    setPasswordFlag(false);
  }
  const handleOptionClick=(opt)=>{
    console.log(opt,active);
    if(opt==='opt1'){
        if(active){
            return;
        }
        else{
            document.getElementById('opt1').classList.add('active')
            document.getElementById('opt2').classList.remove('active')
            updateActive(true);
        }
    }
    else{
        if(active){
            document.getElementById('opt2').classList.add('active')
            document.getElementById('opt1').classList.remove('active')
            updateActive(false);
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

  const handleSave=()=>{
    if(userName!=="" && userEmail!=="" && userContact!=="" && userCurrency!==""){
        setIsloading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(
            { 
                name:userName,
                email:userEmail,
                contact:userContact,
                currency:userCurrency
            })
        };
        fetch(APIROUTES.route+`/updateUser/${user.id}`,requestOptions).then((response)=>{
            response.json().then((json)=>{
                userData(json.user);
                setIsloading(false);
                setSettingsFlag(false);
            })
        });
    }
    else{
        if(userName===""){
            document.getElementById('name').style.cssText="border-bottom:2px solid red";
        }

        if(userEmail===""){
            document.getElementById('email').style.cssText="border-bottom:2px solid red";
        }

        if(userContact===""){
            document.getElementById('contact').style.cssText="border-bottom:2px solid red";
        }
    }
  }

  const handleNewPassword=()=>{
    if(pass!==confPass){
        setErrorText("Password did not match")
    }
    else if(pass.length<6){
        setErrorText("Minimum password length must be 6")
    }
    else{
        setIsloading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(
            { 
                password:pass
            })
        };
        fetch(APIROUTES.route+`/updatePassword/${user.id}`,requestOptions).then((response)=>{
            response.json().then((json)=>{
                console.log(json);
                userData(json.user);
                setIsloading(false);
                setPasswordFlag(false);
            })
        });
    }
  }

  const handleChangePassword=()=>{
    if(pass==="" || confPass===""){
        setErrorText("Invalid Password");
    }
    else if(pass.length<6 || confPass.length<6){
        setErrorText("Minimum password length must be 6")
    }
    else{
        setIsloading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(
            { 
                oldPass:pass,
                newPass:confPass
            })
        };
        fetch(APIROUTES.route+`/changePassword/${user.id}`,requestOptions).then((response)=>{
            const status = (response.status);
            if(status===400){
                setErrorText("Password did not match");
                setIsloading(false);
            }
            else if(status===500){
                setErrorText("Something went wrong");
                setIsloading(false);
            }
            else{
                response.json().then((json)=>{
                    userData(json.user);
                    setIsloading(false);
                    setPass("");
                    setConfPass("")
                    setErrorText("")
                    setPasswordFlag(false);
                })
            }
        });
    }
  }

  return (
    <>
    {isLoading?<div className="loading">
        <PuffLoader color="#3C91E6" />
    </div>:<></>}
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
                <h1 className='body-header'>ACCOUNT SETTINGS</h1>
                <p className='body-close' onClick={()=>{handleClose()}}>X</p>
            </div>
            <div className="popup-body">
                <div className="body-ele">
                    <p>NAME</p>
                    <input id="name" type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className="body-ele">
                    <p>EMAIL</p>
                    <input id="email" type="text" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}/>
                </div>
                <div className="body-ele">
                    <p>CONTACT</p>
                    <input id="contact" type="number" value={userContact} onChange={(e)=>{setUserContact(e.target.value)}} placeholder={userContact!==""?user.contact:"Enter contact number"}/>
                </div>
                <div className="body-ele">
                    <p>CURRENCY</p>
                    <select value={userCurrency} onChange={(e)=>{setUserCurrency(e.target.value)}}>
                        <option value="₹">₹&nbsp;Rupee</option>
                        <option value="$">$&nbsp;Dollar</option>
                        <option value="€">€&nbsp;Euro</option>
                        <option value="£">£&nbsp;Pound</option>
                    </select>
                </div>
                <div className="button-container">
                    <button className='popup-btn' onClick={()=>{handleSave()}}>Save and Close</button>
                    <button className='popup-btn' onClick={()=>{setPass("");setConfPass("");setErrorText("");setSettingsFlag(false);setPasswordFlag(true)}}>Change Password</button>
                </div>
            </div>
        </div>
    </div>}

    {passwordFlag &&
    <div className='settings-container'>
        <div className="password-box">
            {user.password===""?
            (<div className='new-password'>
                <div className='popup-header'>
                    <h1 className='body-header'>SET NEW PASSWORD</h1>
                    <p className='body-close' onClick={()=>{handleClose()}}>X</p>
                </div>
                <div className="popup-body">
                    <div className="password-body">
                        <div className="body-ele">
                            <p>PASSWORD</p>
                            <input id="pass" type="password" value={pass} onChange={(e)=>{setErrorText("");setPass(e.target.value)}}/>
                        </div>
                        <div className="body-ele">
                            <p>CONFIRM PASSWORD</p>
                            <input id="confpass" type="password" value={confPass} onChange={(e)=>{setErrorText("");setConfPass(e.target.value)}}/>
                        </div>
                        <p className='error'>{errorText}</p>
                        <div className="button-container">
                            <button className='popup-btn' onClick={()=>{handleNewPassword()}}>Save and Close</button>
                        </div>
                    </div>
                 </div>
            </div>)
            :
            (<div className='new-password'>
            <div className='popup-header'>
                <h1 className='body-header'>CHANGE PASSWORD</h1>
                <p className='body-close' onClick={()=>{handleClose()}}>X</p>
            </div>
            <div className="popup-body">
                <div className="password-body">
                    <div className="body-ele">
                        <p>CURRENT PASSWORD</p>
                        <input id="pass" type="password" value={pass} onChange={(e)=>{setErrorText("");setPass(e.target.value)}}/>
                    </div>
                    <div className="body-ele">
                        <p>NEW PASSWORD</p>
                        <input id="confpass" type="password" value={confPass} onChange={(e)=>{setErrorText("");setConfPass(e.target.value)}}/>
                    </div>
                    <p className='error'>{errorText}</p>
                    <div className="button-container">
                        <button className='popup-btn' onClick={()=>{handleChangePassword()}}>Save and Close</button>
                    </div>
                </div>
             </div>
        </div>)
        }
        </div>
    </div>}
    </>
  )
}

export default Navbar