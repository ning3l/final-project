import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import bkg from "../assets/detailPage.png";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    height: "100vh",
    backgroundImage: `url(${bkg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function SignIn({ handleSetNewUser, handleRegister }) {
  const classes = useStyles();

  return (
    <Grid className={classes.image}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src={logo} alt="logo" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => handleSetNewUser(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleSetNewUser(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="city"
              label="city"
              type="city"
              id="city"
              onChange={(e) => handleSetNewUser(e)}
            />
            <FormControlLabel
              control={
                <Checkbox name="plantsitting" value="yes" color="primary" />
              }
              label="Are you up for plant sitting?"
              onChange={(e) => handleSetNewUser(e)}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleRegister(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  <Link to="/login">Already a member?</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grid>
  );
}
