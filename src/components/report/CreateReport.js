import { useMutation } from '@apollo/client';
import { IconButton, Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import React, { useState } from 'react'
import { CREATE_REPORT } from '../../queries/queries'
import FlagIcon from '@mui/icons-material/Flag';


function CreateReport(props) {
    
    const ADVERTISEMENT = "ADVERTISEMENT";
    const PORNOGRAPHY = "PORNOGRAPHY";
    const SWEAR_WORD = "SWEAR_WORD";
    const COPYRIGHT_INFRINGEMENT = "COPYRIGHT_INFRINGEMENT";
    const OTHER = "OTHER";

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    const [createReport, {loading, error, data}] = useMutation(CREATE_REPORT);

    const handleChange = (e) => {
        setType(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    
    const handleSumbit = async () => {
        const input = {
            content,
            testId: props.testId,
            type: type
        }
        const response = await createReport({variables: {input}})
        setOpen(false)
        console.log(response.data)
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} color="secondary" sx={{float:'right'}} >
                <FlagIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <DialogTitle textAlign='center'>문제집 신고</DialogTitle>
                <DialogContent >
                    <TextField fullWidth value={props.testName} label="문제집명" sx={{marginTop: '10px'}} /><br></br>
                    <FormControl fullWidth sx={{marginTop: '10px', minWidth: 150}}>
                        <InputLabel id="demo-simple-select-label" >신고유형</InputLabel>
                        <Select
                            value={type}
                            onChange={handleChange}
                        >   
                            <MenuItem value={ADVERTISEMENT}>불법광고</MenuItem>
                            <MenuItem value={PORNOGRAPHY}>음란물</MenuItem>
                            <MenuItem value={SWEAR_WORD}>욕설</MenuItem>
                            <MenuItem value={COPYRIGHT_INFRINGEMENT}>저작권침해</MenuItem>
                            <MenuItem value={OTHER}>기타</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth={true} minRows={4} maxRows={8} multiline={true} margin='dense' label="신고내용" value={content} onChange={handleContent} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSumbit}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateReport
