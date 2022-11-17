import React,{ useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Toolbar, Typography, Container, Link} from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BUY_COUPON } from '../../queries/queries';
import Buy from './Buy';
import Appbar from '../home/Appbar';

const cards = [1, 2, 3];

const theme = createTheme();

export default function Album(props) {

  const [coupon, setCoupon] = useState([]);
  const [point, setPoint] = useState(0);
  const [buyCoupon] = useMutation(BUY_COUPON);

  useEffect(() => {
    if(props !== undefined && props.coupon !== undefined){
      setCoupon(props.coupon.coupons)
      setPoint(props.point)
    }
  }, [props])

  console.log(point)

  const handleBuy = () => {
    
  }
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '',
            pt: 8,
            pb: 6,
            // image="/static/images/cards/live-from-space.jpg"
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Solvit Coupon Shop
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                solvit에서 모은 포인트로 쿠폰을 구매해 보세요! <br/>
                구매한 쿠폰은 도서 구매시 사용가능
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {coupon?coupon.map((a, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{textAlign: 'left'}}>
                      {a.name}
                    </Typography>
                    <Typography sx={{textAlign: 'left'}}>
                      {a.price} 포인트
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button 
                    size="small" 
                    variant='contained' 
                    color='error' 
                    sx={{marginLeft: 'auto'}}
                    onClick={()=>console.log(a.id)}
                    >
                      구매하기
                    </Button> */}
                    <Buy coupon={a} />
                  </CardActions>
                </Card>
              </Grid>
            )):null}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}