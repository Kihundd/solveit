import { useQuery } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TEST_RESULT } from "../queries/queries";


export default function() {
    const {testId} = useParams();
    const {data, loading, error} = useQuery(TEST_RESULT, {variables: {
        testId: Number(testId)
    }});
    const [result, setResult] = useState([0, 0]);

    useEffect(() => {
        if(data !== undefined) {
            let correct = 0;
            data.testJudgeResult.forEach(r => {
                if(r === true) correct += 1;
            })

            const newResult = [correct, data.testJudgeResult.length];
            setResult(newResult);
        }
    }, [data]);

    return (
        <Box sx={{border: '2px solid #c4c4c4', height: '80vh', widthh: '30%'}}>
            <Grid container>
                <Grid item xs={12}>
                    {`수고하셨습니다! 정답 수: ${result[0]}/${result[1]}`}
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </Box> 
    )
}