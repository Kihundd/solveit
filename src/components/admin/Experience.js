import { useMutation } from '@apollo/client'
import React,{ useEffect, useState } from 'react'
import { SET_TIER_EXPERIENCE } from '../../queries/adminQueries'
import {Box, TextField, Typography, Stack, Button} from '@mui/material'

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

function Experience() {

    const [setTierPoint] = useMutation(SET_TIER_EXPERIENCE);
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);

    const submitExperience = async() => {
        const response = await setTierPoint({variables: {input:[
            {tierId: "1", experience: Number(one)},
            {tierId: "2", experience: Number(two)},
            {tierId: "3", experience: Number(three)},
            {tierId: "4", experience: Number(four)},
            {tierId: "5", experience: Number(five)},
        ]
        }})
        console.log(response)
    }
    const handleOneChange = (e) => {
        setOne(e.target.value)
    }
    const handleTwoChange = (e) => {
        setTwo(e.target.value)
    }
    const handleThreeChange = (e) => {
        setThree(e.target.value)
    }
    const handleFourChange = (e) => {
        setFour(e.target.value)
    }
    const handleFiveChange = (e) => {
        setFive(e.target.value)
    }

    return (
        <>
            <Box sx={{p:5, pb:9, pl:0, pt:2}}>
                
                <Stack direction="row" spacing={1} >
                    <LooksOneIcon color="disabled" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="난이도 1 경험치" variant="standard" onChange={handleOneChange} />
                </Stack>
                <Stack direction="row" spacing={1} >
                <LooksTwoIcon color="action" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="난이도 2 경험치" variant="standard" onChange={handleTwoChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                    <Looks3Icon color="primary" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="난이도 3 경험치" variant="standard" onChange={handleThreeChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                <Looks4Icon color="success" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="난이도 4 경험치" variant="standard" onChange={handleFourChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                <Looks5Icon fontSize='large' sx={{ color: "pink", mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="난이도 5 경험치" variant="standard" onChange={handleFiveChange} /><br></br>
                </Stack>
                <Button onClick={submitExperience} variant='contained' sx={{float:'right', marginTop: '10px'}}>저장</Button>
            </Box>
        </>
    )
}

export default Experience
