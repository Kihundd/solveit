import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../queries/queries';
import { useEffect, useState } from 'react';

export default function Login() {

  const [formData, setFormData] = useState({email:'test@email.com', password: 'test'});
  const [login, {data, loading, error}] = useLazyQuery(LOGIN);
  const [response, setResponse] = useState([false]);

  const checkEmail = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
  }
  const checkPassword = (e) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
  };

  const handleInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    await Login({variables: {
      email: formData.email,
      hashedPW: formData.password
    }, fetchPolicy: 'no-cache'
    });
  };

  useEffect(() => {
    console.log(data);
    if(data !== undefined) {
      document.cookie = `token=${data.login.jwt}`;
      setResponse([true, data.login]);
    }
  }, [data]);

  return (
    <div className='body'>
      <form className='LoginContainer' onSubmit={handleSubmit}>
        <img src={logo} ></img>
        <Grid container>
          <TextField label="Email" 
            type="email"
            name="email" 
            required 
            fullWidth
            autoFocus
            onChange={handleInput}
            defaultValue={formData.email}
            onBlur={checkEmail}
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container>
          <TextField label="PW" 
            type="password" 
            name="password" 
            required 
            fullWidth
            onChange={handleInput}
            defaultValue={formData.password}
            onBlur={checkPassword}
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container>
          <Button type="button" onClick={handleSubmit} 
            fullWidth
            variant="contained"
            sx={{mt:1}}
          >로그인
          </Button>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Link>비밀번호 재설정</Link>
          </Grid>
          <Grid item xs={2}>
            <Link>회원가입</Link>
          </Grid>
        </Grid>
        
      </form>
    </div>
    
  )
    
}