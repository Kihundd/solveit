import React from 'react'
import { Rating, Stack, Dialog, DialogActions, DialogTitle, DialogContent, Button, Box } from "@mui/material";
import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { DIFFICULTY, TEST_INFO } from "../queries/queries"
import { useParams } from 'react-router-dom';


function Difficulty() {
    const [difficultyNum, setDifficultyNum] = useState(0);
    const [dificlutyView, setDifficultyView] = useState(false)
    const [open, setOpen] = useState(false)
    const params = useParams();
    const {data, loading, error} = useQuery(TEST_INFO, {
        variables:{id: params.testId}
    });
    const [selectDifficulty,{data:difficultyData, loading:difficultyLoading, error:difficultyError}] = useMutation(DIFFICULTY,{
        variables: {questionId: 34, difficulty:difficultyNum}
    })

    const handleClickOpen = () => {
        setOpen(true);
        setDifficultyView(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleDifficulty = async ()=> {
        const response = selectDifficulty({variables:{questionId:34, difficulty:difficultyNum}})

    }
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                난이도측정
            </Button>
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
        </div>
    )
}

export default Difficulty
