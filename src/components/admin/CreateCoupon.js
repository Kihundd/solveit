import { useMutation } from '@apollo/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React,{ useState, useEffect } from 'react'
import { CREATE_COUPON } from '../../queries/adminQueries'
import AddBoxIcon from '@mui/icons-material/AddBox';

function CreateCoupon(props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [price, setPrice] = useState('');
    const [CreateCoupon,{loading, error, data}] = useMutation(CREATE_COUPON);
    const [a, setA] = useState();

    useEffect(() => {
      setA(props.coupons)
    }, [props])
    
    const handleClickOpen = () => {
        setOpen(true);
        
    };
    const handleClose = () => {
        setOpen(false);
        a.pop()
        console.log(a)
    };
    const handleSumbit = async() => {
        const response = await CreateCoupon({variables: {
            name: name,
            explanation: exp,
            price: Number(price)
        }})
        setOpen(false)
        console.log(response)
    }

    return (
        <>
        <Stack direction="row" spacing={2} sx={{marginLeft: 'auto', float: 'right'}}>
            <Button variant="contained" color='info' onClick={handleClickOpen} sx={{}} startIcon={<AddBoxIcon />}>
                쿠폰생성
            </Button>
        </Stack>
        {/* <Button variant='contained' onClick={handleClickOpen} sx={{float: 'right'}}>
            쿠폰생성
        </Button> */}
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                새로운 쿠폰 생성
            </DialogTitle>
            <DialogContent>
                <TextField 
                    label="쿠폰이름" 
                    value={name}
                    fullWidth
                    sx={{mb:2, mt:1}} 
                    onChange={(e)=>{
                        setName(e.target.value)
                        console.log(name)}}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="쿠폰 설명"
                    value={exp}
                    multiline
                    fullWidth
                    rows={4}
                    sx={{mb:2}}
                    onChange={(e)=>{
                        setExp(e.target.value)
                        console.log(exp)}}
                />
                <TextField 
                    label="포인트"
                    fullWidth
                    value={price} 
                    onChange={(e)=>{
                        setPrice(e.target.value)
                        console.log(price)}}
                />
            </DialogContent>
            <DialogActions sx={{pr: '24px', pb: '16px', pt: 0}}>
                <Button variant="outlined" onClick={handleClose} >취소</Button>
                <Button variant='contained' onClick={handleSumbit}>생성</Button>
            </DialogActions>


        </Dialog>
        </>
    )
}

export default CreateCoupon
