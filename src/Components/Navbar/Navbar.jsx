import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logoimg from "../../imgs/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext";

export default function Navbar({ userData, logOut }) {

let{numOfCartItems} =useContext(CartContext)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="">
          <img src={logoimg} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="products" className="nav-link">
                  Products
                </Link>
              </li>
            </ul>
          )}
          <ul className=" navbar-nav justify-content-between align-items-center text-white ms-auto">
            <li className="me-4">
              <i className="fa-brands fa-facebook-f"></i>
            </li>
            <li className="me-4">
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li className="me-4">
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li className="nav-item position-relative me-2">
              <Link to="cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i>
                <span className="badge bg-main position-absolute top-0 start-50"> {numOfCartItems} </span>
              </Link>
            </li>

            {userData ? (
              <li className="nav-item">
                <span className="nav-link cursor-pointer" onClick={logOut}>
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
