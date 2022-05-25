import logo from '../Logo_Login.jpg';
import styled from 'styled-components';

const HeaderLogo = styled.img`
width: 200px;
height: 150px;

`
function Logo() {
    return (

        <HeaderLogo src={logo} />

    )
}
export default Logo