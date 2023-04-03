import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import actionTypes from "../redux/actions/actionTypes";

const Logout = () => {
  const { loginState } = useSelector((state) => state);
  const dispatch=useDispatch()
  return (
    <div
      style={{
        position: "fixed",
        right: 10,
        bottom: 10,
        zIndex: 100,
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#E5E7E9",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
        <span>Giriş Yapan Kullanıcı: </span>
        <span style={{marginLeft:"5px"}} className="text-primary">{loginState.username}</span>
        <span
        onClick={()=>dispatch({type: actionTypes.loginActions.LOGOUT})}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          <LogoutOutlined style={{ color: "#146C94" }} />
        </span>
      </p>
    </div>
  );
};

export default Logout;
