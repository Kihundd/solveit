import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from '../../pages/isLogin';

const PublicRoute = ({ children }) => {
    return !isLogin ? <Navigate to='/' /> : children;
}
export default PublicRoute