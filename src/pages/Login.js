import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';
import { LOGIN } from '../queries/queries';


export default function Login() {
  const {loading, error, data} = useQuery(LOGIN, {
    variables: {
      email: "",
      hashedPW: ""
    }
  });

  return (
    <div className='body'>
      <div className='LoginContainer'>
        <img src={logo} ></img>
        <Grid container xs={10}>
          <TextField label="Email" 
            name="email" 
            required 
            fullWidth
            autoFocus
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container xs={10}>
          <TextField label="PW" 
            type="password" 
            name="password" 
            required 
            fullWidth
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container xs={10}>
          <Button type="submit" 
            fullWidth
            variant="contained"
            sx={{mt:1}}
          >로그인</Button>
        </Grid>
        <Grid container xs={10}>
          <Grid item xs={3}>
            <Link>비밀번호 재설정</Link>
          </Grid>
          <Grid item xs={2}>
            <Link>회원가입</Link>
          </Grid>
        </Grid>
      </div>
    </div>
  )
    
}