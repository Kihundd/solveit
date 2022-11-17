import React from 'react'
import Point from './Point'
import Experience from './Experience'
import { Box, Container, Grid, Typography } from '@mui/material'

function Setting() {
  return (
    <>
        {/* <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 1,
                
            }}>
            <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>
                <Typography
                component="h1"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{display: 'inline-block'}}
                >
                    경험치 설정
                </Typography>
            </Container>
        </Box> */}
        <Box
            sx={{
                bgcolor: 'background.paper',
                // pt: 8,
                pb: 1,
                
            }}>
            <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>
                <Typography
                component="h1"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{display: 'inline-block'}}
                >
                    승급 포인트 설정
                </Typography>
                <Point/>
            </Container>
        </Box>
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 1,
                
            }}>
            <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>
                <Typography
                component="h1"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{display: 'inline-block'}}
                >
                    난이도별 경험치 설정
                </Typography>
                <Experience /> 
            </Container>
            
        </Box>
        
                
           
                
            
        <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>

        </Container>
        
    </>
  )
}

export default Setting
