import React from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField } from "@mui/material";
import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { TEST_INFO, CREATE_TAG } from "../../queries/queries"
import { useParams } from 'react-router-dom';

function CreateTag() {

    const [createTagView, setCreateTagView] = useState(false)
    const [open, setOpen] = useState(false)
    const params = useParams();
    const [name, setName] = useState('');
    const {data, loading, error} = useQuery(TEST_INFO, {
        variables:{id: params.testId}
    });
    const [createTag, {loading: createLoading, error: createError, data: createData}] = useMutation(CREATE_TAG)

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSumbit = async () => {
        const response = await createTag({variables: {name: name, testId: params.testId}})
        console.log(response.data)
    }

    return (
        <div>
            <Button variant="contained" color="primary" size='small' onClick={handleClickOpen} sx={{float: 'right', marginLeft: 2, marginTop: '10px'}}>
                태그추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign='center'>태그추가</DialogTitle>
                <DialogContent>
                    <TextField fullWidth={true} value={name} label="태그이름" onChange={(e)=>{ setName(e.target.value)}} />
                    {/* <TextField fullWidth={true} minRows={5} maxRows={10} multiline={true} margin='dense' label="질문내용" /> */}
                </DialogContent>
                <DialogActions>
                    <Button variant="outliend" color="primary" onClick={handleSumbit}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateTag
