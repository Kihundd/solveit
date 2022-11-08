import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ListItemButton, Box } from '@mui/material';
import { useState } from 'react'
import { Link } from '@mui/material';
import { ALLTESTLIST, ALLASKING } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeList(props) {
  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(true);
  const [homeList, setHomeList] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  // const [selectedIndex, setSelectedIndex] = useState('');
  // const {loading, error, data} = useQuery(ALLTESTLIST, {
  //   variables: {page: 1}}
  // );
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };
  useEffect(() => {
    setHomeList(props.data)
    setUrl(props.url)
  }, [props])

  const handleClick = (i) => {
    // console.log(i)
    // console.log(`/${props.url}/`+i)
    navigate(`/${url}/${i}`)
  }
  
  // useEffect(()=>{
  //   if(data !== undefined && data.allTests !== undefined){
  //     setHomeList(data.allTests.slice(0,5))
  //   }
  // },[data])
  // if(loading) return <p>Loading...</p>;
  // if(error) return <p>Error!</p>;
  // console.log(data)

  return (
        <>
          {/* <Typography sx={{ mt: 4, mb: 2, ml: 2 }} variant="h6" component="div" textAlign='left' fontSize={14}>
              
          </Typography> */}
          <List dense={dense}>
            {homeList ? homeList.map((x, index)=>(
              <ListItemButton
                sx={{borderRadius: '5px', border: '1px solid #eee', bgcolor: '#eee', mt: 1}}
                key={x.id}
                onClick={e=>handleClick(x.id)}
              >
                <ListItemText secondary={secondary ? `${x.ownerId}` : null}>
                  {x.name}{x.content}
                </ListItemText>
              </ListItemButton>
            )) : null
            }
          </List>
        </>
        

  )
}

    