import { CgMenuLeftAlt } from "react-icons/cg";
import React, { useState } from 'react'
import { CgCloseO } from "react-icons/cg";
import { NavLink } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import styled from 'styled-components';
import { useCartContext } from "../contexts/cartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../styles/Button";

const Nav = () => {
  const {total_items}=useCartContext()
  const[menuIcon, setMenuIcon]=useState();
  
  const { loginWithRedirect,logout,isAuthenticated,user } = useAuth0();
  const Navbar = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;
     list-style-type: none;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
        
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }

    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .user-login--name {
    text-transform: capitalize;
  }

  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {

    .mobile-navbar-btn {
      display: inline-block;
      z-index:9999;
      border: ${({ theme }) => theme.colors.black};
      

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }

    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      /* transform-origin: top; */
      transition: all 3s linear;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 3s linear;

      .navbar-link {
        font-size: 4.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;

  return (
    <Navbar>
      <div className={menuIcon?"navbar active":'navbar'}>
        {/* <div>{(isAuthenticated)&& <h1>{user.name}</h1>}</div> */}
        <ul className='navbar-lists'>
          <li>
            <NavLink to='/' onClick={()=>setMenuIcon(false)} className='navbar-link '>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about' onClick={()=>setMenuIcon(false)} className='navbar-link'>About</NavLink>
          </li>
          <li>
            <NavLink to='/products' onClick={()=>setMenuIcon(false)} className='navbar-link'>Products</NavLink>
          </li>
          <li>
            <NavLink to='/contact' onClick={()=>setMenuIcon(false)} className='navbar-link'>Contact</NavLink>
          </li>
        {isAuthenticated && <h1>{user.name}</h1>}
        {isAuthenticated?<Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</Button>
       :<li> <Button onClick={() => loginWithRedirect()}>Log In</Button></li>} 
          <li>
            <NavLink to='/cart' onClick={()=>setMenuIcon(false)} className='navbar-link cart-trolley--link'>
              <FiShoppingCart className='cart-trolley' />
              <span className='cart-total--item'>{total_items}</span>
            </NavLink>
          </li>
        </ul>
        <div className='mobile-navbar-btn' >
        <CgMenuLeftAlt name="menu-outline" className="mobile-nav-icon" onClick={()=>setMenuIcon(true)}/>
        <CgCloseO name="close-outline"  className="mobile-nav-icon close-outline"  onClick={()=>setMenuIcon(false)}/>
        </div>
      </div>
    </Navbar>
  );
};

export default Nav;
