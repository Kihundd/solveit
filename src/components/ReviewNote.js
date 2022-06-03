import { useState } from "react"
import { useMutation } from "@apollo/client"
import { TextField, Box, Button } from "@mui/material"
import { REVIEWNOTE } from "../queries/queries"

function ReviewNote(){

    const [explanation, setExplanation] = useState('')
    const [questionIds, setQuestionIds] = useState(33)
    const [addAsking, {data, loading, error}] = useMutation(REVIEWNOTE)

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
            <Button variant="contained" underline="none" color="primary"
                onClick={onSave}
            >
                확인
            </Button>
        </Box>
        
    )
}

export default ReviewNote