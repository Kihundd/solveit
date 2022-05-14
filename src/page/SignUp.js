import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function SignUp() {
    return(
        <div className='body'>
            <div className='SignUpContainer'>
                <img src={logo} ></img>
                <Grid container xs={10}>
                    <TextField label="Name" 
                        name="email" 
                        required 
                        fullWidth
                        autoFocus
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container xs={10}>
                    <TextField label="Email" 
                        name="email" 
                        required 
                        fullWidth
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container xs={10}>
                    <TextField label="비밀번호" 
                        type="password" 
                        name="password" 
                        required 
                        fullWidth
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container xs={10}>
                    <TextField label="비밀번호 확인" 
                        type="password" 
                        name="password" 
                        required 
                        fullWidth
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container xs={10}>
                    <Button type="submit" 
                        fullWidth 
                        variant="contained"
                        sx={{mt:2, mb:3}}
                        >회원가입
                    </Button>
                </Grid>

            </div>
        </div>
    )
}

  export default SignUp;