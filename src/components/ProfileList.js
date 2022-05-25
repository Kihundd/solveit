import { Navbar, Container, Nav } from 'react-bootstrap';
import Grid from '@mui/material/Grid';

function ProfileList() {
    return (
        <div className="nav-container">
            <Navbar bg="white" variant="light" className='Nav-Container'>
                <Nav className="me-auto">
                    <Grid container >
                        <Grid item xs={6}>
                            <Nav.Link href="/Profile">프로필설정</Nav.Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Nav.Link href="/MyCoupon">쿠폰관리</Nav.Link>
                        </Grid>
                    </Grid>
                </Nav>
            </Navbar>
        </div>
    )
}
export default ProfileList