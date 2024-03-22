import React, { useEffect, useState } from 'react'
import { BrandsService, CategoriesService, ProductService} from './helper'
import Product from './Product'
import { useCallback } from 'react'
import { authUser } from './Context'



function Store() {
    let [brands , setBrands] = useState([])
    let [category , setCategory]  = useState([])
    let [products, setProducts] = useState([])
    console.log(products)
    let [productToShow,setProductToShow] = useState([])
    console.log(productToShow)

    // for search
    let [text, setText] = useState('')
    let user = authUser()
    // let storedata = useCallback(
    //     async()=>{
    //         // get brands form db 
    //         let brandsResponse = await BrandsService.fetchBrands()
    //         let brandsResponseBody = brandsResponse.data
    //         // console.log(brandsResponseBody); 

    //         brandsResponseBody.forEach(ele=>{
    //         ele.isChecked = true  
    //         });
    //         setBrands(brandsResponseBody);

    //         // get category data from db
    //         let categoryResponse  = await CategoriesService.fetchCategories()
    //         let categoryResponseBody = categoryResponse.data
    //         // console.log(categoryResponse);
    //         categoryResponseBody.forEach(ele =>{
    //             ele.isChecked=true
    //         });
    //      setCategory(categoryResponseBody)

    //     // get products from database
    //     let productResponse = await fetch(`http://localhost:4000/products?productName_like=${text}`)
    //     let productResponseBody = await productResponse.json();
    //     //  console.log(productResponseBody)





    //     if( brandsResponseBody.length> 0 && categoryResponseBody.length>0 ){
    //         // console.log(brandsResponseBody,categoryResponseBody);
    //         let newprod = productResponseBody.map((product) => {
    //           // merge brand
    //           product.brand= BrandsService.getBrandsByBrandId(
    //             // brands, product.brandId // = avoid this
    //             brandsResponseBody,product.brandId
    //           )
    //          // merge categories
    //          product.category=CategoriesService.getCategoryByCategoryId(
    //           // category,product.categoryId
    //           categoryResponseBody,product.categoryId
    //           )
    //           product.isOrdered=false 
            
    //           return product
            
    //         })
    //         setProducts(newprod)
    //         updateProductsToShow(newprod)
    //       }
          
    //        },[])
          
    //        let user = authUser()
    //     //    console.log(user)

    // useEffect(()=>{
    //    storedata()
    // },[storedata]);

    useEffect(() => {
      (async () => {
        // get brand from db
        let brandresponse = await fetch((`http://localhost:4000/brands`));
        let brandsResponseBody = await brandresponse.json();
        // console.log(brandsResponseBody);
        brandsResponseBody.forEach((brand) => {
          brand.isChecked = true;
        });
        setBrands(brandsResponseBody);
    
        // get categories from db
        let categoriesresponse = await fetch((`http://localhost:4000/categories`));
        let categoriesResponseBody = await categoriesresponse.json();
        // console.log(categoriesResponseBody);
        categoriesResponseBody.forEach((category) => {
          category.isChecked = true;
        });
        setCategory(categoriesResponseBody);
    
        // get products
        let productResponse = await fetch(`http://localhost:4000/products?productName_like=${text}`);
        let productResponseBody = await productResponse.json();
    
        if (productResponse.ok) {
          productResponseBody.forEach((product) => {
            // set brand
        
            product.brand= BrandsService.getBrandsByBrandId(brandsResponseBody,product.brandId)
    
            // set category
            product.category = CategoriesService.getCategoryByCategoryId(categoriesResponseBody,product.categoryId)
            product.isOrdered = false;
          });
          setProducts(productResponseBody);
          setProductToShow(productResponseBody)
          document.title='Ecommerce Store'
        }
      })();
    }, [text]);
    
    

    let updateBrandsChecked = (id) =>{
      // alert(id)
      
      let brandsData = brands.map(ele=>{
        if(ele.id==id) ele.isChecked = !ele.isChecked
        return ele
      })
      setBrands(brandsData)

      updateProductsToShow()
      }
      
      let updateCategories= (id)=>{
        
        let categoryData = category.map(ele=>{
          if(ele.id==id)  ele.isChecked = !ele.isChecked
          return ele
        })
      setCategory(categoryData)
      updateProductsToShow()
      }
      
      //to update peoduct on filtering
      let updateProductsToShow = ()=>{
        // alert(45)
        let newProd = products
        .filter(prod=>{
          return category.filter(cat=>{
            return cat.id==prod.categoryId && cat.isChecked===true
          }).length > 0
        })
        .filter(prod=>{
          return brands.filter(ele=>{
            return ele.id==prod.brandId && ele.isChecked===true
          }).length > 0
        })
      
        setProductToShow(newProd)
      }
      
      // use this add to cart function
      
      let addToCart= async(prod)=>{
        let newOrder = {
          userId:user.condata.userId,
          productId:prod.id,
          quantity:1,
          isPaymentCompleted:false
        }
      
      let orderResponse = await fetch('http://localhost:4000/orders',{method:'POST',body:JSON.stringify(newOrder),headers:{"Content-type":"application/json"}})
      
      if(orderResponse.ok){
        let orderResponseBody = await orderResponse.json()
        // console.log(orderResponseBody);
      
      let prods = products.map(p=>{
        if(p.id===prod.id) p.isOrdered=true
        return p
      })
      setProducts(prods)
      setProductToShow(prods)
      }
      
      
      }
      

      return (
        <div>
      
          <div className="row py-3 ">
            <div className="col-sm-3 ">
              <h3 className="text-center pt-3 border-bottom  border-success border-4">
                STORE
              </h3>
            </div>
            <div>
              <input
                type="text"
                name=""
                className="form-control m-auto my-3 w-75"
                placeholder="Search Products"
                id=""
                value={text}
                onChange={(e)=>setText(e.target.value)}
              />
            </div>
            <div className="row gap-4 border border-4 ">
              <div className="col-sm-3 ms-4 border border-danger p-3 ">
               {/* ?ui of Brands chekbox */}
               <h4>Brands</h4>
                <ul className="list-group text-dark">
                  {brands.map((ele) => {
                    return (
                      <li className="list-group-item" key={ele.id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={ele.isChecked}
                            onChange={()=>updateBrandsChecked(ele.id)}
                          />
                          <label className="form-check-label text-dark">
                            {ele.brandName}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
    
               {/* ui of categories Checkbox */}
               <h4>Categories</h4>
                <ul className="list-group">
                  {category.map((ele) => {
                    return (
                      <li className="list-group-item" key={ele.id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={ele.isChecked}
                            onChange={()=>updateCategories(ele.id)}
                          />
                          <label className="form-check-label text-dark">
                            {ele.categoryName}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
    
              </div>
              <div className="col-sm-8 border border-success">
                {
                 productToShow.map(prod=>{
                    return <Product
                    key={prod.id}
                    name={prod.productName}
                    price={prod.price}
                    ratings={prod.rating}
                    brandname={prod.brand?.brandName}
                    categoryname={prod.category?.categoryName}
                    addToCart={addToCart}
                    prod={prod}
                    />
                  })
                }
              </div>
            </div>
          </div>
    
        </div>
      );
    
}

export default React.memo(Store) 