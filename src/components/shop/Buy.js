import React, { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Card, CardMedia, Typography, CardContent, CardActions} from '@mui/material';
import { useMutation } from '@apollo/client';
import { height } from '@mui/system';
import { BUY_COUPON } from '../../queries/queries';

function Buy(props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [price, setPrice] = useState('');
    const [couponId, setCouponId] = useState(0);
    const [count, setCount] = useState(1);
    const [buyCoupon] = useMutation(BUY_COUPON);

    useEffect(() => {
      if(props !== undefined)
        setCouponId(props.coupon.id)
        setName(props.coupon.name)
        setExp(props.coupon.explanation)
        setPrice(props.coupon.price)
    }, [props])

    const handleClickOpen = () => {
        setOpen(true);
        console.log(couponId)
    };
    const handleClose = () => {
        setOpen(false);
        setPrice(props.coupon.price)
        setCount(1)
    };
    const handleCount = e => {
        const n = Number(e.target.value)
        let c = count
        let p = price
        if(count < n){
            setCount(c+1)
        } else if(count > n && c !== 1){
            setCount(c-1)
        }
    }

    const handleSubmit = async() => {
        const response = await buyCoupon({variables: {
            couponID: couponId,
            count: count
        }})
        console.log(response)
        if(response.data.issueCoupon.success == true){
            alert('성공적으로 구매를 완료하였습니다.')
            setOpen(false)
        } else{
            alert('보유하신 포인트가 부족합니다.')
        }
    }

    return (
        <>
        <Button 
            size="small" 
            variant='contained' 
            color='error' 
            sx={{marginLeft: 'auto'}}
            onClick={handleClickOpen}
        >
            구매하기
        </Button>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                선택한 쿠폰을 구매하시겠습니까?
            </DialogTitle>
            <DialogContent>
                {/* <Card
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                      width: '100%',
                      height: '100%'
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{textAlign: 'left'}}>
                      {name}
                    </Typography>
                    <Typography>
                      {exp}
                    </Typography>
                  </CardContent>
                </Card> */}
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://source.unsplash.com/random"
                            alt="Live from space album cover"
                        />
                    </Box>
                    <CardContent sx={{ flex: '0 1 auto' }}>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {exp}
                        </Typography>
                    </CardContent>
                   
                </Card>
                <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
                    <TextField 
                    label="포인트"
                    value={price*count} 
                    onChange={(e)=>{
                        setPrice(e.target.value)
                        console.log(price)}}
                    />
                    <TextField
                        width="50px"
                        id="outlined-number"
                        label="구매 수"
                        type="number"
                        value={count}
                        onChange={handleCount}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
                
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>취소</Button>
                <Button variant='contained' color='error' onClick={handleSubmit}>구매</Button>
            </DialogActions>


        </Dialog>
        </>
    )
}

export default Buy