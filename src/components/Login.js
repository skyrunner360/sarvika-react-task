import React,{useState} from "react";
import {
    Link
  } from "react-router-dom";

export default function Login(props) {
  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');

  // Function to handle login along with custom validations
  const handleLog=(e)=>{
      if(login(e)){
          props.userlogin(logEmail,logPass)
      }
  }
  // Login form custom validations
  function login(e) {
    var emailrex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(logEmail===''){
        alert("Email cannot be left blank");
        e.preventDefault();
        return false;
    }
    if(emailrex.test(logEmail)!==true){
        alert("Please type in a correct email address");
        e.preventDefault();
        return false;
    }
    if(logPass===''){
        alert("Please fill your Password");
        e.preventDefault();
        return false;
    }
    return true;
}  
  return (
    <div>
      <div className="mb-3">
          <h2>Login</h2>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com" onChange={(event)=>{setLogEmail(event.target.value)}}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="inputPassword" onChange={(event)=>{setLogPass(event.target.value)}}/>
        <button className="btn btn-success" onClick={handleLog}>Login</button>
      </div>
      <Link to="/signup" className="btn btn-info">Signup</Link>
    </div>
  );
}
