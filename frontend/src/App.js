import React from "react";
import Routes from "./Routes";
import {useEffect} from "react";

import "./App.css";

function App() {
  useEffect(() => {
        document.body.style.backgroundColor = '#E5E5E5';
    }, []);

  return (
    <div className="App container py-3">
      <Routes />
    </div>
  );
}

export default App;