import React from "react";

import { useSelector } from "react-redux";

function App() {
  const allStates=useSelector(state=>state)
  console.log(allStates);
  
  return (
    <div className="App">
    <h1>Library App </h1>
    </div>
  );
}

export default App;
