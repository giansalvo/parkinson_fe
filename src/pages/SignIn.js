import * as React from 'react';
import { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import request from "../utils/request";
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
import {GetItem} from "../utils/storage";

import HomePage from "./HomePage"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Giansalvo Gusinu &nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const postSignInAPI = (url_param, formData) => {
  return request(
    {
      data: formData,
      url: url_param,
      method: 'POST',
    },
    false,
    false
  );
}

export default function SignIn() {

  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // getting stored value
    return GetItem("logged_in");
  });

  useEffect(() => {
    localStorage.setItem("logged_in", JSON.stringify(isLoggedIn))
    localStorage.setItem("username", JSON.stringify(username))
  }, [isLoggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    localStorage.setItem("username", JSON.stringify(data.get('email')))
    console.log({
      email: data.get('email'),
      password: data.get('password'), // TODO REMOVE THIS
    });

  const formData = new FormData()
  formData.append("client_id", "XYnOoW4ABtgxRBVLbHbwkfWHrrvjFN6TC8VnuCqe");
  formData.append("grant_type", 'password');
  formData.append("username", data.get('email'));
  formData.append("password", data.get('password'));

  console.log("formData:", formData)

  const url_param = "https://backend.parkinson.development.abidevops.website/auth/token"
  postSignInAPI(url_param, formData)
  .then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log("res.data.access_token:" + res.data.access_token)
        localStorage.setItem('auth_token', JSON.stringify(res.data.access_token))
        // localStorage.setItem("logged_in", JSON.stringify(isLoggedIn))
      }else {
        setIsError(true);
        setIsLoggedIn(false);
      }

    })
    .catch((err) => {
          setIsError(true);
          console.log("Error: " + err);
          setIsLoggedIn(false);
    })
  };
   
  return (
    <>
    { isLoggedIn ?
      <Redirect to={{HomePage}} />
    :
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./SignUp/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        { isError&& <div>The username or password provided were incorrect.</div>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    }
    </>
  );
}