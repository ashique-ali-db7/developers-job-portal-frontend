import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import githublogo2 from './githubimage.png'
import { useNavigate} from "react-router-dom";
import {useState,useEffect} from 'react';
import './SigninForm.css'
import LoginGithub from 'react-login-github';
import { SocialIcon } from 'react-social-icons';
const axios = require('axios');
const theme = createTheme();

export default function SigninForm() {
  const navigation = useNavigate();
  const initialValues = {email:"",password:""};
  const [formErrors,setFormErrors] = useState({});
  const [formValues,setFormValues] = useState(initialValues);
  const [isSubmit,setSubmit] = useState(false);
  const [invalidEmail,setInvalidEmail] = useState("");


  const onSuccess = (response) => {

    console.log(response);

  }
  const onFailure = (response) =>{console.error(response);} 

  

  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormValues({...formValues,[name]:value})
    
  }






  const handleSubmit = (e) => {
   
    e.preventDefault()
    setFormErrors(validate(formValues))
    setSubmit(true)

  };



  const validate = (values) =>{
    const errors = {}
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!values.password){
      errors.password = "This field is required";
    }
    if(!values.email){
      errors.email = "This field is required";
    }
   
   
    return errors
  }


  useEffect(async()=>{


    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log("min");
  try{
    const config = {
      headers:{
        "Content-type":"application/json"
      }
    }
  
  let {data} =await axios.post('/signin',formValues,config)
 
  localStorage.setItem("token",JSON.stringify(data.token));
  localStorage.setItem("user",JSON.stringify(data.user));
   
   setSubmit(false)
    navigation('/')
  
  
  }
  catch(error){
    setInvalidEmail(error.response.data.message)
   

    setSubmit(false)
  }
  
    }
   
  
  },[isSubmit])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{color:"red"}}> {invalidEmail} </span> 
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <span style={{color:"red"}}>{formErrors.email }</span> 
           
          
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
                 <span style={{color:"red"}}>{formErrors.password }</span> 
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"#3FA796"}}
            >
              Sign In
            </Button>
          
          </Box>
        </Box>
      <hr />
      {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            
              style={{backgroundColor:"black"}} 
            >
    <img src={githublogo2} alt="" className='githubLogo  me-auto'/> <span className='me-auto'>Continue with github</span> 
            </Button> */}

            <LoginGithub className="githubutton"   clientId="ca2dcbee0004aa8fae1e"
            
    onSuccess={onSuccess}
    onFailure={onFailure}
  
    ><img src={githublogo2} alt="" className='githubLogo  me-auto'/> <span className='me-auto mt-2 mb-1'>CONTINUE WITH GITHUB</span> </LoginGithub>

            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link onClick={()=>{
                  navigation("/signup")
                }} style={{cursor:"pointer",textDecoration:"none"}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
      </Container>
    </ThemeProvider>
  );
}
