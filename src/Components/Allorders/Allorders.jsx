import React, { useEffect, useState } from "react";
import styles from "./Allorders.module.css";
import axios from "axios";
// api/v1/orders/user/6407cf6f515bdcf347c09f17

export default function Allorders({ userData }) {
  const [mainLoader, setMainLoader] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  // async function getOrders() {
  //   let { data } = await axios.get(
  //     `https://route-ecommerce-app.vercel.app/api/v1/orders/user/`
  //   );
  //   // setAllOrders(data.data);
  //   console.log(data.data);
  //   setMainLoader(false);
  // }

  // useEffect(() => {
  //   setMainLoader(true);
  //   getOrders();
  // }, []);

  return (
    <>
      <div className="container text-center vh-100">
        <h1 className="bg-main text-white">Order Is Set</h1>
      </div>
    </>
  );
}
