import logo from '../../logo2.png';
import styled from 'styled-components';

const HeaderLogo = styled.img`
width: 100px;
height: 30px;
`
function Logo() {
    return (

        <HeaderLogo src={logo} />

    )
}
export default Logo