import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import isLogin from './isLogin';

const PrivateRoute = ({ children }) => {
    return !isLogin() ? <Navigate to="/Login" replace="false" /> : children;
}
export default PrivateRoute