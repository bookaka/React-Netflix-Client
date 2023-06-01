import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import background from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]= useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await axios.post(`http://localhost:5000/user/create/${email}`)
    } catch (error) {
      let mes = 'Invalid username or password'
      
      setError(mes);
      console.log(error.message);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h2>Login</h2>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setError('')

                  setEmail(e.target.value)}}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setError('')
                  setPassword(e.target.value)}}
                value={password}
              />
              {error && <h2>{error}</h2>}

              <button onClick={handleLogin}>Login </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2.4rem;
      height: 85vh;
      .form {
        padding: 2.4rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2.4rem;
        color: white;
        font-size: 1.6rem; 
        .container {
          gap: 2.4rem;
          input {
            padding: 0.8rem 1.2rem;
            width: 24rem;
            font-size: 1.6rem ;
            border: 1px solid black;
          &:focus {
            outline: none;
          }
          }
          h2{
          color: #e50914;
          font-size: 1.6rem;
          }
          button {
          padding: 0.8rem 1.2rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.4rem;
          font-weight: bolder;
          font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

export default Login;