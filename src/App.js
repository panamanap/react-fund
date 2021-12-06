import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './component/AppRouter';
import Navbar from './component/UI/navbar/Navbar';
import { AuthContext } from './context';

import './styles/App.css';

function App() {
    const [isAuth, setIsAuth] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isLoading
            }}
        >
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
