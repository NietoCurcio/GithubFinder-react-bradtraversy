import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  // likewise render is a required lifecycle method, we have componentDidMouth which don't is a
  // required lifecycle but is a lifecycle method
  // Extends (extends Component) the core react component class that contains all lifecycle methods
  // ComponentDidMount() run when component mount, like useEffect hook
  // Console.log(res.data); console.log dont print anything in our terminal, only in our browser
  // Render is called lifecycle method
  // To use if statement, must be out of return of the func/class
  //  ternary = ? : or && without else

  return (
    <GithubState>
      <AlertState>
        {/* github state provider */}
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              {/* Put multiple components in a single route */}
              {/* wrap all our routes in a switch so that it shows one at the time */}
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:username' component={User} />
                {/* when we need pass props: render={(props) =>{<Component {...props} customprop={prop}}} */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
