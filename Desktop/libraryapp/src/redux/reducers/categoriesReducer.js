import actionTypes from "../actions/actionTypes";

const initialState={
    pending: true,
    success: false,
    categories:[],
    error: false,
    errorMessage:""
}

const categoriesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORIES_START:
           return{
            ...state,
            pending:true
           }
        case actionTypes.categoryActions.GET_CATEGORIES_SUCCESS:
           return{
            ... state,
            pending: false,
            success:true,
            error:false,
            categories:action.payload
           }
        case actionTypes.categoryActions.GET_CATEGORIES_FAIL:
            return{
             ... state,
             pending: false,
             success:false,
             error:true,
             errorMessage:action.payload
            }
        case actionTypes.categoryActions.ADD_CATEGORY:
            return{
                ...state,
                categories:[...state.categories,action.payload]
            }
        case actionTypes.categoryActions.DELETE_CATEGORY:
            let filteredCategories=state.categories.filter(item=> item.id !== action.payload)
            return {
                ...state,
                categories: filteredCategories
            }
        case actionTypes.categoryActions.EDİT_CATEGORY:
            let temptArry=[]
            for(let i=0; i<state.categories.length;i++){
                if(state.categories[i].id !==action.payload.id){
                    temptArry.push(state.categories[i])
                } else{
                    temptArry.push(action.payload)
                }
            }
            return{
                ...state,
                categories:temptArry
            }
        default:
            return state
    }

}

export default categoriesReducer