import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { authorization } from '../utils/Auth';
import Header from './Header';
function Login(props) {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    props.onSignin(email, password);
      
  }

  return (
    <>
    <Header>
      <Link to="/sign-up" className="header__menu-item">
        Регистрация
      </Link>
    </Header>
    <div className='auth-section'>
      <form className="auth-section__form" onSubmit={handleSigninSubmit}>
        <h1 className="auth-section__title">Вход</h1>
        <input
          className="auth-section__input"
          type="email"
          onChange={handleEmailChange}
          placeholder="Email"
          value={email || ''}
          required
        />
        <input
          className="auth-section__input"
          type="password"
          onChange={handlePasswordChange}
          placeholder="Пароль"
          value={password || ''}
          required
        />
        <button type="submit" className="auth-section__button">Войти</button>
        <p className="auth-section__text">
            Еще не зарегистрированы?
            <Link to="/sign-up" className="auth-section__link">
              {" "}
              Регистрация
            </Link>
          </p>
      </form>
    </div>
    </>
  )
}



export default Login;
