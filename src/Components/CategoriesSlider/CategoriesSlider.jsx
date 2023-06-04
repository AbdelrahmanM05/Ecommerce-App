import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";
import { CategoriesContext } from "../../Contexts/CategoriesContext";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [mainLoader, setMainLoader] = useState(false);
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <>
      {mainLoader && (
        <div id="loader">
          <i className="fa fa-spin fa-spinner fa-5x"></i>
        </div>
      )}
      <div className="container">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="py-5">
              <Link>
                <img src={category.image} height={400} className='w-100' alt="" />
                <h3 className="h6">{category.name}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
