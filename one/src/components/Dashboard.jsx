import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { authUser } from "./Context";
import { OrdersServices, ProductService } from "./helper";
import Order from './Order'

function Dashboard() {
  let [orders, setOrders] = useState([]);
  // console.log(orders)
  // get data from context
  let users = authUser();
  // console.log(users);

  // on refresh
  let loadDataFromDatabase = useCallback(async () => {
    try {
      let ordersResponse = await axios.get(
        `http://localhost:4000/orders?userId=${users.condata.userId}`
      );
      // console.log(ordersResponseBody)
      if (ordersResponse.status === 200) {
        let ordersResponseBody = ordersResponse.data;
        // console.log(ordersResponseBody);

        // get all products
        let productsResponse = await ProductService.fetchProducts();

        // merge product data into orders
        if (productsResponse.status === 200) {
          let productsResponseBody = productsResponse.data;
          // console.log(productsResponseBody)

          ordersResponseBody.forEach((orders) => {
            orders.product = ProductService.getProductByProductId(
              productsResponseBody,
              orders.productId
            );
            console.log(orders);
          });
          setOrders(ordersResponseBody);
        } else {
        }
      }

      let productResponseBody = await ProductService.fetchProducts();
      console.log(productResponseBody);
    } catch (error) {}
  }, [users.condata.userId]);

  // get order data for the first time when we will visit the dashboard
  useEffect(() => {
    loadDataFromDatabase();
  }, [users.condata.userId, loadDataFromDatabase]);


  // onBuyNowClick
  let onBuyClick =  useCallback(async(orderid,userid,productid,quantity)=>
  {
    if(window.confirm('Wanna Buy?'))
   { 
    // alert ('buy now')

    let neworder = {
      userId : userid,
      productId:productid,
      quantity:quantity,
      isPaymentCompleted:true
    }
    let ordersresponse = await axios.patch(`http://localhost:4000/orders/${orderid}`,neworder)
    console.log(ordersresponse)
    loadDataFromDatabase()
   }else{
    alert('Buying cancelled')
   }
  }
,[loadDataFromDatabase])

// delClick
let onDelClick = useCallback(async(orderid)=>{
  if(window.confirm('Wanna remove from bag?')){
    let ordersresponse = await axios.delete(`http://localhost:4000/orders/${orderid}`)
    if(ordersresponse.ok)
    {
      console.log(ordersresponse)
      alert('Item remove from BAG')
      loadDataFromDatabase()
    }
  }
},[loadDataFromDatabase])
  return (
    <div className="border border-2 my-3">
      <div className="header">
        <h1 className="p-2 text-light bg-primary">
          Dashboard
          <i
            onClick={loadDataFromDatabase}
            className="fa-solid fa-arrows-rotate ms-4 text-warning"
          ></i>
        </h1>
      </div>

      <div className="row border border-danger my-3 gap-2">
        <div className="col-lg-5 bg-info offset-1 p-3">
          <h3 className="">
            <i className="fa-solid fa-list-check mx-3"></i>
            <button type="button" className="btn btn-primary position-relative">
              PrevOrders
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                
                <span className="">{OrdersServices.getPrevorders(orders).length}</span>
              </span>
            </button>
          </h3>

          {/* show order componentunder prevorders */}

          {
            OrdersServices.getPrevorders(orders).length === 0 ?
            <h1>Nothing Purchased Yet</h1> : ''
          }
           {
            OrdersServices.getPrevorders(orders).map(ele=>{
              return <Order
                key={ele.id}
                orderid={ele.id}
                productId ={ele.productId}
                quantity = {ele.quantity}
                userId = {ele.userId}
                price = {ele.product.price}
                productName = {ele.product.productName}
                isPaymentCompleted = {ele.isPaymentCompleted}
                onBuyClick = {onBuyClick}
                onDelClick = {onDelClick}
              />
            })
           }+
        </div>
        {/* cart */}
        <div className="col-lg-5 text-danger text-uppercase bg-dark p-3">
          <h3 className="">
            <i className="fa-brands fa-opencart mx-3"></i>
            <button type="button" className="btn btn-primary position-relative">
             Cart Items
              <span className=" position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                
                <span className="">{OrdersServices.getCart(orders).length}</span>
              </span>
            </button>
          </h3>
          
          {/* show order componentunder Cart Items */}

          {
            OrdersServices.getCart(orders).length === 0 ?
            <h1>No Items Added</h1> : ''
          }

          {
            OrdersServices.getCart(orders).map(ele=>{
              return <Order
                 key={ele.id}
                orderid={ele.id}
                productId ={ele.productId}
                quantity = {ele.quantity}
                userId = {ele.userId}
                price = {ele.product.price}
                productName = {ele.product.productName}
                isPaymentCompleted = {ele.isPaymentCompleted}
                onBuyClick = {onBuyClick}
                onDelClick = {onDelClick}
              />
            })
           }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
