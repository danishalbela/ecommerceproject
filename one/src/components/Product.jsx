import React from 'react'

function Product(props) {
  let {name,price,ratings,brandname,categoryname,addToCart,prod} = props
  return (
    <div className='card w-50 p-3 d-inline-block'>
    <div className='cardBody'>
    <div className='card-title text-end shadow-lg p-1 bg-warning'>
      <h3>{name}</h3>
    </div>
    <div className='card-text p-3'>
         <h5>$ {(price/100).toFixed(2)}</h5>   
         <p>#{brandname}  #{categoryname}</p>

         <span>
          {
            [...Array(ratings).keys()].map(n=>(
              <i className='fs-6 fa-solid fa-star text-info' key={n}></i>
            ))
          }
         </span>
         <span>
          {
            [...Array(5-ratings).keys()].map(n=>(
              <i className='fa-regular fa-star' key={n}></i>
            ))
          }
         </span>



         <button 
          onClick={()=>addToCart(prod)}
          className='d-block my-3 w-75 m-auto btn btn-outline-success'>ADD TO CART</button>
    </div>

    </div>

    </div>
  )
}

export default Product