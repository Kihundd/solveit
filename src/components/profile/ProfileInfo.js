import {useMutation, useQuery} from '@apollo/client'
import {USER_INFO, UPDATE_USER_INFO} from '../../queries/queries'
import { CATEGORIES } from "../../queries/test_queries";
import {useEffect, useState} from 'react'
import { Grid, Button, Input, Avatar, Container, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import FileUpload from '../FileUpload';

function ProfileInfo(props) {

    const [item, setItem] = useState('USD');
    const [userName, setUserName] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const {data, loading, error} = useQuery((USER_INFO), {
        variables:{ID: props.userId}
    });
    const {loading: catagoryLoaing, error: categoryError, data: categoryData} = useQuery(CATEGORIES);
    const [update, { loading: updataLoading, error: updateError, data: updateData }] = useMutation(UPDATE_USER_INFO,{
        variables:{name: userName, favorite: userCategory}
    });
    // console.log(data)
    // console.log(categoryData)
    const handleSubmit = async (updateData) => {
        console.log(updateData)
        const response = await update({varialbes: {
            name: userName,
            favorite: userCategory
        }});
        console.log(response)
    }
    
    useEffect(() => {
        if(data !== undefined && data.profile.favorites.length !== 0) {
            setUserCategory(data.profile.favorites[0].name)
        }
    }, [data])

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    
    const handleInputChange = (e) => {
        setUserName(e.target.value);
    }
    const handleCategoryChange = (event) => {
        setUserCategory(event.target.value);
    };


    const renderCategories = () => {
        if(categoryData === undefined)
            return <MenuItem value='' key='loading' disabled={true}>Loading...</MenuItem>
        return categoryData.categories.map(category => 
            <MenuItem value={category.name} key={category.name}>{category.name}</MenuItem>);
    };

    return (
        <Container maxWidth="xl" sx={{border:'1px solid #c4c4c4', padding:'20px', marginTop:'20px'}}>
            <Grid container>
                <Grid item xs={2}><h3>기본정보</h3></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    
                    <Button variant="contained" 
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
                            defaultValue={data.profile.tier}

                            >
                        </TextField>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField size="small" 
                                fullWidth 
                                label="닉네임" 
                                defaultValue={data.profile.nickname}
                                onChange={handleInputChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField size="small" 
                            fullWidth label="이메일" 
                            disabled={true} 
                            defaultValue={data.profile.ownerId}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id="question-category">카테고리</InputLabel>
                            <Select
                            labelId="question-category"
                            id="question-category-select"
                            value={userCategory}
                            label="카테고리"
                            onChange={handleCategoryChange}
                            >
                                {renderCategories()}
                            </Select>
                            </FormControl>
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
        <>
            <Avatar
                src="/broken-image.jpg" 
                sx={{ width: 120, height: 120, margin: '0 auto'}}
            />
            <FileUpload />
        </>

    )
}