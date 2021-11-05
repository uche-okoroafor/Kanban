import React, { useState } from 'react';
import { Box, Container, Avatar, TextField, Button, Typography, IconButton } from '@material-ui/core';
import useStyles from './useStyles';

interface FormValues {
  userName?: string;
  email?: string;
  password?: string;
}

export default function Profile(): JSX.Element {
  const [values, setValues] = useState<FormValues>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const classes = useStyles();
  return (
    <Box>
      <Container className={classes.root} maxWidth="sm">
        <Box className={classes.avatarContainer}>
          <Typography className={classes.title} variant="h6">
            Edit Profile
          </Typography>
          <IconButton>
            <Avatar className={classes.avatar} />
          </IconButton>
        </Box>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.input}
            value={values.userName}
            type="text"
            id="username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            className={classes.input}
            value={values.email}
            type="email"
            id="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            className={classes.input}
            value={values.password}
            type="password"
            id="password"
            placeholder="Password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </form>
        <Button className={classes.buttonContainer} fullWidth>
          Update Profile
        </Button>
      </Container>
    </Box>
  );
}
