import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

import bgImage from '../assets/home.jpg'
import titleMovie from'../assets/homeTitle.webp'
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components'
import {useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from '../components/Slider';
 

export default function Netflix() {

  const [scroll,setScroll] = useState(false);

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = ()=>{
    setScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }


  
  return (
    <Container>

      <Navbar scroll = {scroll} />
      
      <div className="body">
        <img src={bgImage} alt="background-image" className='background-image'/>
        <div className="container">
          <div className="logo">
            <img src={titleMovie} alt="titleMovie" />

          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={()=>{
              navigate('/player')
            }}>
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle/> More Info
            </button>
          </div>
        </div>

      </div>
      <Slider movies = {movies}/>
      

    </Container>
  )
}

const Container = styled.div`
  background-color: black;
  .body{
    position: relative;
    .background-image{
      filter: brightness(60%)
    }
    img{
      height: 100vh;
      width: 100vw;
    }
    .container{
      position: absolute;
      bottom: 6rem;
    }
    .logo{
      img{

        width: 100%;
        height: 100%;
        margin-left: 8rem;
      }
    }
    .buttons{
      gap: 5rem;
      margin: 8rem;
      button{
        padding: 1rem 2rem;
        gap: 1rem;
        font-size: 1.6rem;
        font-weight:500;
        border: none ;
        cursor: pointer;
        border-radius:0.4rem;
        &:hover{
          opacity: 0.8;
        }


      }
    }
  }
  
`


