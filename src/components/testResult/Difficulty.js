import React from 'react'
import { IconButton, Rating, Stack, Dialog, DialogActions, DialogTitle, DialogContent, Button, Box } from "@mui/material";
import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { DIFFICULTY } from "../../queries/queries"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import StarsIcon from '@mui/icons-material/Stars';


function Difficulty(questionId) {
    const [difficultyNum, setDifficultyNum] = useState(0);
    const [dificlutyView, setDifficultyView] = useState(false)
    const [qid, setQid] = useState(0);
    const [open, setOpen] = useState(false);
    

    useEffect(() => {
      setQid(questionId.questionId);
    }, [questionId])
    
    const [selectDifficulty, {data, loading, error}] = useMutation(DIFFICULTY)

    const handleClickOpen = () => {
        setOpen(true);
        setDifficultyView(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleDifficulty = async ()=> {
        const response = await selectDifficulty({variables:{questionId:qid, difficulty:difficultyNum}})
        console.log(response);
        setOpen(false);
    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return (
        <>
            <IconButton onClick={handleClickOpen} color="secondary" sx={{float:'right', verticalAlign: 'text-top'}} >
                <StarsIcon />
            </IconButton>
            {/* <Stack>
                <Button variant="outlined" startIcon={<StarsIcon />}  size='small' onClick={handleClickOpen} sx={{float: 'right', marginLeft: 2, marginTop: '10px'}}>
                    난이도측정
                </Button>
            </Stack> */}
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign='center'>난이도측정</DialogTitle>
                <DialogContent>
                    {
                        (dificlutyView == true) &&
                                <Stack spacing={3}>
                                    <Rating 
                                    name="half-rating" 
                                    value={difficultyNum} 
                                    onChange={(e)=>{
                                        setDifficultyNum(Number(e.target.value))
                                    }}
                                    />
                                </Stack>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="outliend" color="primary" onClick={handleDifficulty}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Difficulty
