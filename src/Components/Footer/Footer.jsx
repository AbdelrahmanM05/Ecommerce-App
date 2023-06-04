import React from "react";
import styles from "./Footer.module.css";
import amazonImg from "../../imgs/Amazon-Pay.png";
import masterImg from "../../imgs/images.png";
import americanImg from "../../imgs/American-Express-Emblem.png";
import paypalImg from "../../imgs/PayPal.svg.png";
import playstoreImg from "../../imgs/png-transparent-google-play.png";
import applestoreImg from "../../imgs/itunes-app.png";

export default function Footer() {
  return (
    <footer className="bg-main-light m-5 py-5">
      <div className="container ">
        <h3>Get The FreshCart app</h3>
        <p className="text-secondary">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control w-75 me-4"
            placeholder="Email"
          />
          <button className="btn bg-main text-white">Add The app</button>
        </div>
        <div className="d-flex pt-3 border-top border-1">
          <div className="d-flex ">
            <p className="me-1">Payment Partners</p>
            <div className="pay-imgs">
              <img src={americanImg} alt="" />
              <img src={amazonImg} alt="" />
              <img src={masterImg} alt="" />
              <img src={paypalImg} alt="" />
            </div>
          </div>
          <div className="d-flex align-items-center ms-auto">
            <p className="mb-0 me-2">Get deliveries with Freshcart</p>
            <div className="galleries-img">
              <img src={playstoreImg} alt="" />
              <img src={applestoreImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
