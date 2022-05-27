import {useQuery} from '@apollo/client'
import {USER_INFO} from '../../queries/queries'
import {useEffect, useState} from 'react'
import { Grid, Button, Input, Avatar, Container, Box, TextField, MenuItem } from '@mui/material';
import Header from '../home/Header';
const Cartegory = [
    {
      value: 'USD',
      label: '관심분야설정',
    },
    {
      value: 'EUR',
      label: 'TOEIC',
    },
    {
      value: 'BTC',
      label: 'JLPT',
    },
    {
      value: 'JPY',
      label: 'ONLINEJUDGE',
    },
  ];

function ProfileInfo() {
    const [item, setItem] = useState('USD');
    const [userId, setUserId] = useState("");
    const {data, loading, error} = useQuery((USER_INFO), {
        variables:{ID: null}
    });
    useEffect(() => {
        if(data !== undefined && data.profile.ownerId !== undefined) {
          setUserId(data.profile.ownerId);
        }
    }, [data]);
    console.log(data);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>; 

    const handleChange = (e) => {
        setItem(e.target.value);
    };

    return (
        <Container maxWidth="xl" sx={{border:'2px solid #c4c4c4', padding:'20px', marginTop:'20px'}}>
            <Grid container>
                <Grid item xs={2}><h3>기본정보</h3></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Button variant="contained" fullWidth size="medium" sx={{
                        marginTop:'10px'
                    }}>저장</Button> 
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{marginTop:'5px'}}>
                <Grid item xs={6}><ProfileImg /></Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField size="small" fullWidth label="티어" disabled={true} defaultValue={data.profile.tier}></TextField>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField size="small" fullWidth label="닉네임" defaultValue={data.profile.nickname}></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField size="small" fullWidth label="이메일" disabled={true} defaultValue={data.profile.ownerId}></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-currency"
                                size='small'
                                select
                                fullWidth
                                value={item}
                                onChange={handleChange} 
                                >
                                {Cartegory.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}<ul>{data.profile.favorites}</ul>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{marginTop:'10px'}}>
                        <Grid item xs={7}>
                        <TextField size="small" fullWidth disabled={true} defaultValue={data.profile.point}></TextField>
                        </Grid>
                        <Grid item xs={5}>
                            <Button href="/Shop" fullWidth variant='contained'>상점</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>       
        </Container>
    )
}

export default ProfileInfo

function ProfileImg() {
    return(
        <Container maxwidth="xl">
            <Box sx={{border:'2px solid #c4c4c4'}}>
                <Grid container spacing={1} sx={{marginTop:'10px'}}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Avatar
                            src="/broken-image.jpg" 
                            sx={{ width: 120, height: 120}}
                        />
                        {/* <p>{data.profile.image}</p> */}
                    </Grid>
                </Grid>
                <Grid container sx={{marginTop:'35px'}}>
                    <Grid item xs={12}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" size='small' >
                                사진등록
                            </Button>
                        </label>
                    </Grid>
                </Grid>   
            </Box>
        </Container>
        
    )
}