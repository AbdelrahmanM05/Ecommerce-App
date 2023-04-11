import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [mainLoader, setMainLoader] = useState(true);
  let { getCart, updateCart, removeItem } = useContext(CartContext);

  async function getCartDetails() {
    let { data } = await getCart();
    setCartItems(data);
    console.log(data);
    setMainLoader(false);
  }

  async function UpdateCartHandler(id, count) {
    setMainLoader(true);
    let { data } = await updateCart(id, count);
    setCartItems(data);
    console.log(data);
    setMainLoader(false);
  }

  async function removeItemHandler(id) {
    setMainLoader(true);
    let { data } = await removeItem(id);
    setCartItems(data);
    console.log(data);
    setMainLoader(false);
  }

  useEffect(() => {
    setMainLoader(true);
    getCartDetails();
  }, []);

  return (
    <>
      {/* <Online>Only shown when you're online</Online> */}
      <Offline>Only shown offline (surprise!)</Offline>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop Cart</title>
      </Helmet>
      {mainLoader && (
        <div id="loader">
          <i className="fa fa-spin fa-spinner fa-5x"></i>
        </div>
      )}
      {cartItems && cartItems.data && (
        <div className="container py-5 my-5">
          <div className="bg-main-light p-5">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>Cart Details</h3>
                <h4 className="mb-3">
                  Total Price : {cartItems.data.totalCartPrice} EGP
                </h4>
              </div>
              <div>
                <button className="btn btn-danger">
                  <i className="fa-solid fa-x"></i> Clear
                </button>
              </div>
            </div>
            {cartItems.data.products.map((product) => (
              <div
                key={product.product._id}
                className="row border-info border-bottom py-2 mb-3"
              >
                <div className="col-md-1 mb-2">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between mb-2">
                  <div>
                    <h4>{product.product.title}</h4>
                    <p className="text-main">{product.price} EGP</p>
                    <button
                      onClick={() => removeItemHandler(product.product._id)}
                      className="btn text-danger"
                    >
                      <i className="fa-solid fa-trash"></i> Remove{" "}
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn bg-outline-main"
                      onClick={() =>
                        UpdateCartHandler(
                          product.product._id,
                          product.count + 1
                        )
                      }
                    >
                      +
                    </button>
                    <p className="mb-0 mx-3">{product.count}</p>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        UpdateCartHandler(
                          product.product._id,
                          product.count - 1
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
