import Cookies from 'js-cookies';

const isLogin = () => !!Cookies.getItem('token')
export default isLogin;
