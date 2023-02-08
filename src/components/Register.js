import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCpassword] = useState("");
  const [error_message1,setError1] = useState("");
  const [error_message2,setError2] = useState("");const [error_message3,setError3] = useState("");const [error_message4,setError4] = useState("");const [error_message5,setError5] = useState("");const [error_message6,setError6] = useState("");
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  useEffect(()=>{
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token')
  },[])
  function btnClicked(e){
    if(name==="" || email==="" || contact==="" || password==="" || cpassword===""){
      setError1("Enter all Details");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
    }
    else if(!validEmail.test(email)){
      setError3("Invalid Email");
      setError2("");
      setError1("");
      setError4("");
      setError5("");
      setError6("");
    }
    else if(contact.length!==10){
      setError4("Contact number must be 10 characters long");
      setError2("");
      setError3("");
      setError1("");
      setError5("");
      setError6("");
    }
    else if(password.length<6){
      setError5("Password must be at least 6 characters long");
      setError2("");
      setError3("");
      setError4("");
      setError1("");
      setError6("");
    }
    else if(password!==cpassword){
      setError6("Password does not match");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError1("");
    }
    else{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
        { 
            name:name,
            email:email,
            contact:contact,
            password:password 
        })
      };
      fetch('https://et-server-r0g6.onrender.com/tracker/register',requestOptions).then((response)=>{
        const status = (response.status);
        if(status===400){
          setError1("User Already Exists");
          setError2("");
          setError3("");
          setError4("");
          setError5("");
          setError6("");
        }
        else if(status===500){
          setError1("User Already Exists");
          setError2("");
          setError3("");
          setError4("");
          setError5("");
          setError6("");
        }
        else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
            { 
                email:email,
                password:password 
            })
          };
          fetch('https://et-server-r0g6.onrender.com/tracker/login',requestOptions).then((response)=>{
              const status = (response.status);
              if(status===400){
                  setError1("Invalid Username/Password");
                  setError2("");
              }
              else if(status===500){
                  setError1("Something went wrong");
                  setError2("");
              }
              else{
                  response.json().then((json)=>{
                    localStorage.setItem('id',json.user.id);
                    localStorage.setItem('name',json.user.name);
                    localStorage.setItem('token',json.token);
                    navigate('/dashboard');
                  })
              }
            });
          }
      });
    }
  }
  return (
    <div className='login-container'>
        <div className="login-box">
            <div className="login-header">
                <h1>REGISTER</h1>
            </div>
            <div className="login-fields">
                <div className='error-box'>
                    <p className='error-text'>&nbsp;&nbsp;{error_message1}</p>
                </div>
                <div className="field1">
                  <input value={name} onChange={(e)=>{setName(e.target.value)}} className='log-field' type="text" placeholder='Fullname'/>
                  <p className='error-text'>&nbsp;&nbsp;{error_message2}</p>
                </div>
                <div className="field2">
                  <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='log-field' type="text" placeholder='Email'/>
                  <p className='error-text'>&nbsp;&nbsp;{error_message3}</p>
                </div>
                <div className="field2">
                  <input value={contact} onChange={(e)=>{setContact(e.target.value)}} className='log-field' type="text" placeholder='Contact'/>
                  <p className='error-text'>&nbsp;&nbsp;{error_message4}</p>
                </div>
                <div className="field1">
                  <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='log-field' type="password" placeholder='Password' />
                  <p className='error-text'>&nbsp;&nbsp;{error_message5}</p>
                </div>
                <div className="field2">
                  <input value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} className='log-field' type="password" placeholder='Confirm Password'/>
                  <p className='error-text'>&nbsp;&nbsp;{error_message6}</p>
                </div>
                <div className='login-buttons'>
                    <button onClick={(e)=>{btnClicked(e)}}  className="log-btn">Register</button>
                </div>
            </div>
        </div>
    </div>
  )
}
