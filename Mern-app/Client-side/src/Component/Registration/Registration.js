import React, { useState } from "react";
import "./Registration.css"
let arrayData = "";

export default function Registration() {
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();

//getting tokens froms the localstorage 

  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

//declaring varibale data  from the token generated  
  let _name = userToken.name;
  let _username = userToken.username;
  let _role = userToken.role;
  let _hideClass = "";
  let _dynamicBg = "";
  let _newRole = "";
  let _InsertRole = "";
  
  //token saved in localstorage has been cleared 

  let signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

//using roles dynamically changing background datas 

  switch (_role) {
    case "user":
      _dynamicBg = "BackDivMember";
      _hideClass = "dropdown-item  hideData";
      break;
    case "superadmin":
      _dynamicBg = "BackDivSuperAdmin";
      _hideClass = "dropdown-item";
      _newRole = "Admin Role";
      _InsertRole = "admin";
      break;
    case "admin":
      _dynamicBg = "BackDivAdmin";
      _hideClass = "dropdown-item";
      _newRole = "User Role";
      _InsertRole = "user";
      break;
    default:
      _dynamicBg = "";
      _newRole = "";
      _InsertRole = "";
  }

//admin and user registeration using post method

  let register = () => {
    fetch("http://localhost:5000/user-register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        role: _InsertRole,
        name: name,
        username: username,
        email: email,
        reportingto: userToken.username,
        password: password,
      }),})
      .then((response) => {
           response.json().then((result) => {
       if (result) {
          console.log("record added sucessfully");
        }else{
          console.log(result.message);
        }
      });
    });
  };

//redirect to registering  page

  let redirectToRegister = () => {
    window.location.href = "/Registration";
  };

//to list the registered admins and users in a table format 
  let showData = async () => {
    await fetch("http://localhost:5000/getSubUsers",{
      headers: { Accept: "application/json",
        "Content-Type": "application/json"},
         method: "POST",
         body: JSON.stringify({username: _username})}).then((response) => {
      response.json().then((result) =>{
        if (result) {
          let loopData = "";
            for (var key of Object.keys(result.users)) {
                 loopData += `<tr><td>${result.users[key].username}</td> <td>${result.users[key].name}</td>  <td>${result.users[key].email}</td> <td>${result.users[key].role}</td> </tr>`;
                 }
                 var _div = document.getElementById("tableDet");
                 _div.innerHTML = loopData;
                 console.log(arrayData);
        }else{
        alert(result.message);
        }
      });
    });
  };

  return (
    <div class={_dynamicBg}>
      <nav class="navbar navbar-light bg-light p-3">
        <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
          <li class="navbar-brand" href="#">
           WELCOME TO DASHBOARD         
          </li>
          <button
            class="navbar-toggler d-md-none collapsed mb-3"
            type="button"
            data-toggle="collapse"
            data-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Hello, {_name}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item" onClick={signOut}>
                  Sign out
                </a>
                <a class={_hideClass} onClick={redirectToRegister}>
                  Resgister User
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="panel panel-default">
        <div class="container">
           <h1 class="fontWhite">Register</h1>
           <p class="fontWhite">Please fill in this form to create an account for {_newRole}</p>
          {/* form data enetered  */}
          <form class="registerclass">
             <div>
             <label for="name">
             <b>Name</b>
            </label>
            </div>
            <div>
            <input
               type="text"
               placeholder="Enter Name"
               name="name"
               id="name"
               required
               onChange={(e) => setName(e.target.value)}
            />
            </div>
            
            <div>
              <label for="email">
              <b>Email</b>
             </label>
             </div>
             <div> 
            <input
               type="text"
               placeholder="Enter Email"
               name="email"
               id="email"
               required
               onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label for="username">
              <b>Username</b>
            </label>
            </div>
            <div>
           <input
              type="username"
              placeholder="Enter Password"
              name="username"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
           />
           </div>
           <div>
           <label for="password">
            <b>Password</b>
           </label>
           <div/>
           <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
           />
           </div>
           <br/>
           <div>
           <button type="submit" class="registerbtn" onClick={register}>Register</button>
           </div>
         </form>
          <br />
          <br />
          <div>
               <button type="button" class="registerbtntwo" onClick={showData}>Show details</button>
          </div>
          <br />
         
         <br />
         <div class="table">
          {/* to show inserted data */}
          <table>
            <thead class="thead">
              <tr>
                <th>USERNAME</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
              </tr>
            </thead>
           <tbody id="tableDet"></tbody>
          </table>
         
         </div>
        </div>
      </div>
    </div>
  );
}
