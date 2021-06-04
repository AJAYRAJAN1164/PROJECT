import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  debugger;
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  let _name = userToken.name;
  let _username = userToken.username;
  let _role = userToken.role;
  let _hideClass = "";

  let _dynamicBg ="";

  let signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  let redirectToRegister=()=>{


    window.location.href = "/Registration";


   };
   switch(_role)
   {
     case "user" : _dynamicBg="BackDivMember"; _hideClass="dropdown-item  hideData"; break;
     case "superadmin" : _dynamicBg ="BackDivSuperAdmin";_hideClass="dropdown-item ";  break;
     case "admin" :_dynamicBg= "BackDivAdmin";_hideClass="dropdown-item "; break;
    default : _dynamicBg=""; _hideClass="";
   }

  return (
    <div class={_dynamicBg}>
      <nav class="navbar navbar-light bg-light p-3">
        <div class="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
          <a class="navbar-brand" href="#">
            WELCOME TO  DASHBOARD
          </a>
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
        <div class="panel-heading">
          {" "}
          <h2 class="fontWhite">Welcome {_name}</h2>
        </div>
        <div class="panel-body fontWhite">
          {" "}
          <div class="container">
            <div class="row">
              <div class="col-3">
                <div class="row">
                  <div class="col-6">Username</div>
                  <div class="col-6">{_username}</div>
                </div>
                <div class="row">
                  <div class="col-6">Role</div>
                  <div class="col-6">{_role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
