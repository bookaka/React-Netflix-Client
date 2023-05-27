import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Netflix from './pages/Netflix';
import Login from './pages/Login';
import Signup from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path  = "/login" element = {<Login />} /> 
        <Route exact path  = "/signup" element = {<Signup />} /> 
        <Route exact path  = "/" element = {<Netflix />} /> 
      </Routes>
    </BrowserRouter>
  )
}
