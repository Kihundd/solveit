import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import { Box, TableRow, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import { ALLTESTLIST } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function HomeList() {
  const [dense, setDense] = useState(false);
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
  console.log(homeList)

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error!</p>;
  

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" textAlign='center'>
        TestList
      </Typography>
      <Demo>
        <List dense={dense}>
          {homeList ? homeList.map((x, index)=>(
            <ListItem key={x.id} sx={{textAlign : 'center'}}>
              <ListItemText secondary={secondary ? x.ownerId : null}>
                {x.name}
              </ListItemText>
            </ListItem>
          )) : null
          }
        </List>
      </Demo>
    </ Box>
    // <TableContainer component={Paper}>
    //   <Table 
    //     // sx={{ minWidth: 650 }} 
    //     aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         TestList
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {homeList ? homeList.map((x, index) => (
    //         <TableRow key={index}
    //           sx={{border:'2px solid #c4c4c4'}}
    //         >
    //           {x.name}
    //         </TableRow>
    //       )) : null}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  )
}

    