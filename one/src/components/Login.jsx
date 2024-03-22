import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { authUser } from './Context';

function Login() {

    let [logindata, setLoginData] = useState(
        {myemail:'scott@test.com' , mypass:'Scott123'}
    )

    let navigate = useNavigate()
    let handleChange = (event)=>{
         setLoginData(
            {...logindata, [event.target.name]:event.target.value}
         )
    }


     //  toastify

    const notifySuccess = ()=>toast.success('🦄 Success!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const notifyUnSuccess = ()=>toast.error('🦄 Faild!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        // context data
        let user = authUser()
        console.log('login says',user)
        let {condata,setcondata} = user

        // onLogin
    let handleSubmit = async(event)=>{
        event.preventDefault()

      try{
        //   for successfull operation
       let response = await axios.get(`http://localhost:4000/users?email=${logindata.myemail}&password=${logindata.mypass}`)
      console.log(response.data);

      if(response.data.length>0)
      {
        // alert("Success")
       
        // context data update
        let user = response.data[0]

        setcondata({
          isLoggedIn:true,
          userName:user?.fullName,
          userId:user?.id,
          userData:user
        })

        // alert on login
        notifySuccess();

     setTimeout(()=>{
         navigate('/Store')
     },3000)

      }else{
        // alert("Unsuccess")
        notifyUnSuccess()
      }

      }
      catch (error){
        //    for unsuccessfulloperation
        console.log(error);
      }

    }
  return (
    
    <div className='login-sec'>
        <h1 className='text-center p-2 text-light'>LOGIN</h1>
        <form className='form-sec w-25 m-auto' onSubmit={handleSubmit}>

        <Link >
            <img className='m-auto d-block p-2' src='https://scontent.flko10-1.fna.fbcdn.net/v/t1.6435-1/121096622_112890810589338_6270040683043859396_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=ONDWaAv8iKUAX9Op759&_nc_ht=scontent.flko10-1.fna&oh=00_AfCrEsJqLyR5jXZRTEW_bqnCla9Mr-aGdqVDr8m09vChew&oe=65ED183F'/>
        </Link>

        <h1 className='text-center text-info fw-bold fs-5 '>WELCOME</h1>
        <h3 className='text-center text-light fw-bold fs-5'>TO AZERA TEXTILES</h3>
            <input
                type='text'
                placeholder='userEmail'
               value={logindata.myemail}
                id=''
                className='form-control m-auto mt-5'
                name='myemail'
                onChange={handleChange}
            />
            <input
                type='text'
                placeholder='userPassword'
                name='mypass'
                id=''
                className='form-control m-auto  my-3'
                value={logindata.mypass}
                onChange={handleChange}
            />
            <button
            type='submit'  className='btn btn-warning  m-auto fs-5 d-block mt-4 p-2'>Login</button>
        </form>

        <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>

  )
}

export default Login