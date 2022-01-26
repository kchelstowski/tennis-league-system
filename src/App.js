import logo from './logo.svg';
import './App.css';
import Router from "./ui/router/Router";
import {ConfirmProvider} from "material-ui-confirm";


function App() {
  return (
      <ConfirmProvider>
      <div className="App">
        <div>
            <Router />
        </div>

      </div>
      </ConfirmProvider>


  );
}

export default App;
