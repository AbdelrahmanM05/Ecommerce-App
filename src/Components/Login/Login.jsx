import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUser }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setloader] = useState(false);

  let navigate = useNavigate();

  async function login(values) {
    setloader(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setloader(false);
      });
    if (data.message == "success") {
      setloader(false);
      localStorage.setItem("userToken", data.token);
      saveUser();
      setErrorMessage(null);
      navigate("/");
    }
  }

  let mySchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{7}/,
        "password must start with capital letter and its length is 8 lettters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => login(values),
  });

  return (
    <div className="w-75 mx-auto my-5">
      <h3 className="mb-3">Login Now :</h3>
      {errorMessage ? <p className="alert alert-danger">{errorMessage}</p> : ""}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}

        {loader ? (
          <button
            className="btn bg-main text-white"
            onSubmit={formik.handleSubmit}
          >
            <i className="fa fa-spin fa-spinner"></i>
          </button>
        ) : (
          <button
            className="btn bg-main text-white"
            onSubmit={formik.handleSubmit}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}
