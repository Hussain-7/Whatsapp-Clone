import { Button } from "@material-ui/core";
import React from "react";
// For Firebase
import { auth, provider } from "../../config/firebase";
// For Context Api
import { useStateValue } from "../../contextApi/StateProvider";
import { actionTypes } from "../../contextApi/reducer";
import "./Login.css";

export const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};
export default Login;
