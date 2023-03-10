import React from "react";

import { useSelector } from "react-redux";

import { upperFirsLetter } from "../utils/functions";
import Button from "./Button";

const ListBooks = () => {
  const { bookState, categoriesState } = useSelector((state) => state);
  console.log(bookState);
  return (
    <div>
      {bookState.books.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-primary text-center" role="alert">
            Sistemde gösterilecek kitap kaydı yok.
          </div>
        </div>
      )}
      {bookState.books.length > 0 && (
        <div >
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sıra No</th>
                <th scope="col">Kitap Adı</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {bookState.books.map((book, index) => {
                const myCategory = categoriesState.categories.find(
                  (item) => item.id === book.categoryId
                );

                return (
                  <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{upperFirsLetter(book.title)}</td>
                    <td>{upperFirsLetter(myCategory.name)}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group" >
                       <Button className="btn-sm" text="Detay" type="secondary" />
                       <Button className="btn-sm" text="Sil" type="danger" />
                       <Button className="btn-sm" text="Güncelle" type="primary" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListBooks;
