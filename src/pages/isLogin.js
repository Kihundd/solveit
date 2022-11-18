import Cookies from 'js-cookies';

const isLogin = () => !!Cookies.getItem('token')
export const removeToken = () => Cookies.removeItem('token');

export default isLogin;
