import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AppMainComponent from './AppMainComponent';

import './App.css';
import Footer from './Footer';

function App() {
  return (
    <div style={{height:"inherit"}}>
          <AppMainComponent></AppMainComponent>
          {/*<Footer></Footer>*/}
    </div>
  );
}

export default App;
