import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Contexts/CartContext";
import axios from "axios";

export default function Products() {
  let { createCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [mainLoader, setMainLoader] = useState(false);

  async function generateProducts() {
    setMainLoader(true);
    let { data } = await  axios
    .get(
      `https://route-ecommerce.onrender.com/api/v1/products`

    )
    .then((res) => res)
    .catch((err) => err);

    setAllProducts(data.data);
    setMainLoader(false);
  }

  useEffect(() => {
    generateProducts();
  }, []);

  async function generateCart(id) {
    let response = await createCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        position: "bottom-right",
      });
      // setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message, {
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <>
        {mainLoader && (
          <div id="loader">
            <i className="fa fa-spin fa-spinner fa-5x"></i>
          </div>
        )}
        <div className="container py-5">
          <div className="row">
            {allProducts
              .slice()
              .reverse()
              .map((product, index) => (
                <div className="col-sm-4 col-md-3 col-lg-2" key={index}>
                  <div className="product px-2 py-3">
                    <Link to={`/product-details/` + product._id}>
                      <img src={product.imageCover} className="w-100" alt="" />
                      <p className="text-main">{product.category.name}</p>
                      <h3 className="h6">
                        {product.title.split(" ").splice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <p>{product.price} EGP</p>
                        <p>
                          <i className="fa fa-star rating-color"></i>
                          {product.ratingsAverage}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => generateCart(product._id)}
                      className="btn bg-main w-75 text-white"
                    >
                      + Add
                    </button>
                    <button className="btn btn-danger w-25 text-center">
                      <i className="fa fa-heart"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    </>
  );
}
