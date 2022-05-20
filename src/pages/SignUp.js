import logo from '../Logo_Login.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../queries/queries';
import { useState, useEffect } from 'react';

export default function SignUp() {

    const [signUp, {loading, error, data}] = useMutation(SIGN_UP);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({name: 'test', email:'test@email.com', password: 'test'});

    const handleInput = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(data !== undefined && data.signup.success) {
            setSuccess(true);
            setMsg(data.signup.message);
        }
    }, [data]);

    const handleSubmit = async e => {
        e.preventDefault();
        await signUp({ variables: {
            name: formData.name,
            email: formData.email,
            hashedPW: formData.password
        }
        });
    };

    // const checkName = (e) => {
    //     const regExp = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    //     console.log('이름 유효성 검사 : ', regExp.test(e.target.value))
    // };
    // const checkEmail = (e) => {
    //     const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    //     console.log('이메일 유효성 검사 : ', regExp.test(e.target.value))
    // };
    // const checkPassword = (e) => {
    //     const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    //     console.log('비밀번호 유효성 검사 : ', regExp.test(e.target.value))
    // };
    


    return(
        <div className='container'>
            <form className='SignUpContainer' onSubmit={handleSubmit}>
                <img src={logo} ></img>
                <Grid container>
                    <TextField label="Name" 
                        name="email" 
                        required 
                        fullWidth
                        autoFocus
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