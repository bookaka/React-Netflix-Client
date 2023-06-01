import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  padding: 0 6rem;
  height: 8rem;
  .logo {
    img {
      height: 8rem;
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
`;