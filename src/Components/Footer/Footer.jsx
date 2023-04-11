import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-main-light m-5 py-5">
      <div className="container ">
        <h3>Get The FreshCart app</h3>
        <p className="text-secondary">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="d-flex">
          <input
            type="text"
            className="form-control w-75 me-4"
            placeholder="Email"
          />
          <button className="btn bg-main text-white">Add The app</button>
        </div>
      </div>
    </footer>
  );
}
