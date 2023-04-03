import React, { useState } from "react";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";

import { upperFirstLetter } from "../utils/functions";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

import Modal from "../components/Modal";

const AddBook = () => {
  const { categoriesState,themeState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const [formState, setFormState] = useState({
    id: String(new Date().getTime()),
    title: "",
    author: "",
    publisher: "",
    price: "",
    isbn: "",
    categoryId: "empty",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    /*validation */
    if (formState.categoryId === "empty") {
      alert("kategori alanı zorunludur");
      return;
    }
    if (formState.title === "") {
      alert("kitap adı alanı zorunludur");
      return;
    }
    if (formState.author === "") {
      alert("kitap yazarı alanı zorunludur");
      return;
    }

    api
      .post(urls.books, formState)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.ADD_BOOK,
          payload: formState,
        });
       setOpenSuccessModal(true)
      })
      .catch((err) => {});
  };

  return (
    <div  style={{minHeight: "100vh"}} className={`bg-${themeState === "light" ? "light" : "dark"}`}>
      <Header />
      <div className="container my-4 " >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Eylül"
              value={formState.title}
              onChange={(event) =>
                setFormState({ ...formState, title: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Kitabın Yazarı
            </label>
            <input
              type="text"
              className="form-control"
              id="Author"
              placeholder="Mehmet Rauf"
              value={formState.author}
              onChange={(event) =>
                setFormState({ ...formState, author: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayınevi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="İletişim yayınları"
              value={formState.publisher}
              onChange={(event) =>
                setFormState({ ...formState, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Kitabın Fiyatı:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="56"
              value={formState.price}
              onChange={(event) =>
                setFormState({ ...formState, price: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="xxxxxxxxxxxx"
              value={formState.isbn}
              onChange={(event) =>
                setFormState({ ...formState, isbn: event.target.value })
              }
            />
          </div>
          <select
            value={formState.categoryId}
            onChange={(event) =>
              setFormState({ ...formState, categoryId: event.target.value })
            }
            className="form-select"
          >
            <option value="empty">Kitabın kategorisini seçin</option>
            {categoriesState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {upperFirstLetter(category.name)}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <Modal 
        title="başarılı"
        content="kitap başarıyla eklendi"
        cancelButtonText="Anasayfaya dön"
        cancelButtonType="success"
        cancelButtonClick={()=>{setOpenSuccessModal(false); navigate("/")}}
        visible={openSuccessModal}
      />
    </div>
  );
};

export default AddBook;
