import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const User = (props) => {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const fetchData = () => {
    fetch('/api/room?email=' + props.location.state.email)
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      });
  };
  fetchData();
  return (
    <React.Fragment>
      <h1>
        <span style={{ color: 'green' }}>LOGIN DETAILS:-</span>
      </h1>
      <h1>
        First Name: <span style={{ color: 'red' }}>{firstName}</span>
      </h1>
      <h1>
        Last Name: <span style={{ color: 'red' }}>{lastName}</span>
      </h1>
      <h1>
        Email: <span style={{ color: 'red' }}>{email}</span>
      </h1>
      <Button
        color="secondary"
        variant="contained"
        to="/"
        style={{ fontSize: '1.3rem' }}
        component={Link}
      >
        BACK
      </Button>
    </React.Fragment>
  );
};

export default User;
