import React, { Fragment } from 'react';
import { HashRouter, Route, Routes, useHistory, useParams } from "react-router-dom";
import './App.css';
import MainComponent from './MainComponent';
import SchedaMagia from './SchedaMagia';
import CustomHeader from './CustomHeader';

export default function AppMainComponent() {

    

    return (
      <HashRouter>
          <div className="App">
          {/*<CustomHeader></CustomHeader>*/}
            <Routes>
                 <Route path="/" Component={MainComponent} />
                 <Route path="/Magia" Component={checkParameter} />
            </Routes>
           </div>
        </HashRouter>
    )
}

function checkParameter(){
    return (<SchedaMagia></SchedaMagia>);
}
