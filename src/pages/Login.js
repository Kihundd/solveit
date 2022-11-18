import logo from '../logo2.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useLazyQuery } from '@apollo/client';
import { LOGIN, ROLE } from '../queries/queries';
import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [formData, setFormData] = useState({email:'test@email.com', password: 'test'});
  const [login, {data, loading, error}] = useLazyQuery(LOGIN);
  const [response, setResponse] = useState([false]);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState(false);

  const [getRole] = useLazyQuery(ROLE);
  

  const {add, handleSubmit} = useForm();

  const navigate = useNavigate();

  const handleInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  

  const onSuccess = async (data) => {
    const response = await login({variables: {
        ID: data.email.value,
        hashedPW: data.password.value
      }, fetchPolicy: 'no-cache'
    });

    const roleResponse = await getRole({variables: {
      ID: data.email.value
    }})

    console.log(roleResponse)
    if(response.data.login !== null) {
      document.cookie = `token=${response.data.login}`;
      if(roleResponse.data.profile.role == 0){
        navigate('/');
      }
      else{
        navigate('/Admin/Setting')
      }
      // setResponse([true, response.data.login]);
    }
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

  return (
    <div className='body'>
      <form className='LoginContainer' onSubmit={e => handleSubmit(e, onSuccess, onFail)}>
        <img src={logo} ></img>
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
        />
        <TextField label="PW" 
          type="password" 
          name="password" 
          required 
          fullWidth
          onFocus={_ => setPasswordError("")}
          helperText={passwordError}
          error={passwordError === ""? false: true}
          {...add({name:'password', minlength: 4, value: 'test'})}
        />
        <Button type="submit" 
          fullWidth
          variant="contained"
          sx={{mt:1}}
        >로그인
        </Button>
        <Grid container>
          <Grid item xs={8} sx={{textAlign: 'left'}}>
            <Link href="/" underline='none' color='inherit'>비밀번호 재설정</Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="/SignUp" underline='none' color='inherit' sx={{float: 'right'}}>회원가입</Link>
          </Grid>
        </Grid>

      </form>
    </div>
  )
    
}