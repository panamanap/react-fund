import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context';
import Error from '../pages/Error';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = React.useContext(AuthContext);

    if (isLoading) {
      return <Loader/>
    }

        return isAuth ? (
            <Switch>
                {privateRoutes.map((route) => (
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Redirect to="/posts" />
            </Switch>
        ) : (
            <Switch>
                {publicRoutes.map((route) => (
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Redirect to="/login" />
            </Switch>
        );
};

export default AppRouter;
