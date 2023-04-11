import React from 'react';
import styles from './Products.module.css';
import { Helmet } from "react-helmet";


export default function Products() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <h1>Products</h1>
    </>
  );
}
