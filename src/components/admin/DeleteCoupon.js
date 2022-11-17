import React, { useState, useEffect } from 'react'
import { DELETE_COUPON } from '../../queries/adminQueries';
import { useMutation } from '@apollo/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteCoupon(props) {
    const [open, setOpen] = useState(false);
    const [couponIds, setCouponIds] = useState([]);
    const [couponId, setCouponId] = useState(0);
    const [deleteCoupon] = useMutation(DELETE_COUPON);

    useEffect(() => {
      if(props !== undefined)
        setCouponId(props.cid)
        setCouponIds(...couponIds, props.cid)
    }, [props])

    const handleClickOpen = () => {
        setOpen(true);
        console.log(couponId)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async() => {
        const response = await deleteCoupon({variables: {
            couponID: couponId,
        }})
        setOpen(false)
        console.log(response)
    }

    return (
    <>
        <Stack direction="row" spacing={2} sx={{marginLeft: 'auto'}}>
            <Button size='small' variant="contained" color='error' startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                삭제하기
            </Button>
        </Stack>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                선택한 쿠폰을 삭제하시겠습니까?
            </DialogTitle>
            <DialogActions>
                <Button variant='outlined' size='small' onClick={handleClose}>취소</Button>
                <Button variant='contained' size='small' color='error' onClick={handleDelete}>삭제</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default DeleteCoupon