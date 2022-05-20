import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HomeList from './HomeList.css';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    // <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2} className="Grid">
        <Grid item xs={3} ></Grid>
        <Grid item xs={3} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" className='typo'>
            TestList
          </Typography>
          <Demo>
            <List dense={dense} className='List'>
              {generate(
                <ListItem className='item'>
                  <ListItemText className='text'
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={3} md={6}></Grid>
      </Grid>
    // </ Box>
  )
}