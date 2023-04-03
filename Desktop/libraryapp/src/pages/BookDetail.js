import React from "react";

import Header from "../components/Header";
import { useParams,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";

const BookDetail = () => {
  const { bookId } = useParams();
  const { bookState, categoriesState } = useSelector((state) => state);
   const navigate=useNavigate()
  /* let myBook = null;
  for (let i = 0; i < bookState.books.length; i++) {
    if (bookState.books[i].id === bookId) {
      myBook = bookState.books[i];
      break;
      //find methoduyla aynı bu kod bloğu
    }
  }*/
  const myBook = bookState.books.find((item) => item.id === bookId);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === myBook.categoryId
  );
  return (
    <div>
      <Header />
      <div className="container my-5 d-flex justify-content-center ">
        <div
          style={{
            border: "1px solid #6C757D",
            padding: "30px",
            width: "70%",
            backgroundColor: "#F6F6F6",
            borderRadius: "10px",
            boxShadow:"0px 0px 10px 5px #F7BF84"
          }}
        >
          <h5 style={{position:"relative", display:"flex",justifyContent:"center" , alignItems:"center"}} >
            <span onClick={()=>navigate("/")} style={{position:"absolute",left:0,cursor:"pointer"}} className="badge bg-secondary">Geri Dön</span>{" "}
            <h1>Kitap Bilgileri</h1>
          </h5 >
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Adı:</b>
            </p>
            <p>{upperFirstLetter(myBook.title)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Yazarı:</b>
            </p>
            <p>{upperFirstLetter(myBook.author)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Yayın Evi:</b>
            </p>
            <p>
              {myBook.publisher === ""
                ? "Belirtilmemiş"
                : upperFirstLetter(myBook.publisher)}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitabın Fiyatı:</b>
            </p>
            <p
              style={{ color: "green", fontWeight: "bolder", fontSize: "20px" }}
            >
              {myBook.price === "" ? "Belirtilmemiş" : myBook.price + " ₺"}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>ISBN:</b>
            </p>
            <p>{myBook.isbn === "" ? "Belirtilmemiş" : myBook.isbn}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Kategorisi:</b>
            </p>
            <p>{upperFirstLetter(myCategory.name)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
