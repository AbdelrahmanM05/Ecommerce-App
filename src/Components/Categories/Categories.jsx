import React, { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Helmet } from "react-helmet";
import { CategoriesContext } from "../../Contexts/CategoriesContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const [mainLoader, setMainLoader] = useState(false);
  const [categories, setCategories] = useState([]);

  let { getCategories } = useContext(CategoriesContext);
  async function handleGetCategories() {
    let { data } = await getCategories();
    setCategories(data.data);
    setMainLoader(false);
  }

  useEffect(() => {
    setMainLoader(true);
    handleGetCategories();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <>
        {mainLoader && (
          <div id="loader">
            <i className="fa fa-spin fa-spinner fa-5x"></i>
          </div>
        )}
        <div className="container py-5">
          <div className="row">
            {categories.map((category) => (
              <div key={category._id} className="col-md-3">
                <Link>
                  <img
                    src={category.image}
                    className="w-100"
                    height={400}
                    alt=""
                  />
                  <h5 className="text-main text-center">{category.name}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
