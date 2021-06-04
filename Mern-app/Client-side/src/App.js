import Dashboard from "./Component/dashboard/Dashboard";
import Main from "./Component/Main/Main";
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import useToken from './Usetoken';
import Registration from "./Component/Registration/Registration";


//check token data in localstorage ,if it is not set redirect to login main route 
function App() {
  const { token, setToken } = useToken();
  if(!token) {
    return <Main setToken={setToken} />
  }

//importing all the components declared
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/Dashboard" component={Dashboard}></Route>
          <Route path="/Registration" component={Registration}></Route>
          </Switch>
      </BrowserRouter>    
  );
}

export default App;
