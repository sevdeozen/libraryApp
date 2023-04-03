import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Price=()=>{
    const bookPrice=useParams()
    const { bookState }=useSelector(state =>state)

    const myPrice=bookState.books.find(item=>item.price=== bookPrice)
    console.log(myPrice);
    return(
        <div>
            
        </div>
    )
}

export default Price