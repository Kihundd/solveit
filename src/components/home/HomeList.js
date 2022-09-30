import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import { Link } from '@mui/material';
import { ALLTESTLIST } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function HomeList() {
  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(true);
  const [homeList, setHomeList] = useState('');
  const {loading, error, data} = useQuery(ALLTESTLIST, {
    variables: {page: 1}}
  );
  

  useEffect(()=>{
    if(data !== undefined && data.allTests !== undefined){
      setHomeList(data.allTests.slice(0,3))
    }
  },[data])

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error!</p>;
  console.log(data)

  return (
      <Demo sx={{borderRadius: '5px'}}>
        <List dense={dense}>
          {homeList ? homeList.map((x, index)=>(
            <ListItem key={x.id} sx={{textAlign : 'left', borderBottom: '1px solid #eee', padding: 0}}>
              <ListItemText secondary={secondary ? `출제자 ${x.ownerId}` : null}>
                <Link href={`/TestInfo/${x.id}`} underline='none' color='inherit'>{x.name}</Link>
              </ListItemText>
            </ListItem>
          )) : null
          }
        </List>
      </Demo>
  )
}

    