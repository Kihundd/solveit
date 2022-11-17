import React, { useState, useEffect} from 'react'
import ProfileAppBar from './PorfileAppbar'
import { useQuery } from '@apollo/client'
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Toolbar, Typography, Container, Link} from '@mui/material';


const card = [1,2,3]
function MyCouponList(props) {
    const [myCoupon, setMyCoupon] = useState([]);


    useEffect(() => {
      if(props !== undefined){
        setMyCoupon(props.myCoupons)
      }
    }, [props])

    return (
        <>
            <ProfileAppBar />
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 3,
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
                    구매한 쿠폰 목록
                </Typography>
            </Container>
            </Box>
            <Container sx={{ py: 4 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {myCoupon? myCoupon.map((a, index) => (
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
                            {a.coupon.name}
                        </Typography>
                        <Typography>
                            {a.coupon.explanation}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='success' sx={{marginLeft: 'auto'}}>사용하기</Button>
                    </CardActions>
                    </Card>
                </Grid>
                )): null}
            </Grid>
            </Container>
        </>
    )
}

export default MyCouponList