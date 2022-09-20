import logo from '../logo2.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../queries/queries';
import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const navigate = useNavigate();
    const [signUp, {loading, error, data}] = useMutation(SIGN_UP);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({name: 'dddd', email:'ddd@email.com', password: 'ddddd'});
    
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const {add, handleSubmit} = useForm();

    const handleInput = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSuccess = async (data) => {
        console.log(data);
        await signUp({variables: {
            name : data.name.value,
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
        if(data !== undefined && data.signup.success) {
            console.log(data)
            setSuccess(true);
            setMsg(data.signup.message);
        }
    }, [data]);

    return(
        <div className='body'>
            <form className='SignUpContainer' onSubmit={e => handleSubmit(e, onSuccess, onFail)}>
                <img src={logo} ></img>
                <Grid container>
                    <TextField label="Name" 
                        name="email" 
                        required 
                        fullWidth
                        autoFocus
                        // onChange={handleInput}
                        {...add({name:'name'})}
                        // defaultValue={formData.name}
                        // onBlur={{checkName}}

                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container>
                    <TextField label="Email" 
                        type="email"
                        name="email" 
                        required 
                        fullWidth
                        onFocus={_ => setEmailError("")}
                        helperText={emailError}
                        error={emailError === ""? false: true}
                        {...add({name:'email', contains: '@', value: 'test@test.com'})}
                        // defaultValue={formData.email}
                        // onChange={handleInput}
                        // onBlur={{checkEmail}}
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container>
                    <TextField label="비밀번호" 
                        type="password" 
                        name="password" 
                        required 
                        fullWidth
                        onFocus={_ => setPasswordError("")}
                        helperText={passwordError}
                        error={passwordError === ""? false: true}
                        {...add({name:'password', minlength: 4, value: 'test'})}
                        // defaultValue={formData.password}
                        // onBlur={{checkPassword}}
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container>
                    <TextField label="비밀번호 확인" 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        fullWidth
                        onFocus={_ => setPasswordError("")}
                        helperText={passwordError}
                        error={passwordError === ""? false: true}
                        {...add({name:'password', minlength: 4, value: 'test'})}
                        // defaultValue={formData.password}
                        sx={{mt:2}}
                    />
                </Grid>
                <Grid container>
                    <Button type="submit" 
                        fullWidth 
                        variant="contained"
                        sx={{mt:2, mb:3}}
                        >회원가입
                    </Button>
                    
                </Grid>

            </ form>
        </ div>
    )
}