import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETE_TEST } from '../../queries/adminQueries';
import { ALLREPORTS } from "../../queries/reportQueries"
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteTest(props) {
    const [reportInfo, setReportInfo] = useState('');
    const [open, setOpen] = useState(false);
    const [deleteTest] = useMutation(DELETE_TEST);
    const [reget] = useLazyQuery(ALLREPORTS);

    useEffect(() => {
        if(props !== undefined && props.reportInfo !== undefined){
            setReportInfo(props.reportInfo)
        }
    }, [props])

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const deleteHandler = async (id) => {
        const response = await deleteTest({variables: {id: id}})
        console.log(response)
        setOpen(false)

        const regetResponse = await reget({variables: {page: 1}})
        console.log(regetResponse)
        props.setReportList(regetResponse.data.allReports)
    }

    return (
        <>
  
        {/* <Button color="primary" size='small' onClick={handleClickOpen}>
            테스트삭제
        </Button> */}
        <Button variant="outlined" size='small' color="error" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
            테스트 삭제
        </Button>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                해당 문제집을 삭제 하시겠습니까?
            </DialogTitle>
            <DialogContent>
                <Stack direction="row">
                <TextField 
                    label="문제번호" 
                    value={reportInfo.id}
                    sx={{mb:1, mt:1, mr: 1}} 
                />
                <TextField 
                    label="신고자"
                    fullWidth
                    value={reportInfo.ownerId} 
                    sx={{mb:1, mt:1}} 
                />
                </Stack>
                <TextField 
                    label="신고사유"
                    fullWidth
                    value={reportInfo.type}
                    sx={{mb:2, mt:1}} 
                />
                <TextField
                    id="outlined-multiline-static"
                    label="신고내용"
                    value={reportInfo.content}
                    multiline
                    fullWidth
                    rows={4}
                />
            </DialogContent>
            <DialogActions sx={{pr: '24px', pb: '16px', pt: 0}}>
                <Button variant='contained' color='error' onClick={()=>{
                    deleteHandler(reportInfo.testId)
                    setOpen(false)
                }}>삭제</Button>
                <Button variant="outlined" onClick={handleClose} >닫기</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default DeleteTest
