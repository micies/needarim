import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableNames from "./components/table";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< TableNames/>}  />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
