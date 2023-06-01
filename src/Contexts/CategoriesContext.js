import axios from "axios";
import { useState, createContext, useEffect } from "react";

export let CategoriesContext = createContext(0);

function getCategories() {
  return axios
    .get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    .then((res) => res)
    .catch((err) => err);
}

export default function CategoriesContextProvider(props) {
  return (
    <CategoriesContext.Provider
      value={{
        getCategories,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
}
