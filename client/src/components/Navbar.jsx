import React,{useState} from 'react'

import styled from 'styled-components'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';






export default function Navbar({scroll}) {
    const [showSearch,setShowSearch] = useState(false) 
    const [inputClick,setInputClick] = useState(false) 
    

    const links = [
        {name: 'Home', link: '/' },
        {name: 'TV Shows', link: '/tv' },
        {name: 'Movies', link: '/movies' },
        {name: 'My List', link: '/mylist' },
    ]
    const navigate = useNavigate()
    onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
    return (
    <Container  >
        <nav className={`flex j-between a-center ${scroll ? 'scrolled':""}` } >
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img src={logo} alt="logo" />

                </div>
                <ul className="links flex">
                    {
                        links.map((data,index) =>{
                            return(
                                <li key = {index}>
                                    <Link to = {data.link}>{data.name}</Link> 
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search flex ${showSearch ? "showSearch": ""} flex`}>
                    
                    <button onFocus={()=>setShowSearch(true)} onBlur={()=>
                    {
                        if(!inputClick) setShowSearch(false);
                    }}>
                        <FaSearch/>
                    </button>
                    <input type="text" placeholder='Search' 
                    onMouseEnter ={()=> setInputClick(true)}
                    onMouseLeave={()=>setInputClick(false)}
                    onBlur={()=>{
                        setShowSearch(false)
                        setInputClick(false)
                    }}/>   
                    
                </div>
                <button onClick={()=>signOut(firebaseAuth)}>
                    <FaPowerOff/>
                </button>
            </div>
        </nav>
    </Container>
  )
}

const Container = styled.div`
    .scrolled {
    background-color: black;
    box-shadow: 0 2px 4px 2px black;
    }
    nav {
        position: sticky;
        top: 0;
        height: 8rem;
        width: 100%;
        position: fixed;
        z-index: 21;
        padding: 0 4.8rem;
        transition: 0.3s ease-in-out;
        .left{
            gap: 2rem;
            .brand{
                img{
                    height: 6rem;

                }
            }
            .links{
                list-style-type: none;  
                gap: 2.8rem;
                li{
                    a{
                        color: white;
                        text-decoration: none;
                        font-size:1.8rem;
                    }
                }
            }
        }
        .right{
            gap : 1.2rem;
            button{
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus{
                    outline: none;
                }
                svg{
                    color: #f34242;
                    font-size: 1.8rem;
                }
            }
            .search{
                gap: 0.6rem;
                align-items: center;
                justify-content: center;
                padding: 0.4rem;
                padding-left: 0.4rem;
                button{
                    background-color: transparent;
                    svg{
                        color: white;
                        font-size: 1.8rem;

                    }
                }
                input {
                    width: 0;
                    opacity:0;
                    visibility: hidden;
                    transition: .3s, ease-in-out;
                    background-color: transparent;
                    border   : none ;
                    color: white;
                    &:focus{
                        outline: none;

                    }
                }
            }
            .showSearch {
                border: 1px solid white;
                background-color: rgba(0, 0, 0, 0.6);
                input {
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
                }
            }
        }
    }
`
