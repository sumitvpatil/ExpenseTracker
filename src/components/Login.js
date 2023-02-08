import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
export const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('token')
    },[])
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error_message1,setError1] = useState("");
    const [error_message2,setError2] = useState("");
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    async function btnClicked(e){
        if(email==="" || password===""){
            setError1("Invalid UserName/Password");
            setError2("");
        }
        else if(!validEmail.test(email)){
            setError2("Invalid Email");
            setError1("");
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
            fetch('http://localhost:4000/tracker/login',requestOptions).then((response)=>{
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
    }

  return (
    <div className='login-container'>
        <div className="login-box">
            <div className="login-header">
                <h1>LOGIN</h1>
            </div>
            <div className="login-fields">
                <div className='error-box'>
                    <p className='error-text'>&nbsp;&nbsp;{error_message1}</p>
                </div>
                <div className="field1">
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='log-field' type="text" placeholder='Email'/>
                    <p className='error-text'>&nbsp;&nbsp;{error_message2}</p>
                </div>
                <div className="field2">
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='log-field' type="password" placeholder='Password' />
                </div>
                <div className='login-buttons'>
                    <button onClick={(e)=>{btnClicked(e)}} className="log-btn">Login</button>
                    <Link to="/register"><button  className="log-btn">Register</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}
