import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext(0);

let headers = { token: localStorage.getItem("userToken") };

function createCart(id) {
  return axios
    .post(
      `https://route-ecommerce.onrender.com/api/v1/cart`,
      { productId: id },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function getCart() {
  return axios
    .get(
      `https://route-ecommerce.onrender.com/api/v1/cart`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function updateCart(id, count) {
  return axios
    .put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      { count },

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function removeItem(id) {
  return axios
    .delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function clearCart() {
  return axios
    .delete(
      `https://route-ecommerce.onrender.com/api/v1/cart`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

export default function CartContextProvider(props) {
  return (
    <CartContext.Provider
      value={{ createCart, getCart, updateCart, removeItem }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
