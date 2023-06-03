import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function LoginForm({ onAuthorizedUser, t, errorText }) {
  // console.log(errorText);
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState("");

  function onChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function onChangeLogin(evt) {
    setLogin(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAuthorizedUser({
      login: login,
      password: password,
    });

    setPassword("");
    setLogin("");
  };

  return (
    <section className="Login-form">
      <p className="Login-form-welcome">{t("Entry")}</p>
      <form onSubmit={handleSubmit} className="Login-form-form" noValidate>
        <label htmlFor="name" className="Login-form-label">
          {t("Login")}
        </label>
        <input
          className="Login-form-input"
          id="name-authorized"
          required
          name="login-name"
          type="text"
          value={login}
          onChange={onChangeLogin}
        />
        <label htmlFor="password" className="Login-form-label">
          {t("Password")}
        </label>
        <input
          className="Login-form-input"
          id="password-authorized"
          required
          name="login-password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <p className="Login-form-error">{errorText}</p>
        <button type="submit" className="Login-form-button">
          {t("Enter")}
        </button>
      </form>
    </section>
  );
}

// Head.propTypes = {
//   user: PropTypes.node,
// };

export default memo(LoginForm);
