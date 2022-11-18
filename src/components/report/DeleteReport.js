import React, { useEffect } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client"
import { DELETE_REPORT, ALLREPORTS } from "../../queries/reportQueries"
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteReport(props) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('');
    const [deleteReport, {loading:deleteLoading, error:deleteError, data: deleteData}] = useMutation(DELETE_REPORT);
    const [reget] = useLazyQuery(ALLREPORTS);

    console.log(props)
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

        const regetResponse = await reget({variables: {page: 1}})
        console.log(regetResponse)
        props.setReportList(regetResponse.data.allReports)
    }
    
    return (
        <div>
            {/* <Button color="primary" size='small' onClick={handleClickOpen}>
                신고삭제
            </Button> */}
            <Button variant="outlined" size='small' color="error" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
                신고
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign='center'>삭제</DialogTitle>
                <DialogContent>
                    <Typography>해당 신고내역을 삭제하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={()=>{
                        console.log(props.reportInfo.id)
                        deleteHandler(props.reportInfo.id)
                        setOpen(false)
                    }}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteReport
