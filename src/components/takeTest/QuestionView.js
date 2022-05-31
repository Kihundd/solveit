import { Button, Grid, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_QUESTION } from "../../queries/queries";

function QuestionView({row}) {
    const [answer, setAnswer] = useState([]);
    const [question, setQuestion] = useState(undefined);
    const [getQuestion, {data, loading, error}] = useLazyQuery(GET_QUESTION);

    useEffect(() => {
        async function setUp() {
            if(row !== undefined) {
                setAnswer(row.answer);
                const response = await getQuestion({variables: {id: row.qid}});
                setQuestion(response.data.question);
            }
        }
        setUp();
    }, [row])

    useEffect(() => {
        if(question !== undefined) {

        }
    }, [question]);


    if(row === undefined) return <></>
    const qid = row.qid;

    return(
        <>
            <Box sx={{ marginTop:'10px',  border: '2px solid #c4c4c4' , height: '30vh'}}>
                <h4>문제내용</h4>
            </Box>
            <Grid container sx={{marginTop:'10px'}}>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                    <Button variant="contained" sx={{margin:'10px'}}>이전</Button>
                    <Button variant="contained">다음</Button>
                </Grid>
                
            </Grid>
            
        </>
        
    )
}
export default QuestionView