import React from "react";
import { useNavigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Button from "../components/Button";

import ListBooks from "../components/ListBooks";

const Home=()=>{
    const useNavigate=useNavigate()
    return(
        <div>
            <Header />
            <div className="container my-5">
              <div className="d-flex justify-content-end">
              <Button text="Kitap Ekle" onClick={()=>navigate("/add-book")} />
              </div>
                <ListBooks />
            </div>
            
        </div>
    )
}

export default Home