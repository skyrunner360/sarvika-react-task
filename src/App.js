import './App.css';
import React from 'react';
import Welcome from "./components/Welcome.js";
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* Enclose Parent Component in BrowserRouter for routing */}
    <BrowserRouter>      
        <Welcome/>
    </BrowserRouter>

    </div>
  )
}

export default App;
