import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailPut(e) {
    setEmail(e.target.value);
  }

  function handlePasswordPut(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    onLogin({ password, email });
  }

  return (
    <section className="auth auth_type_login">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleLogin}>
        <div className="auth__input-container">
          <input
            name="email"
            className="auth__input auth__input_type_email"
            type="email"
            required
            placeholder="Email"
            onChange={handleEmailPut}
          />
          <input
            name="password"
            className="auth__input auth__input_type_password"
            type="password"
            required
            placeholder="Пароль"
            onChange={handlePasswordPut}
          />
        </div>
        <button type="submit" className="auth__submit-btn">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
