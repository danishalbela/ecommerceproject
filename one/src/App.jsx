
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Pageerr from './components/Pageerr'
import Protectedroutes from './components/Protectedroutes'
import Store from './components/Store'

function App() {
  return (
    <div>
    
    <Navbar/>
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path = '/register' element = {<Register/>}/>

    
     <Route path = '/dashboard' element = { <Protectedroutes>      
     <Dashboard/>
     </Protectedroutes>}/>
    

      <Route path='*' element={<Pageerr/>}/>
      <Route path='/Store' element = {<Store/>}/>
    </Routes>
    
    </div>
  )
}

export default App