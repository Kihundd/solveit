// import React, {useState} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import Logo from './Logo'
import Grid from '@mui/material/Grid';

function MenuList() {
    return (
        <div className="nav-container">
            <Navbar bg="white" variant="light" className='Nav-Container'>
                {/* <Container> */}
                <Nav className="me-auto">
                    <Grid container >
                        <Grid item xs={2}>
                            <Nav.Link >문제 목록</Nav.Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Nav.Link href="/CreateTest">문제 생성</Nav.Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Nav.Link >문제 관리</Nav.Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Nav.Link >문제 게시판</Nav.Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Nav.Link >문제 랭킹</Nav.Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Nav.Link >상점</Nav.Link>
                        </Grid>
                        
                    </Grid>
                    
                </Nav>
                {/* </Container> */}
            </Navbar>
        </div>
    )
}
export default MenuList