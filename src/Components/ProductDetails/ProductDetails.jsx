import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [mainLoader, setMainLoader] = useState(false);
  let { createCart, setNumOfCartItems } = useContext(CartContext);

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    console.log(data.data);
    setMainLoader(false);
  }

  async function generateCart(id) {
    let response = await createCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        position: "bottom-right",
      });
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message, {
        position: "bottom-right",
      });
    }
  }

  useEffect(() => {
    setMainLoader(true);
    getProductDetails();
  }, []);
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {mainLoader && (
        <div id="loader">
          <i className="fa fa-spin fa-spinner fa-5x"></i>
        </div>
      )}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {productDetails.images?.map((image, index) => (
                <div key={index} className="py-5">
                  <img
                    src={image}
                    className="w-100 h-50"
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-md-8">
            <div>
              <h1 className="h3 mb-3">{productDetails.title}</h1>
              <p className="mb-3">{productDetails.description}</p>
              <div className="d-flex justify-content-between mb-3">
                <p>{productDetails.price}EGP</p>
                <p>
                  <i className="fa fa-star rating-color"></i>
                  {productDetails.ratingsAverage}
                </p>
              </div>
              <button
                onClick={() => generateCart(productDetails._id)}
                className="btn bg-main w-100 text-white"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
