import React from 'react'
import styled from "styled-components";
import CardSlider from './CardSlider'

function Slider({movies}) {

  const getMovies = (from,to)=>{
   
    return movies.slice(from,to)
  }
  return (
    <Container>
      <CardSlider data={getMovies(0, 10)} title="Trending Now" />
      <CardSlider data={getMovies(10, 20)} title="New Releases" />
      <CardSlider
        data={getMovies(20, 30)}
        title="Blockbuster Movies"
      />
      <CardSlider
        data={getMovies(30, 40)}
        title="Popular on Netflix"
      />
      <CardSlider data={getMovies(40, 50)} title="Action Movies" />
      <CardSlider data={getMovies(50, 60)} title="Epics" />


    </Container>
  )
}


const  Container = styled.div`
  
`
export default Slider