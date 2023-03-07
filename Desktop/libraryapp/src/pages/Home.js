import React from "react";

import { Link } from "react-router-dom";

const Home=()=>{
    return(
        <div>
            <h1>Anasayfa</h1>
            <link to={"/add-book"}>Kitap ekle</link>
        </div>
    )
}

export default Home