import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditCategory = () => {
  const  navigate=useNavigate()
  const dispatch=useDispatch()
  const { categoryId } = useParams();
  const { categoriesState } = useSelector((state) => state);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === categoryId
  );
  const [form, setForm] = useState(myCategory);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /*validation */
    if (!form.name) {
      setError(true);
      setErrorMessage("* kategori adı boş bırakılamaz");
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) =>
        upperFirstLetter(item.name.trim().replaceAll(" ", "")) ===
        upperFirstLetter(form.name.trim().replaceAll(" ", ""))
    );
    if (hasCategory) {
      setError(true);
      setErrorMessage(
        `* ${upperFirstLetter(
          hasCategory.name
        )} isminde bir kategori bulunmaktadır`
      );
      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    /*api call */
    api.put(`${urls.categories}/${categoryId}`,form)
    .then(res=>{
        dispatch({type:actionTypes.categoryActions.EDİT_CATEGORY,payload:form})
        navigate("/categories")
    })
    .catch(err=>{})
  };
  return (
    <div>
      <Header />
      <div className="container my-4 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategori Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Roman"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
            {error && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="d-flex justify-content-center my-5">
            <button
              disabled={
                upperFirstLetter(myCategory.name.trim().replaceAll(" ", "")) ===
                upperFirstLetter(form.name.trim().replaceAll(" ", "")) ? true : false
              }
              type="submit"
              className="btn btn-primary w-50"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
