import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import api from "./api/api";
import urls from "./api/urls";
import Loading from "./components/Loading";
import Error from "./components/Error";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import CategoriesHome from "./pages/CategoriesHome";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Login from "./pages/Login";

function App() {
  const { bookState, categoriesState, loginState } = useSelector(
    (state) => state
  );
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
        }, 1000);
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
        }, 1000);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "kategori bilgilerini çekerken bir hata olustu",
        });
      });
  }, []);
  if (bookState.pending === true || categoriesState.pending === true)
    return <Loading />;
  if (bookState.error === true || categoriesState.error === true)
    return <Error />;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loginState.success ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/add-book"
          element={
            loginState.success ? <AddBook /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/book-detail/:bookId"
          element={
            loginState.success ? <BookDetail /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/edit-book/:bookId"
          element={
            loginState.success ? <EditBook /> : <Navigate to={"/login"} />
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/categories"
          element={
            loginState.success ? <CategoriesHome /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/edit-category/:categoryId"
          element={
            loginState.success ? <EditCategory /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-category"
          element={
            loginState.success ? <AddCategory /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
