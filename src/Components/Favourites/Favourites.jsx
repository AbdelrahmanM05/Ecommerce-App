import React from "react";
import styles from "./Favourites.module.css";
import axios from "axios";

export default function Favourites() {
  let headers = { token: localStorage.getItem("userToken") };

  async function getList() {
    let data = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/wishlist`,
      headers
    );
  }

  return <div>Favourites</div>;
}
