import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailPut(e) {
    setEmail(e.target.value);
  }

  function handlePasswordPut(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ password, email });
  }

  return (
    <section className="auth auth_type_register">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <input
            value={email}
            name="email"
            className="auth__input auth__input_type_email"
            type="email"
            required
            placeholder="Email"
            onChange={handleEmailPut}
          />
          <input
            value={password}
            name="password"
            className="auth__input auth__input_type_password"
            type="password"
            required
            placeholder="Пароль"
            onChange={handlePasswordPut}
          />
        </div>
        <button type="submit" className="auth__submit-btn">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__subtitle">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
