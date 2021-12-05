import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './component/AppRouter';
import Navbar from './component/UI/navbar/Navbar';

import './styles/App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
