import React, { useEffect, useState } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function FeatureProducts() {
  let { createCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [mainLoader, setMainLoader] = useState(false);

  async function generateCart(id) {
    let response = await createCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        position: "bottom-right",
        className: "border border-success border-2 box-shadow text-center  ",
      });
    } else {
      toast.error(response.data.message, {
        position: "bottom-right",
        className: "border border-success border-2 box-shadow text-center  ",
      });
    }
  }

  async function getProducts() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setAllProducts(data.data);
    console.log(data.data);
    setMainLoader(false);
  }

  useEffect(() => {
    setMainLoader(true);
    getProducts();
  }, []);

  return (
    <>
      {mainLoader && (
        <div id="loader">
          <i className="fa fa-spin fa-spinner fa-5x"></i>
        </div>
      )}
      <div className="container py-5">
        <div className="row">
          {/* {allProducts.map((product) => (
            <div className="col-sm-4 col-md-3 col-lg-2" key={product.id}>
              <div className="product px-2 py-3">
                <Link to={`/product-details/` + product._id}>
                  <img src={product.imageCover} className="w-100" alt="" />
                  <p className="text-main">{product.category}</p>
                  <h3 className="h6">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <p>{product.price}EGP</p>
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
                <button className="btn btn-danger w-25">
                  <i className="fa fa-heart"></i>
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
