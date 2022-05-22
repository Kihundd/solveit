import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useLazyQuery } from '@apollo/client';
import { LOGIN } from '../queries/queries';
import { useEffect, useState } from 'react';
import useForm from '../Hooks/useForm';

export default function Login() {

  const [formData, setFormData] = useState({email:'test@email.com', password: 'test'});
  const [login, {data, loading, error}] = useLazyQuery(LOGIN);
  const [response, setResponse] = useState([false]);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const checkEmail = (e) => {
  //   var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  //   console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
  // }
  // const checkPassword = (e) => {
  //   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  //   console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
  // };

  const {add, handleSubmit} = useForm();

  const handleInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   await login({variables: {
  //     email: formData.email,
  //     hashedPW: formData.password
  //   }, fetchPolicy: 'no-cache'
  //   });
  // };

  const onSuccess = async (data) => {
    console.log(data);
    await login({variables: {
        ID: data.email.value,
        hashedPW: data.password.value
      }, fetchPolicy: 'no-cache'
    });
  };

  const onFail = (data, error) => {
    console.log(error);
    if(error['email'] != null) {
      setEmailError("Email must contains @!");
    }
    if(error['password'] != null) {
      setPasswordError("A password should be at least 4");
    }
  }

  useEffect(() => {
    if(data !== undefined) {
      document.cookie = `token=${data.login}`;
      setResponse([true, data.login]);
      console.log('LogIn');
    }
  }, [data]);

  return (
    <div className='body'>
      <form className='LoginContainer' onSubmit={e => handleSubmit(e, onSuccess, onFail)}>
        <img src={logo} ></img>
        <Grid container>
          <TextField label="Email" 
            type="text"
            name="email" 
            required 
            fullWidth
            autoFocus
            onFocus={_ => setEmailError("")}
            helperText={emailError}
            error={emailError === ""? false: true}
            {...add({name:'email', contains: '@', value: 'test@test.com'})}
          
            // onBlur={checkEmail}
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container>
          <TextField label="PW" 
            type="password" 
            name="password" 
            required 
            fullWidth
            onFocus={_ => setPasswordError("")}
            helperText={passwordError}
            error={passwordError === ""? false: true}
            {...add({name:'password', minlength: 4, value: 'test'})}
            // onChange={handleInput}
            // defaultValue={formData.password}
            // onBlur={checkPassword}
            // sx={{mt:1}}
          />
        </Grid>
        <Grid container>
          <Button type="submit" 
            fullWidth
            variant="contained"
            sx={{mt:1}}
          >로그인
          </Button>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Link href="/">비밀번호 재설정</Link>
          </Grid>
          <Grid item xs={2}>
            <Link href="/SignUp">회원가입</Link>
          </Grid>
        </Grid>
        
      </form>
    </div>
    
  )
    
}