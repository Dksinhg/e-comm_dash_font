import React, { useEffect, useState } from "react";
import "./signup.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const postdata = "http://localhost:5000/register"

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //check user data login or not 
  useEffect( ()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  });


   //define function here 
   const collectData =  async() => {
    console.log(name, email, password)
  
    // axios
    // .post(postdata ,{name, email, password} )
    // .then((res) => {
    //   console.log(res.data);
    //   navigate("/");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  
  console.warn(name, password, email);
    let result = await fetch("http://localhost:5000/register",{
    method:'post',
    body: JSON.stringify({name, email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    });
     result = await result.json();
    //  console.warn(result);
     localStorage.setItem("user", JSON.stringify(result))
     navigate('/')
  };

  return (
    <div className="signup">
      <h1> Register </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      /> <br></br>

      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      /><br></br>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <br></br>
      <div className="buttom">
        <button onClick={collectData} className="appbuttom" type="buttom">
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default SignUp;
