import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]= useState('');
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      let mes = error.message
      if (mes.includes('invalid-email')) mes = 'Invalid email'
      if (mes.includes('Password should be at least 6 characters')||mes.includes('missing-password')) 
      mes = 'Password should be at least 6 characters'
      if (mes.includes('email-already-in-use')) mes = 'Email already in use'

      setError(mes);

    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h4>
              Ready to watch? Enter your email to create or restart membership.
            </h4>
          </div>
          <div className={`form ` }>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>{
                setError('')
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }}
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>{
                  setError('')

                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }}
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {error && <h2>{error}</h2>}
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
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
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1.2rem;
        text-align: center;
        font-size: 2.4rem;
        h1 {
          padding: 0 32rem;
        }
      }
      
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 2rem;
          font-size: 1.6rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
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
`;

export default Signup;