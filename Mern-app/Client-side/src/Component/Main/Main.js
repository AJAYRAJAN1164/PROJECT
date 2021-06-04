import React, { useState } from 'react'
import "./Main.css"

//HOME ROUTE

export default function Main ({setToken}) {
let [username,setUsername]= useState();
let[password,setPassword]=useState();

//when login btn clicked handlesumbit func is called
//fetch is used to post data to server 
let handleSubmit=()=>{
  fetch("http://localhost:5000/user-login",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },method:"POST",
         body:JSON.stringify({ username:username,password:password })})
         .then((response=>{
          response.json().then((result)=>{
          console.warn("result",result);
          if(result.token) { 
            setToken(result);
            window.location.href = "/Dashboard";  //redirecting to role based dashboard;
            }
          else{
               alert(result.message);
            }
         });
    }));
  };

        
 return (
    
    <div>
         <form className="orderform" >
           <div class="ordercontainer">
             <div class="row">
               <div class="col-12">
               <h1 class="fontWhite">LOGIN-FORM</h1>
              </div>
              </div>
             <div class="row ">
               <div class="col-12">
                  <label class="fontWhite alignLeft">USERNAME</label>
               </div>
               <div class="col-12">
               <input className="inputfield" type="text" onChange={e => setUsername(e.target.value)} name="username"/>
               </div>
               <div class="col-12">
                  <label class="fontWhite alignLeft">PASSWORD</label>
               </div>
               <div class="col-12">
                  <input className="inputfield" type= 'password'onChange={e => setPassword(e.target.value)} name="password"/>
               </div>
              </div>
             <div class="row">
                   <div class=" col-12"> <button   className="buttontype" type="button" onClick={handleSubmit} >LOGIN</button></div>
              </div>
            </div>   
         </form>
    </div>
 )
    
}

