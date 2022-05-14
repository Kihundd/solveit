import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


function Login() {
    return(
      <div className='LoginContainer'>
        <img src={logo} ></img>
  
        <TextField label="Email" 
        name="email" 
        required 
        fullWidth
        autoFocus
        sx={{mt:1}}
        />
  
        <TextField label="PW" 
        type="password" 
        name="password" 
        required 
        fullWidth
        sx={{mt:3}}
        />
  
        <Grid container>
          <Grid item>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              sx={{mt:1}}
              label="로그인 정보 저장"
            />
          </Grid>
        </Grid>
        
        <Button type="submit" 
          fullWidth 
          variant="contained"
          sx={{mt:1, mb:1}}
        >로그인</Button>
  
        <Grid container>
          <Grid item xs={3}>
            <Link>비밀번호 재설정</Link>
          </Grid>
          <Grid item xs={2}>
            <Link>회원가입</Link>
          </Grid>
        </Grid>
      </div>
    )
}

  export default Login;