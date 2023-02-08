import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
export const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('token')
    },[])
    const [isLoading,setIsloading]=useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error_message1,setError1] = useState("");
    const [error_message2,setError2] = useState("");
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    function btnClicked(e){
        e.preventDefault();
        if(email==="" || password===""){
            setError1("Invalid UserName/Password");
            setError2("");
        }
        else if(!validEmail.test(email)){
            setError2("Invalid Email");
            setError1("");
        }
        else{
            setIsloading(true);
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
                setIsloading(false);
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
    <>
    {isLoading?<div className="loading">
        <PuffLoader color="#3C91E6" />
    </div>:<></>}
    <div className='login-container'>
        <form onSubmit={btnClicked}>
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
                        <button type='submit' className="log-btn">Login</button>
                        <Link to="/register"><button  className="log-btn">Register</button></Link>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}
