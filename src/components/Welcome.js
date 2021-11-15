// Main Parent Component
// Importing...
import React,{useState} from 'react'
import Login from './Login'
import {
    Routes,
    Route,
    useNavigate,
  } from "react-router-dom";
import Signup from './Signup';
import Home from './Home';
import Taskdesc from './Taskdesc';

export default function Welcome() {
    // Creating States and variables
    const navigate = useNavigate()
    const [taskDescrip, setTaskDescrip] = useState([]) //State to save and pass task description to taskdesc component
    const [isLogin, setIsLogin] = useState(false)

    //Function to Signup user
    const userSignup= async(name,email,password)=>{
       const result = await fetch("https://dushyant70-task-app.herokuapp.com/users",{method:"POST",body: JSON.stringify({name,email,password}), headers: {"content-type":"application/json"}})
        
    }

    //Function to login the user and save the token to localstorage
    const userLogin=async(email,password)=>{
        const response = await fetch("https://dushyant70-task-app.herokuapp.com/users/login",{method:"POST",body:JSON.stringify({email,password}), headers:{"content-type":"application/json"}})
        const result = await response.json()
        localStorage.setItem("login",JSON.stringify({
                login: true,
                token: result.token
        }))
        if(response.status===400){
                        alert("Incorrect Username or password, Please Try Again");
                        return false;
                    }  else {
                        setIsLogin(true)
                        navigate("/home")
                    } 
    }
    return (
        <div className="container">
        {!isLogin?<h1>Welcome, Please Login to continue or Signup</h1>:""}
        {/* Routes and paths */}
        <Routes>
            <Route path="/" element={<Login userlogin={userLogin}/>}/> {/* Passing down states and props */}
            <Route path="/signup" element={<Signup usersignup={userSignup}/>}/> 
            <Route path="/home" element={<Home setTaskDescrip={setTaskDescrip}/>}/>
            <Route path="/desc" element={<Taskdesc TaskDescrip={taskDescrip}/>}/>
        </Routes>
</div>
    )
}
