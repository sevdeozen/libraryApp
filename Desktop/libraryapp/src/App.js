import React from "react";

import { useSelector } from "react-redux";

import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
 const {bookState}=useSelector(state=>state)
  console.log(bookState);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
