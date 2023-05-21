import axios from "axios";
import { useState, createContext, useEffect } from "react";

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

function generateOnlinePayment(cartId,shippingAddress) {
  return axios
    .post(
      `https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      { shippingAddress },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function getIntialCart() {
    let { data } = await getCart();
    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
      setCartId(data.data._id);
    }
  }

  useEffect(() => {
    getIntialCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        cartId,
        createCart,
        getCart,
        updateCart,
        removeItem,
        clearCart,
        generateOnlinePayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
