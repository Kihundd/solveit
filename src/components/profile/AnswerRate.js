import React, { Component, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts'

function AnswerRate(props) {

  const [ tryCount, setTryCout ] = useState('');
  const [ correct, setCorrect ] = useState('');
  const [ icorrect, setIcorrect] = useState('');
  const [options] = useState({labels: ['정답률', '오답률']});
  const [series, setSeries] = useState([])

  useEffect(()=> {
      setTryCout(props.solvingData[0])
      setCorrect(props.solvingData[1])
      setIcorrect(props.solvingData[0]-props.solvingData[1])
      setSeries([correct, icorrect])
  },[props])
  
  return (
    <Box sx={{ml: 4}}>
      <Chart options={options} series={series} type="pie" width="330" />
    </Box>
  )
}

export default AnswerRate
