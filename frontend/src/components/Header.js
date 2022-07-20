import React from "react";
import logo from '../images/header__logo.svg';
import { Link, Route, Switch } from "react-router-dom";

function Header (props) {
    return (
      <header className="header">
        <img
          className="header__logo"
          alt="лого"
          src={logo}
        />
        <nav className="header__nav"> 
        <p className="header__email">{props.email}</p>
        <Switch>
          <Route exact path='/'>
        <Link to='/sign-in' className="header__name" onClick={props.exit}>Выйти</Link>  
        </Route>
        <Route path='/sign-in'>
        <Link to='/sign-up' className="header__name">Регистрация</Link> 
        </Route>
        <Route path='/sign-up'>
        <Link to='/sign-in' className="header__name">Войти</Link>
        </Route>
        </Switch>
        </nav>
      </header>
    );
}

export default Header;