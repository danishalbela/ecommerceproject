import React from 'react'
import { authUser } from './Context'
import { Navigate } from 'react-router-dom'

function Protectedroutes({children}) {

let auth = authUser()
console.log('auth', auth)

if(auth.condata.isLoggedIn===false || auth.condata.userData === null)
{
    return <Navigate to = '/'/>
}
  
return    children
  
}

export default Protectedroutes