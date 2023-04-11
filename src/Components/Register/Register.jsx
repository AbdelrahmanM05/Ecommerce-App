import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setloader] = useState(false);

let navigate = useNavigate();


  async function register(values) {
    setloader(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setloader(false);
      });
    if (data.message == "success") {
      setloader(false);
      setErrorMessage(null);
      navigate("/login")
    }
  }

  let mySchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "there is no name less than 3 letters")
      .max(12, "there is no name longer than 12 letters"),
    email: yup.string().required("email is required").email("invalide email"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-z][a-z0-9]{7}$/,
        "password must start with capital letter and its length is 8 lettters"
      ),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password"), "rePassword not like password"]),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "not egyption phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => register(values),
  });

  return (
    <div className="w-75 mx-auto my-5">
      <h3 className="mb-3">Register Now :</h3>
      {errorMessage ? (
        <p className="alert alert-danger">{errorMessage}</p>
      ) : (
        ""
      )}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="alert alert-danger">{formik.errors.name}</p>
        ) : (
          ""
        )}
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

        <label htmlFor="rePassword">rePassword :</label>
        <input
          type="password"
          className="form-control mb-3"
          id="rePassword"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <p className="alert alert-danger">{formik.errors.rePassword}</p>
        ) : (
          ""
        )}

        <label htmlFor="phone">Phone :</label>
        <input
          type="tel"
          className="form-control mb-3"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
        ) : (
          ""
        )}

        {loader ? (
          <button
            className="btn btn-main text-white"
            onSubmit={formik.handleSubmit}
          >
            <i className="fa fa-spin fa-spinner"></i>
          </button>
        ) : (
          <button
          disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main text-white"
            onSubmit={formik.handleSubmit}
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
