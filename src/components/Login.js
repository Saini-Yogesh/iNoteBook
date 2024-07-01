import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [credentials,setCredentials] = useState({ email:"",password:""});
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email : credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success === true){
            // redirect and save the tokem
            localStorage.setItem('token',json.authtoken)
            navigate("/");
        } else{
            alert("invalid email and passwords")
        }
    }
    
  return (
    <>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </>
  )
}

export default Login
