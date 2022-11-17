import {useMutation, useQuery} from '@apollo/client'
import {USER_INFO, UPDATE_USER_INFO} from '../../queries/queries'
import { CATEGORIES } from "../../queries/test_queries";
import {useEffect, useState} from 'react'
import { Grid, Button, Input, Avatar, Container, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import FileUpload from '../FileUpload';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

function ProfileInfo(props) {

    const [userName, setUserName] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const [tier, setTier] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const {loading: catagoryLoaing, error: categoryError, data: categoryData} = useQuery(CATEGORIES);
    const [updateUserInfo] = useMutation(UPDATE_USER_INFO,{
        variables:{name: userName, favorite: userCategory}
    });

    useEffect(() => {
        if(categoryData !== undefined){
            setCategoryList(categoryData.categories)
        }
    }, [categoryData])
    console.log(categoryList)
    
    
    useEffect(() => {
        setTier(props.userData.profile.tier)
        if(props !== undefined && props.userData.profile.favorites.length !== 0){
            setUserCategory(props.userData.profile.favorites[0].name)
        }
    }, [props])
    
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
    const renderTier = () => {
        if(tier == 1)
            return <LooksOneIcon color="disabled" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 2)
            return <LooksTwoIcon color="action" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 3)
            return <Looks3Icon color="primary" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 4)
            return <Looks4Icon color="success" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 5)
            return <Looks5Icon fontSize='large' sx={{ color: "pink", mt:'6px', verticalAlign: 'text-top'}} />
    }
    
    const handleSubmit = async (updateData) => {
        console.log(updateData)
        const response = await updateUserInfo({varialbes: {
            name: userName,
            favorite: userCategory
        }});
        console.log(response)
    }

    return (
        <Container maxWidth="md" sx={{border:'1px solid #c4c4c4', borderRadius: '4px', padding:'20px', marginTop:'20px'}}>
            <h3 style={{float:'left', display:'inline-block', marginBottom: '20px'}}>기본정보</h3>
            <Button variant="contained" 
                        size="medium" 
                        sx={{marginTop:'10px', float:'right'}}
                        onClick={handleSubmit}
                    >저장</Button> 

            <Grid container spacing={1} sx={{marginTop:'5px'}}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sx={{textAlign:'left'}}>
                            <Button disabled fullWidth variant="outlined" endIcon={renderTier()}>
                                티어
                            </Button>
                        </Grid>
                        <Grid item xs={10} sx={{textAlign: 'left'}}>
                            <TextField size="small" 
                     
                                fullWidth
                                label="닉네임" 
                                defaultValue={props.userData.profile.nickname}
                                onChange={handleInputChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop:'20px'}}>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField size="small" 
                            fullWidth
                            label="이메일" 
                            disabled={true} 
                            defaultValue={props.userData.profile.ownerId}
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
                        <Grid item xs={7} sx={{textAlign: 'left'}}>
                        <TextField label="보유한 포인트" size="small"  disabled={true} defaultValue={props.userData.profile.point} ></TextField>
                        <Button href="/Shop"  variant='contained' sx={{ml: 2}}>상점</Button>
                        </Grid>
                        <Grid item xs={5}>
                            
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
            {/* <Avatar
                src="/broken-image.jpg" 
                sx={{ width: 120, height: 120, margin: '0 auto'}}
            /> */}
            {/* <FileUpload /> */}
        </>

    )
}