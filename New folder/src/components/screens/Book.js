import React from 'react'
const Book=(props)=>{
        return(
            <img className="item" style={{width:"100%",height:"100%"}}  src={props.books.photo} alt="none"></img>
        )
}
export default Book;