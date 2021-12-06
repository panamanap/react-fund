import React from 'react';
import MyButton from '../component/UI/button/MyButton';
import MyInput from '../component/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
    const { setIsAuth } = React.useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    };

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput text="type" placeholder="Введите логин" />
                <MyInput text="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;
