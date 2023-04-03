import React from "react";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import sun from "../assets/sun.gif"
import moon from "../assets/moon.gif"
import "../styles/general.css"
import icon from "../assets/icon.avif"


const Header = () => {
  const { themeState,bookState, categoriesState} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <nav
      style={{ position: "relative" }}
      className={`navbar navbar-expand-sm navbar-dark bg-${
        themeState === "light" ? "primary" : "secondary"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
        <img style={{width:"35px", height:"35px", borderRadius: "50%",marginRight:"5px"}} src={icon} />
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={"/"}>
              <button className="btn btn-light ">  Kitap İşlemleri</button>
               
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/categories"}>
               <button className="btn btn-light "> Kategori İşlemleri</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ position: "absolute", right: "20px", display:"flex",alignItems:"center", gap:"20px"}}>
        <div>
          <p style={{margin:0,color:"#fff"}}>Toplam Kitap Sayısı: {bookState.books.length}</p>
          <p style={{margin:0,color:"#fff"}}>Toplam Kategori Sayısı: {categoriesState.categories.length}</p>
        </div>
        {themeState === "light" ? (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "dark",
              })
            }
            className="btn btn-sm btn-dark"
          >
             <img style={{width:"25px", height:"25px", borderRadius: "50%",marginRight:"5px"}} src={moon} />
            <span> Dark</span>
          </button>
          
        ) : (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "light",
              })
            }
            className="btn btn-sm btn-warning">
           <img style={{width:"25px", height:"25px", borderRadius: "50%",marginRight:"5px"}} src={sun} />
           <span> Light</span>
          </button>
        )}
        
      </div>
      
    </nav>
  );
};

export default Header;
