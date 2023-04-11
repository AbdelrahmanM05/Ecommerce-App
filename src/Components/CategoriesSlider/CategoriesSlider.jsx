import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
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
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="py-5">
            <img src={category.image} height={300} width={"100%"} alt="" />
            <h3 className="h6">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
