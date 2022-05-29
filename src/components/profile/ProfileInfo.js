import {useMutation, useQuery} from '@apollo/client'
import {USER_INFO, UPDATE_USER_INFO} from '../../queries/queries'
import { CATEGORIES } from "../../queries/test_queries";
import {useEffect, useState} from 'react'
import { Grid, Button, Input, Avatar, Container, Box, TextField, MenuItem } from '@mui/material';
import Header from '../home/Header';
import { Favorite } from '@mui/icons-material';

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

function ProfileInfo(props) {

    const [item, setItem] = useState('USD');
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('');
    const {data: userData, loading: userLoading, error: userError} = useQuery((USER_INFO), {
        variables:{ID: props.userId}
    });
    const [update, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_USER_INFO);
    const handleSubmit = async (updateData) => {
        console.log(updateData)
        await update({varialbes: {
            name: userName,
        }});
    }
    // useEffect(() => {
    //     if(updateData !== undefined && updateData.update.success) {
    //         console.log(updateData)
    //     }
    // }, [updateData]);

    if(userLoading) return <p>Loading...</p>;
    if(userError) return <p>Error!</p>;
    
    

    const handleInputChange = (e) => {
        setUserName(e.target.value);
    }

    const handleChange = (e) => {
        setItem(e.target.value);
    };

    return (
        <Container maxWidth="xl" sx={{border:'2px solid #c4c4c4', padding:'20px', marginTop:'20px'}}>
            <Grid container>
                <Grid item xs={2}><h3>기본정보</h3></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                        type='submit'
                        fullWidth 
                        size="medium" 
                        sx={{marginTop:'10px'}}
                        onClick={handleSubmit}
                    >저장</Button> 
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{marginTop:'5px'}}>
                <Grid item xs={6}><ProfileImg /></Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField size="small" 
                            fullWidth 
                            label="티어" 
                            disabled={true} 
                            defaultValue={userData.profile.tier}

                            >
                        </TextField>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField size="small" 
                                fullWidth 
                                label="닉네임" 
                                defaultValue={userData.profile.nickname}
                                onChange={handleInputChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField size="small" 
                            fullWidth label="이메일" 
                            disabled={true} 
                            defaultValue={userData.profile.ownerId}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField
                                // id="outlined-select-currency"
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
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{marginTop:'10px'}}>
                        <Grid item xs={7}>
                        <TextField size="small" fullWidth disabled={true} defaultValue={userData.profile.point}></TextField>
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