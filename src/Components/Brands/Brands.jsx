import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [mainLoader, setMainLoader] = useState(false);

  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(data.data);
    setMainLoader(false);
  }

  useEffect(() => {
    setMainLoader(true);
    getBrands();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <>
        {mainLoader && (
          <div id="loader">
            <i className="fa fa-spin fa-spinner fa-5x"></i>
          </div>
        )}
        <div className="container py-5">
          <div className="row">
            {brands.map((brand) => (
              <div key={brand._id} className="col-md-3">
                <Link>
                  <img src={brand.image} className="w-100" alt="" />
                  <h5 className="text-main text-center">{brand.name}</h5>
                </Link>{" "}
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
