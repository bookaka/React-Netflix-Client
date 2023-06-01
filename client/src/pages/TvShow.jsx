import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import styled from "styled-components";


function TvShow() {
    const [scroll,setScroll] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();



    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });
    window.onscroll = () => {
        setScroll(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    
  return (
    <Container>
        <Navbar scroll={scroll}/>
        <h1> No Movies avaialble for the selected genre. Please select a different genre.</h1>
        
    </Container>
  )
}

const Container = styled.div`
    h1{
        margin-top: 15rem;
        margin-left: 12rem;
    }
`

export default TvShow