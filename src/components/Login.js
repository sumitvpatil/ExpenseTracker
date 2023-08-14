import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { APIROUTES } from '../routes/routes';
export const Login = () => {
    const navigate=useNavigate();
    const handleLoginApi=(response)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
            { 
                token:response.credential
            })
        };
        fetch(APIROUTES.route+'/loginGoogle',requestOptions).then((response)=>{
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
    useEffect(()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('token')
    },[])

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:"994239778897-qed7j3c4duls2vsten5eaqj5vsi13na0.apps.googleusercontent.com",
            callback:handleLoginApi
        })
        google.accounts.id.renderButton(
            document.getElementById("LoginButton"),
            {
                theme:"outline",
                size:"large",
                width:"300px",
                type:"standard"
            }
        )
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
            fetch(APIROUTES.route+'/login',requestOptions).then((response)=>{
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
                <div className="google_btn">
                <div id="LoginButton"></div>
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
