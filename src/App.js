import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Context/CartContext";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Chechout from "./Components/Chechout/Chechout";
import Allorders from "./Components/Allorders/Allorders";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser();
    }
  }, []);

  function saveUser() {
    let encodeToken = localStorage.getItem("userToken");
    let decodeToken = jwtDecode(encodeToken);
    setUserData(decodeToken);
  }

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        ,
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Chechout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders userData={userData} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login saveUser={saveUser} />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <RouterProvider router={routes}></RouterProvider>;
      <Toaster />
    </CartContextProvider>
  );
}

export default App;
