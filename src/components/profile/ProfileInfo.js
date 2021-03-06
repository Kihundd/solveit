import {useMutation, useQuery} from '@apollo/client'
import {USER_INFO, UPDATE_USER_INFO} from '../../queries/queries'
import { CATEGORIES } from "../../queries/test_queries";
import {useEffect, useState} from 'react'
import { Grid, Button, Input, Avatar, Container, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

function ProfileInfo(props) {

    const [item, setItem] = useState('USD');
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('');
    const {data, loading, error} = useQuery((USER_INFO), {
        variables:{ID: props.userId}
    });
    const {loading: catagoryLoaing, error: categoryError, data: categoryData} = useQuery(CATEGORIES);
    const [update, { loading: updataLoading, error: updateError, data: updateData }] = useMutation(UPDATE_USER_INFO,{
        variables:{name: userName, favorite: category}
    });
    
    const handleSubmit = async (updateData) => {
        console.log(updateData)
        await update({varialbes: {
            name: userName,
            favorite: category
        }});
    }
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    
    const handleInputChange = (e) => {
        setUserName(e.target.value);
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    console.log(category)

    const renderCategories = () => {
        if(categoryData === undefined)
            return <MenuItem value='EMPTY' key='loading' disabled={true}>Loading...</MenuItem>
        return categoryData.categories.map(category => 
            <MenuItem value={category.name} key={category.name}>{category.name}</MenuItem>);
    };

    // const onSuccess = async (updateData) => {
    //     console.log(updateData);
    //     await update({variables: {
    //         name : data.name.value,
    //         favorite: category
    //       }
    //     });
    // };
    // const onFail = (data, error) => {
    //     console.log(error);
    //     if(error['name'] != null) {
    //       console.log(nameError)
    //     }
    //     if(error['favorite'] != null) {
    //         console.log(favoriteError)
    //     }
    // }

    return (
        <Container maxWidth="xl" sx={{border:'2px solid #c4c4c4', padding:'20px', marginTop:'20px'}}>
            <Grid container>
                <Grid item xs={2}><h3>????????????</h3></Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    
                    <Button variant="contained" 
                        fullWidth 
                        size="medium" 
                        sx={{marginTop:'10px'}}
                        onClick={handleSubmit}
                    >??????</Button> 
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{marginTop:'5px'}}>
                <Grid item xs={6}><ProfileImg /></Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField size="small" 
                            fullWidth 
                            label="??????" 
                            disabled={true} 
                            defaultValue={data.profile.tier}

                            >
                        </TextField>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField size="small" 
                                fullWidth 
                                label="?????????" 
                                defaultValue={data.profile.nickname}
                                onChange={handleInputChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <TextField size="small" 
                            fullWidth label="?????????" 
                            disabled={true} 
                            defaultValue={data.profile.ownerId}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id="question-category">????????????</InputLabel>
                            <Select
                            labelId="question-category"
                            id="question-category-select"
                            value={category}
                            label="????????????"
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
                            <Button href="/Shop" fullWidth variant='contained'>??????</Button>
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
                                ????????????
                            </Button>
                        </label>
                    </Grid>
                </Grid>   
            </Box>
        </Container>
        
    )
}