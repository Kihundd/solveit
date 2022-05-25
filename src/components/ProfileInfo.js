import {useQuery} from '@apollo/client'
import {USER_INFO} from '../queries/queries'
import {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { Grid, Button, Input, Avatar, Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


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
    const [user, setUser] = useState("test@test.com");
    const {data, loading, error} = useQuery(USER_INFO, {
        variables:{ID: user}
    });
    // console.log(data);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>; 

    const handleChange = (e) => {
        setItem(e.target.value);
    };

    return (
        <Container>
            <Grid container>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                <Button variant="contained" size="small">저장</Button> 
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <ProfileImg />
                </Grid>
                <Grid item xs={7}>
                    <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={1}>{data.profile.tier}0</Grid>
                <Grid item xs={6}>
                    <TextField size="small" label="닉네임" defaultValue={data.profile.nickname}></TextField>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item >

                </Grid>

            </Grid>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={5}>
                    <p>{data.profile.ownerId}</p>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-currency"
                        size='small'
                        select
                        label="관심분야"
                        value={item}
                        onChange={handleChange}
                        // helperText="관심분야를 설정해주세요" 
                        >
                        {Cartegory.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}<ul>{data.profile.favorites}</ul>
                    </TextField>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={1}>
                    <p>{data.profile.point}</p>
                </Grid>
                <Grid item xs={6}>
                    <button>상점</button>
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
        <>
        <Grid container>
                        <Grid item xs={12}>
                            <Avatar
                                alt="Img"
                                src="../Logo1.png"
                                sx={{ width: 150, height: 150 }}
                            />
                            {/* <p>{data.profile.image}</p> */}
                        </Grid>
                        <Grid item xs={12}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span">
                                    사진등록
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
        </>
        
    )
}