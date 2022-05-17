import logo from '../Logo_Login.jpg';
import styled from 'styled-components';


let HeaderLogo = styled.img`
width: 200px;
height: 150px;

`
function Logo() {
    return (
        <HeaderLogo src={logo}></HeaderLogo>
    )
}
export default Logo