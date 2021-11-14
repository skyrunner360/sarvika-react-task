import React,{useState} from 'react'
import {
    Link
  } from "react-router-dom";
export default function Signup(props) {
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [initPass, setInitPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    // Function to signup user after custom form validations
    const handleSubmit = (e) => {
        if(signup(e)){
            props.usersignup(fname,email,confirmPass);
        }
        
    }
    // Custom Form Validations
    function signup(e) {
        var emailrex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(fname===''){
            alert("First Name Cannot be left Empty");
            e.preventDefault();
            return false
        }
        if(emailrex.test(email)!==true){
            alert("Please type in a correct email address");
            e.preventDefault();
            return false
        }
        if(initPass===''||confirmPass===''){
            alert("Please Enter a Password");
            e.preventDefault();
            return false
        }
        if(initPass!==confirmPass){
            alert("Confirm Password does not match. Please Recheck");
            e.preventDefault();
            return false
        }
        if(confirmPass.length<7){
            alert("Password is too short, Please provide a 7 character long password");
            e.preventDefault();
            return false
        }
        return true
    }
    return (
        <div>
        <div className="mb-3">
          <h2>Signup</h2>
          <label htmlFor="exampleFormControlInput1" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          placeholder="John Doe" onChange={(event)=>{setFname(event.target.value)}}
          />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com" onChange={(event)=>{setEmail(event.target.value)}}
          />
      </div>
      <div className="mb-3">
        <label htnlfor="exampleFormControlTextarea1" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="inputPassword" onChange={(event)=>{setInitPass(event.target.value)}}/>
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Confirm Password
        </label>
        <input type="password" className="form-control" id="inputPassword" onChange={(event)=>{setConfirmPass(event.target.value)}}/>
      </div>
      <Link to="/" className="btn btn-info" onClick={handleSubmit}>
          Login
      </Link>
    </div>
    )
}
