import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Netflix from './pages/Netflix';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Player from './pages/Player';
import MyList from './pages/MyList';
import TvShow from './pages/TvShow';
import Movies from './pages/Movies';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path  = "/login" element = {<Login />} /> 
        <Route exact path  = "/signup" element = {<Signup />} /> 
        <Route exact path  = "/player" element = {<Player />} /> 
        <Route exact path="/mylist" element={<MyList />} />
        <Route exact path="/tv" element={<TvShow />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path  = "/" element = {<Netflix />} /> 
      </Routes>
    </BrowserRouter>
  )
}
