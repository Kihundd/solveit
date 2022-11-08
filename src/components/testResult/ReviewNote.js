import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { TextField, Box, Button } from "@mui/material"
import { REVIEWNOTE,GET_REVIEWNOTE } from "../../queries/queries"
import { useEffect } from "react"

function ReviewNote(props){

    const [explanation, setExplanation] = useState('');
    const [questionIds, setQuestionIds] = useState(props.qid);
    const { Loading: ReviewLoading, error: ReviewError, data: ReviewData } = useQuery(GET_REVIEWNOTE, {
        variables: {questionId : questionIds}
    });
    const [addAsking, {data, loading, error}] = useMutation(REVIEWNOTE);

    useEffect(() => {
      if (props.qid !== undefined){
        setQuestionIds(props.qid)
      }
    }, [props.pid])

    useEffect(() => {
      if(ReviewData !== undefined){
        setExplanation(ReviewData.reviewNote.explanation)
      }
    }, [ReviewData])
    
    const onSave = async () => {
        // const questionIds = questionList.map(q => q.questionId);
        const input = {
            explanation,
            questionId: questionIds
        };
        const response = await addAsking({variables: {input}});
        console.log(response);
    }
    
    return(
        <Box>
            {}
            <TextField 
                rows="5"
                multiline
                fullWidth={true}
                value={explanation}
                label="오답노트 내용"
                onChange={e => {
                    setExplanation(e.target.value)
                }}
            />
            {/* <Button variant="contained" underline="none" color="primary" onClick={onSave} sx={{float: 'right', marginTop: '10px'}}>
                닫기
            </Button> */}
            <Button variant="contained" underline="none" color="primary" onClick={onSave} sx={{float: 'right', marginTop: '10px'}}>
                저장
            </Button>
        </Box>
        
    )
}

export default ReviewNote