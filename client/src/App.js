import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import Detail from './Components/Detail';
import Creation from './Components/Creation';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route  path='/home' component={Home}/>
        <Route  path='/detail/:id' component={Detail}/>
        <Route  path='/creation' component={Creation}/>
      </Switch>
    </div>
  );
}

export default App;
