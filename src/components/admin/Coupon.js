import React,{ useState, useEffect } from 'react';
import Appbar from '../home/Appbar';
import CreateCoupon from './CreateCoupon';
import DeleteCoupon from './DeleteCoupon';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Toolbar, Typography, Container, Link} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_COUPON } from '../../queries/queries';

export default function Coupon() {
    const [coupon, setCoupon] = useState([]);
    const {loading, error, data} = useQuery(GET_COUPON);

    useEffect(() => {
        if(data !== undefined){
            setCoupon(data.coupons)
        }
    }, [data])
    console.log(coupon)
    
  return (
    <>
      <Appbar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            // pt: 8,
            pb: 1,
            
          }}
        >
          <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>
            <Typography
            component="h1"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{display: 'inline-block'}}
            >
                쿠폰 목록
            </Typography>
            <CreateCoupon coupons={coupon} />
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {coupon? coupon.map((a, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                    //   pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {a.name}
                    </Typography>
                    <Typography>
                      {a.explanation}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <DeleteCoupon cid={a.id} />
                  </CardActions>
                </Card>
              </Grid>
            )): null}
          </Grid>
        </Container>
      </main>
      </>
  );
}
