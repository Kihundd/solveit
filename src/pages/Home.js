import Header from '../components/home/Header';
import Slide from '../components/home/Slide'
import HomeList from '../components/home/HomeList'
import Grid from '@mui/material/Grid';
import Appbar from '../components/home/Appbar.js';
import { useState } from 'react';
import { Typography,Box } from '@mui/material';

function Home() {
    const categories = ['새로운문제', '인기문제'];
    
    return (
        <div>
            <Appbar/>
            <div className='main-bg'>
                <h3 className='main-content'>Solve it</h3>
                <p className='main-content'>여러가지 문제를 만들고 풀어볼수 있는 사이트입니다.</p>
            </div>
            <Grid container spacing={2} sx={{maxWidth: '800px', margin: '0 auto'}}>
               <Grid item xs={6}>
                    <Box>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign='center' fontSize={15}>
                            새로운문제
                        </Typography>
                        <HomeList categories={categories[0]} />
                    </Box>
                </Grid> 
                <Grid item xs={6}>
                <Box>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign='center' fontSize={15}>
                            문제순위
                        </Typography>
                        <HomeList categories={categories[1]} />
                    </Box>
                </Grid> 
            </Grid>
        </div>
        
    )
}
export default Home