import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import ListBooks from "../components/ListBooks";
import Logout from "../components/Logout";

const Home = () => {
  const navigate = useNavigate();
  const { themeState, loginState} = useSelector((state) => state);
  useEffect(()=>{
    if(!loginState.success) navigate("/login")
  },[])
  return (
    <div style={{minHeight: "100vh"}} className={themeState === "light"?  "bg-light" : "bg-dark"}>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Button
            type={themeState === "light" ? "primary" : "secondary"}
            text="Kitap Ekle"
            onClick={() => navigate("/add-book")}
          />
        </div>
        <ListBooks />
      </div>
      <Logout />
    </div>
  );
};

export default Home;
