import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import api from "./api/api";
import urls from "./api/urls";
import Loading from "./components/Loading";
import Error from "./components/Error";


function App() {
  const { bookState,categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    /*get books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
       setTimeout(() => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
          payload: res.data,
        });
       }, 2000);
      })
      .catch((err) => {
       
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "kitapları çekme işleminde bir hata oluştu",
        });
       
      });
    /*get categories*/
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
       setTimeout(() => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
       }, 2000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "kategori bilgilerini çekerken bir hata olustu",
        });
      });
  }, []);
if(bookState.pending === true || categoriesState.pending === true) return <Loading />
if(bookState.error === true || categoriesState.error === true)  return <Error />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
