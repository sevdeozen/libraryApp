import { act } from "react-dom/test-utils"
import actionTypes from "../actions/actionTypes"

const initialState={
    pending:true,
    success: false,
    books:[],
    error: false,
    errorMessage:""
}

const bookReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.bookActions.GET_BOOKS_START:
            return{
                ...state,
                pending: true,

            }
        case actionTypes.bookActions.GET_BOOKS_SUCCESS:
            return{
                ...state,
                pending: false,
                success: true,
                error:false,
                books: action.payload
            }
        case actionTypes.bookActions.GET_BOOKS_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                error: true,
                errorMessage: action.payload
            }
        case actionTypes.bookActions.ADD_BOOK:
            return{
                ...state,
                books:[...state.books,action.payload]
            }
    
        case actionTypes.bookActions.DELETE_BOOK:
          /*  let filteredBooks=state.books.filter(item=>item.id !== action.payload)*/
            var emptyArray=[]
            for(let i=0;i<state.books.length; i++){
                if(state.books[i].id !== action.payload){
                    emptyArray.push(state.books[i])
                }
            }
          
            return{
                ...state,
                books: emptyArray
            }
        case actionTypes.bookActions.EDİT_BOOK:
            const tempArr=[]
            for (let i=0; i<state.books.length;i++){
                if(state.books[i].id !== action.payload.id){
                    tempArr.push(state.books[i])
                }else{
                    tempArr.push(action.payload)
                }
            }
            return{
                ...state,
                books:tempArr
            }
        case actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY:
            /*payload olarak category id si gelecek */
            var filteredBooks=state.books.filter(item=>item.categoryId !== action.payload)
            return{
                ...state,
                books:filteredBooks
            }
        default:
            return state
    }
   

}

export default bookReducer