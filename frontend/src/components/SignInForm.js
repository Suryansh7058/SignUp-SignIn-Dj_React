import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const SignInForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const backClickHandler = () => {
    setEmail('');
    setPassword('');
    props.history.push('/');
  };

  const submitFormHandler = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch('/api/verify-user', requestOptions)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          throw new Error('Sign-In Failed in console');
        }
      })
      .then((data) => {
        setTimeout(() => {
          setSuccessMsg('');
          props.history.push({
            pathname: '/user',
            state: {
              email: data.email,
            },
          });
        }, 1000);
        setSuccessMsg('Sign-In Successful');
      })
      .catch((err) => {
        setErrorMsg('Sign-In Failed');
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Collapse in={errorMsg.length > 0 || successMsg.length > 0}>
            {successMsg.length > 0 ? (
              <Alert
                severity="success"
                onClose={() => {
                  setSuccessMsg('');
                  setErrorMsg('');
                }}
                style={{
                  fontSize: '2rem',
                  maxWidth: '30rem',
                  marginBottom: '2rem',
                  background: 'rgba(0,128,0,0.2)',
                }}
              >
                {successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                style={{
                  fontSize: '2rem',
                  maxWidth: '30rem',
                  marginBottom: '2rem',
                }}
              >
                {errorMsg}
              </Alert>
            )}
          </Collapse>
          <Typography component="h2" variant="h2">
            Sign In
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="email"
              defaultValue={email}
              onChange={emailChangeHandler}
              inputProps={{
                style: { textAlign: 'center', fontSize: '1.2rem' },
              }}
            />
            <FormHelperText
              id="my-helper-text"
              style={{ textAlign: 'center', fontSize: '1.2rem' }}
            >
              Email
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="password"
              defaultValue={password}
              onChange={passwordChangeHandler}
              inputProps={{
                style: { textAlign: 'center', fontSize: '1.2rem' },
              }}
            />
            <FormHelperText
              id="my-helper-text"
              style={{ textAlign: 'center', fontSize: '1.2rem' }}
            >
              Password
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={submitFormHandler}
            style={{ fontSize: '1.2rem' }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={backClickHandler}
            style={{ fontSize: '1.2rem' }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignInForm;
