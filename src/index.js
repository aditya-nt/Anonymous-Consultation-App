import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import DataEntry from './dataEntry';
import TreeData from './TreeData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route } from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={App}></Route>
    <Route path="/dataEntry" component={TreeData}></Route>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
