import React, { useState, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = (event) => {
    const username = "admin";
    const password = "123456";
    event.preventDefault();
    /*2 sinide boş girince uyarı verir */
    if (!form.username && !form.password) {
      usernameRef.current.style.display = "block";
      passwordRef.current.style.display = "block";
      setTimeout(() => {
        usernameRef.current.style.display = "none";
        passwordRef.current.style.display = "none";
      }, 2000);
      return;
    }
    /*2 sinide boş girince sadece ilkinde uyarı verir */
    if (!form.username) {
      usernameRef.current.style.display = "block";
      setTimeout(() => {
        usernameRef.current.style.display = "none";
      }, 2000);
      return;
    }
    if (!form.password) {
      passwordRef.current.style.display = "block";
      setTimeout(() => {
        passwordRef.current.style.display = "none";
      }, 2000);
      return;
    }
    /*api call yapılmış gibi devam edecegiz */
    if (form.username !== username || form.password !== password) {
      setShowModal(true);
      setModalMessage("Kullanıcı adı ya da şifre yanlış");
      return;
    }

    /*
  if(form.username !== username){
    setShowModal(true)
    setModalMessage("Kullanıcı adınız yanlış")
    return
  }
  if(form.password !== password){
    setShowModal(true)
    setModalMessage("Şifreniz yanlış")
    return
  } */
    dispatch({
      type: actionTypes.loginActions.LOGIN_SUCCESS,
      payload: form.username,
    });
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "50%",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 0px 15px 0px gray",
        }}
      >
        <div>
          <label htmlFor="username" className="form-label">
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="kullanıcı adınızı giriniz"
            value={form.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
            autoComplete="off"
          />
          <p
            ref={usernameRef}
            style={{ display: "none" }}
            className="text-danger"
          >
            <small>*Kullanıcı adı boş bırakılamaz</small>
          </p>
        </div>
        <div style={{ position: "relative" }} className=" my-3">
          <label htmlFor="username" className="form-label">
            Şifre:
          </label>
          <input
            type={!showPassword ? "password" : "text"}
            className="form-control"
            id="username"
            placeholder="şifrenizi giriniz"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            autoComplete="new-password"
          />
          <div
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              cursur: "pointer",
            }}
          >
            {!showPassword ? (
              <FaEye onClick={() => setShowPassword(true)} color="#aaa" />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(false)} color="#aaa" />
            )}
          </div>
          <p
            ref={passwordRef}
            style={{ display: "none" }}
            className="text-danger"
          >
            <small>*Şifre boş bırakılamaz</small>
          </p>
        </div>
        <div className="d-flex justify-content-center my-5">
          <button type="submit" className="btn btn-primary w-50">
            GİRİŞ
          </button>
        </div>
      </form>
      <Modal
        visible={showModal}
        title="Hata"
        content={modalMessage}
        cancelButtonClick={() => setShowModal(false)}
      />
    </div>
  );
};

export default Login;
