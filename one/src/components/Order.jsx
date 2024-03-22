import React from 'react'

function Order(props) {
  let {orderid,productid,userid,quantity,price,productName,isPaymentCompleted, onBuyClick,onDelClick} =props
  return (
    <div className='card border my-2 py-3 shadow-lg w-50 m-auto'>
      <div className='card-body'>
          <h4 className='fs-5'>
          {productName}</h4>
          <table className='table text-center  border border-2'>
            <tbody>
            <tr>
              <td>Quantity = {quantity}</td>
              <td>Price =  ${price} </td>
              </tr>
            </tbody>
          </table>
          {/* buttons for buying and canceling data */}
          {
            isPaymentCompleted === false ?
            <div className='m-2 d-flex justify-content-evenly'>
          <button
           onClick={()=>onBuyClick(orderid,userid,productid,quantity)} 
           className='btn btn-success'>Buy Now</button>
          <button 
          onClick={()=>onDelClick(orderid)}
          className='btn btn-danger'>Remove Items</button>
          </div>
          :
          ""
          }
      </div>
    </div>
  )
}

export default React.memo(Order)