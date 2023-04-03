import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";

const EditBook = () => {
  const titleRef = useRef();
  const authorRef = useRef();
  const { bookId } = useParams();
  const { bookState, categoriesState } = useSelector((state) => state);
  const myBook = bookState.books.find((item) => item.id === bookId);
  const [formState, setFormState] = useState(myBook);
  const handleSubmit = (event) => {
    event.preventDefault();
    /*validation */
    if (formState.categoryId === "empty") {
      alert("kategori alanı zorunludur");
      return;
    }
    if (formState.title === "") {
      // alert("kitap adı alanı zorunludur");
      titleRef.current.style.display = "block";
      return;
    }
    if (formState.author === "") {
     // alert("kitap yazarı alanı zorunludur");
     authorRef.current.style.display="block"
      return;
    }
    /* api call */
    api
      .put(`${urls.books}/${bookId}`, formState)
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-4 ">
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
            <p ref={titleRef} style={{ display: "none" }}>
              <small className="text-danger">* Bu alan zorunludur.</small>
            </p>
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
            <p ref={authorRef} style={{ display: "none" }}>
              <small className="text-danger">* Bu alan zorunludur.</small>
            </p>
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
    </div>
  );
};
export default EditBook;
