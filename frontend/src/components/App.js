import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import SignUpForm from './SignUpForm';
import User from './User';
import SignInForm from './SignInForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                  <Typography variant="h2" component="h2">
                    Login Page
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                    style={{ fontSize: '3rem' }}
                  >
                    <Button
                      color="secondary"
                      to="/sign-up"
                      component={Link}
                      style={{ fontSize: '1.3rem' }}
                    >
                      Sign Up
                    </Button>
                    <Button
                      color="primary"
                      to="/sign-in"
                      style={{ fontSize: '1.3rem' }}
                      component={Link}
                    >
                      Sign In
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            );
          }}
        />
        <Route exact path="/sign-up" component={SignUpForm} />
        <Route path="/sign-in" component={SignInForm} />
        <Route path="/user" component={User} />
      </Switch>
    </Router>
  );
};

export default App;
