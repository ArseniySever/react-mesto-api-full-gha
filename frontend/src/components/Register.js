import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../utils/Auth';
import Header from './Header';

function Register(props) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    props.onRegist(email, password);
    }




  return (
    <>
    <Header>
      <Link to="/sign-in" className="header__menu-item">
        Войти
      </Link>
    </Header>
    <div className='auth-section'>
      <form className="auth-section__form" onSubmit={handleRegisterSubmit}>
        <h1 className="auth-section__title">Регистрация</h1>
        <input
          className="auth-section__input"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          className="auth-section__input"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Пароль"
          required
        />
        
        <button type="submit" className="auth-section__button">Зарегистрироваться</button>
        <p className="auth-section__text">Уже зарегистрированы? <Link className="auth-section__link" to="/sign-in">Войти</Link></p>
      </form>
    </div>
    </>
  );
}

export default Register;
