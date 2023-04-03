import React,{useState} from "react";
import { useSelector,useDispatch} from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import Modal from "./Modal";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListCategories = () => {
  const dispatch=useDispatch()
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [willDeleteCategory,setWillDeleteCategory]=useState("")
  const deleteCategory=(id)=>{
    api.delete(`${urls.categories}/${id}`)
    .then(res=>{
      dispatch({type:actionTypes.categoryActions.DELETE_CATEGORY,payload:id})
      dispatch({type:actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,payload:id})
      setShowDeleteModal(false)
    })
    .catch(err=>{})
  }
  const { categoriesState,bookState } = useSelector((state) => state);
 
  return (
    <div>
      {categoriesState.categories.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-primary text-center" role="alert">
            Sistemde gösterilecek kategori kaydı yok.
          </div>
        </div>
      )}
      {categoriesState.categories.length > 0 && (
        <table className={`table table-striped  table-light`}>
          <thead>
            <tr>
              <th scope="col">Sıra No</th>
              <th scope="col">Kategori Adı</th>
              <th scope="col">Kitap Sayısı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.map((category, index) => {
                const myBooks=bookState.books.filter(item=>item.categoryId === category.id)
                return(
                    <tr key={category.id}>
                    <th>{index + 1}</th>
                    <td>{upperFirstLetter(category.name)}</td>
                    <td>{myBooks.length}</td>
                    <td>
                      <div
                        className="btn-group" >
                        <button onClick={()=>{
                          setShowDeleteModal(true)
                          setWillDeleteCategory(category.id)
                        }} type="button" className="btn btn-danger btn-sm">
                          Sil
                        </button>
                        <Link to={`/edit-category/${category.id}`} className="btn btn-warning btn-sm">
                         Güncelle
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      )}
      <Modal
        visible={showDeleteModal}
        title="Silme İşlemi"
        content="Kategori silindiğinde o kategoriye ait bütün kitaplar da silinecektir. Devam etmek istediğinize emin misiniz?"
        cancelButtonText="Vazgeç"
        cancelButtonClick={()=>setShowDeleteModal(false)}
        hasConfirmButton={true}
        confirmButtonText="Sil"
        confirmButtonClick={()=>deleteCategory(willDeleteCategory)}
        
      />
    </div>
  );
};

export default ListCategories;
