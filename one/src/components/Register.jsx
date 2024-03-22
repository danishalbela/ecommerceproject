import React, { useState } from "react";
import './Register.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { authUser } from "./Context";

function Register() {
      
   let [data, setData] = useState({
    email:'',
    password:'',
    fullName:'',
    dateOfBirth:'',
    gender:'',
    country:'',
    receiveNewsLetters:''
   })

  //  context data
  let user = authUser()
  console.log( user)
  let {condata, setcondata} = user
// onChange

let handleChange = (e)=>{
   setData(
    {...data, [e.target.name]:e.target.value}
   )
}

let handleCheck = (e)=>{
   setData(
    {...data,[e.target.name]:e.target.checked}
   )
}

// countriesdata

  let country = [
    { id: 1, countryName: 'India' },
    { id: 2, countryName: 'Pakistan' },
    { id: 3, countryName: 'bhutan' },
    { id: 4, countryName: 'Bangladesh'},
    { id: 5, countryName: 'Nepal' },
    { id: 6, countryName: 'China' },
  ]

  // registerClick
  let onRegisterClick = async() =>{

      try {
        let response = await axios.post(`http://localhost:4000/users`,data)
       setData(
        {
          email:'',
          password:'',
          fullName:'',
          dateOfBirth:'',
          country:'',
          gender:'',
          receiveNewsLetters:''
        }
       )  

        if(response.status==201){
          //  add data to context
           let newuser =  response.data
           setcondata(
            {
              isLoggedIn:true,
              userName:newuser?.fullName,
              userId:newuser?.id,
              userData:newuser
            }
           )
          // console.log(response);
          // alert('ok')
          //  navigate to Store
          navigate('/Store')
        }else{
          alert('Failed')
        }
      }catch(error){
        // console.log('error')
      } 
  }

  // navigate to programatically
   let navigate  = useNavigate()


  return (
    <div className="main row border border-4 w-25 m-auto my-3 rounded-4">
      <div className="col-lg-6 mx-auto">
        <h2 className="m-auto my-3 text-center text-light p-2  border-bottom border-3 border-secondary">
          REGISTER
        </h2>
      </div>
      {/* email */}
      <div className="input-group my-3 w-75 m-auto">
        <input type="text"
         placeholder="userEmail"
         className="form-control"
         value={data.email}
         name="email"
         onChange={handleChange}
          />
      </div>
      {/* password */}
      <div className="input-group my-3 w-75 m-auto">
        <input
          type="text"
          placeholder="userPassword"
          className="form-control"
          value={data.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      {/* username */}
      <div className="input-group my-3 w-75 m-auto">
        <input type="text" placeholder="userName" className="form-control" 
          value={data.fullName}
          name="fullName"
          onChange={handleChange}
        />
      </div>
      {/* dob */}
      <div className="input-group my-3 w-75 m-auto">
        <label className="mt-2 me-2" htmlFor="">
          DateOfBirth ={" "}
        </label>
        <input type="date" className="form-control" 
          value={data.dateOfBirth}
          name="dateOfBirth"
          onChange={handleChange}
        />
      </div>

      {/* gender */}

      <div className="input-group my-3 w-75 m-auto">
        <label className="mt-2 me-1" htmlFor="">
          GENDER
        </label>

        <div className="form-check">
          <input
            className="form-check-input mt-2 ms-2 me-1"
            type="radio"
            name="gender"
            value='male'
            checked={data.gender==='male'? true : false}
             onChange={handleChange}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input mt-2 ms-2 me-1"
            type="radio"
            name="gender"
            value='female'
            checked={data.gender==='female'? true : false}
             onChange={handleChange}
          />
          <label className="form-check-label">Female</label>
        </div>
        {/* country */}
        <div className="input-group my-3  m-auto">
          <label className="mt-2 me-2" htmlFor="">
            Country =
          </label>

          <select  id="" 
                  className="form-select"
                  name = 'country'
                  value={data.country}
                  onChange={handleChange}
                  >

          <option defaultValue>Select Any One</option>
           {
            country.map(ele=>{
              return <option
               key = {ele.id}
               value = {ele.conutryName}
              >
               {ele.countryName}
              </option>
            })
           }
          </select>
        </div>

        {/* recievenewletters */}
        <div className="form-check m-auto mt-3 fs-5">
          <input
            className="form-check-input"
            type="checkbox"
            value={data.receiveNewsLetters}
            id="flexCheckChecked"
            onChange={handleCheck}
            name="receiveNewsLetters"
            checked={data.receiveNewsLetters===true ? true: false}
          />
          <label className="form-check-label">
            Checked checkbox
          </label>
        </div>

        {/* button */}
        <button
        onClick={onRegisterClick}
         className=" btn btn-success mt-3 w-100 p-2 fs-5 fw-bold border radius-5">REGISTER</button>
      </div>
    </div>
  );
}

export default Register;
