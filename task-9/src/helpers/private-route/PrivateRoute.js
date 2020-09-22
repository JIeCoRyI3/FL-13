import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        +localStorage.getItem('isLogin')
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;
