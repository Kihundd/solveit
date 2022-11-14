import React from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TEST, UNLIKE_TEST, GETLIKE, LIKESCOUNT } from "../../queries/queries"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Like(props) {

    const [liked, setLiked] = useState(false);
    const params = useParams();

    const {data, loading, error} = useQuery(GETLIKE,{
        variables: {testId: params.testId, userId: props.userId}
    })
    const {data:cntData, loading:cntLoading, error:cntError} = useQuery(LIKESCOUNT,{
        variables: {id: params.testId}
    })
    const [like, {data:likeData, loading:likeLoading, error:likeError}] = useMutation(LIKE_TEST,{
        variables: {id: params.testId}
    })
    const [unLike, {data:unLikeData, loading:unLikeLoading, error:unLikeError}] = useMutation(UNLIKE_TEST,{
        variables: {id: params.testId}
    })
    
    useEffect(() => {
        if(data !== undefined) {
          setLiked(data.like);
        }
    },[data]);

    const renderLike = () => {
        if(liked === false) {
            return <FavoriteBorderIcon color='inherit' />
        }
        else if(liked === true)
            return <FavoriteIcon />
    }

    const handleClick = async ()=>{
        if(liked == false){
            const response = like({variables:{id: params.testId}})
            // console.log(likeData)
            setLiked(true)
        }
        else if(liked == true){
            const response = unLike({variables:{id: params.testId}})
            // console.log(unLikeData)
            setLiked(false)
        } 
    }

    return (
        <>
            <IconButton onClick={handleClick} aria-label="like" color="error" sx={{float:'right'}}>
                {renderLike()}
            </IconButton>
            {/* <Button variant="contained" underline="none" color="primary" size='small' onClick={handleClick} sx={{ marginLeft: 2, marginTop: '10px'}}>
                좋아요
            </Button> */}
        </>
    )
}

export default Like
