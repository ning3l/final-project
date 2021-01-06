import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Hidden,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import loginImg from "../assets/signup.jpg";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${loginImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0000ff",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperLeft: {
    width: "80%",
    padding: "30px",
  },
}));

export default function Login({ handleSetCredentials, handleLogin }) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <Hidden smDown>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{
              minHeight: "100vh",
              opacity: "0.8",
            }}
          >
            <Paper className={classes.paperLeft}>
              <Typography style={{ fontSize: "2em", fontWeight: "500" }}>
                <u>
                  <span style={{ backgroundColor: "yellow" }}>
                    plant parenthood
                  </span>
                </u>{" "}
                has never been easier.
                <br></br>
                Browse for grooming tips, set maintenance notifications and get
                in touch with{" "}
                <u>
                  <span style={{ backgroundColor: "yellow" }}>other users</span>
                </u>{" "}
                to exchange offspring or arrange plant sitting.{" "}
                <SentimentSatisfiedAltIcon fontSize="large" />
              </Typography>
            </Paper>
          </Box>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CheckOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              onChange={(e) => handleSetCredentials(e)}
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
              onChange={(e) => handleSetCredentials(e)}
            />
            <Button
              // type="submit"
              fullWidth
              variant="outlined"
              className={classes.submit}
              onClick={() => handleLogin()}
            >
              Enter
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  {" "}
                  <Link to="/signup">No account? Sign Up </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
