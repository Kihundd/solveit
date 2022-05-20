// import React, {useState} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import Logo from './Logo'
import Grid from '@mui/material/Grid';

function Menu() {
    return (
        <div className="nav-container">
            <Navbar bg="white" variant="light" className='Nav-Container'>
                {/* <Container> */}
                <Nav className="me-auto">
                    <Grid container xs >
                        <Nav.Link >문제 목록</Nav.Link>
                        <Nav.Link >문제 생성</Nav.Link>
                        <Nav.Link >문제 관리</Nav.Link>
                        <Nav.Link >게시판</Nav.Link>
                        <Nav.Link >랭킹</Nav.Link>
                        <Nav.Link >상점</Nav.Link>
                    </Grid>
                    
                </Nav>
                {/* </Container> */}
            </Navbar>
        </div>
    )
}
export default Menu