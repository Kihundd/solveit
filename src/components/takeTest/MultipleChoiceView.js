import { Grid, TextField } from "@mui/material";

export default function({question}) {
    const {paragraph, candidates, name} = question;

    console.log(paragraph);
    const renderCandidate = () => {
        return <></>
    };

    return (
        <Grid container rowSpacing={1}>
        <Grid item xs={12}>
            <TextField 
                rows="10"
                multiline
                fullWidth={true}
                value={paragraph}
                InputProps = {{
                    readOnly:true
                }}
             />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        
        <Grid item xs={12}>
            {renderCandidate()}  
        </Grid>         
    </Grid>
    )

}