import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector,useDispatch } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";
import Modal from "../components/Modal";

const AddCategory = () => {
    const navigate=useNavigate()
  const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const dispatch=useDispatch()
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
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
        upperFirstLetter(form.name.trim().replaceAll(" ",""))
    );
    if(hasCategory){
        setError(true)
        setErrorMessage(`* ${upperFirstLetter(hasCategory.name)} isminde bir kategori bulunmaktadır`)
        setTimeout(() => {
            setError(false)
        }, 1000);
        return
    }
    /*api call*/
    api.post(urls.categories,form)
    .then(res=>{
        dispatch({type:actionTypes.categoryActions.ADD_CATEGORY,payload:form})
        setOpenSuccessModal(true)
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
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <Modal
       title= "İşlem Başarılı"
       content="Kategori başarıyla kaydedildi."
       cancelButtonText="Anasayfaya Dön"
       cancelButtonType="success"
       cancelButtonClick={()=>navigate("/categories")}
       visible={openSuccessModal}
      />
    </div>
  );
};

export default AddCategory;
