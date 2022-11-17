import React, { useEffect } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useMutation } from "@apollo/client"
import { DELETE_REPORT } from "../../queries/reportQueries"

function DeleteReport(props) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('');
    const [deleteReport, {loading:deleteLoading, error:deleteError, data: deleteData}] = useMutation(DELETE_REPORT);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const deleteHandler = async (id) => {
        const response = await deleteReport({variables: {id: id}})
        console.log(response)
        setOpen(false)
    }
    
    return (
        <div>
            <Button color="primary" size='small' onClick={handleClickOpen}>
                삭제
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign='center'>삭제</DialogTitle>
                <DialogContent>
                    <Typography>해당 신고내역을 삭제하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="outliend" color="primary" onClick={()=>{
                        console.log(props.reportInfo.id)
                        setOpen(false)
                        deleteHandler(props.reportInfo.id)
                    }}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteReport
