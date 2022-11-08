import React from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TEST, UNLIKE_TEST, GETLIKE, LIKESCOUNT } from "../../queries/queries"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from "@mui/material";
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
    console.log(data)
    useEffect(() => {
        if(data !== undefined) {
          setLiked(data.like);
        }
    },[data]);
    // console.log(data.Like)
    // console.log(liked)
    console.log(liked)
    const handleClick = async ()=>{
        if(liked == false){
            const response = like({variables:{id: params.testId}})
            console.log(likeData)
            setLiked(true)
        }
        else if(liked == true){
            const response = unLike({variables:{id: params.testId}})
            console.log(unLikeData)
            setLiked(false)
        } 
    }

    return (
        <div>
            <Button variant="contained" underline="none" color="primary" size='small' onClick={handleClick} sx={{float: 'right', marginLeft: 2, marginTop: '10px'}}>
                좋아요
            </Button>
        </div>
    )
}

export default Like
