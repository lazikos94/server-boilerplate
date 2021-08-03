import React ,{Suspense, useEffect, useState} from 'react'
import {BrowserRouter,Switch,Route,Redirect, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Homepage from './Components/Pages/Homepage';
import Header from './Components/Sub-Components/Header';
import Footer from './Components/Sub-Components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route exact path='/' render={()=><Homepage />}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
