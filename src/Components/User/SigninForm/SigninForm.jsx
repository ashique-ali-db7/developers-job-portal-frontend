import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import githublogo2 from "./githubimage.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SigninForm.css";
import FormMessages from "../../../FormMessages/FormMessages";
import GoogleLogin from "react-google-login";

import { useSelector, useDispatch } from "react-redux"; ///To acces state.
import { update_user } from "../../../Redux/user/userSlice"; ///importing action.
import { githubVerification, googleAuth } from "../../../Api/UserApi";

const axios = require("axios");
const theme = createTheme();

export default function SigninForm() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setSubmit] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [gmailError, setGmailError] = useState(false);

  const onSuccess = (response) => {
    let email = { email: response.profileObj.email };
    googleAuth(email)
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        let user = localStorage.getItem("user");

        user = JSON.parse(user);
        dispatch(
          update_user({
            userDetails: user,
          })
        );

        navigation("/");
      })
      .catch(() => {
        setGmailError(true);
      });
  };
  const onFailure = (response) => {
    console.error(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.password) {
      errors.password = FormMessages.required;
    }
    if (!values.email) {
      errors.email = FormMessages.required;
    }

    return errors;
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        let { data } = await axios.post("/signin", formValues, config);

        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        let user = localStorage.getItem("user");
        user = JSON.parse(user);

        dispatch(
          update_user({
            userDetails: user,
          })
        );

        navigation("/");
      } catch (error) {
        setInvalidEmail(error.response.data.message);
      }
    }
  }, [isSubmit]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className="error-color"> {invalidEmail} </span>

          {gmailError && (
            <span className="error-color">You should signup first</span>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <span className="error-color">{formErrors.email}</span>

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
            <span className="error-color">{formErrors.password}</span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"var(--main-blue)"}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <hr />

        <GoogleLogin
          className="githubutton"
          clientId="680809948788-884h20uqor8gnboufpl40vdfi5rflo02.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        >
          <span className=" ms-5 mt-2 mb-1 text-dark">
            CONTINUE WITH GOOGLE
          </span>{" "}
        </GoogleLogin>

        <Grid container>
          {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
          <Grid item>
            <Link
              onClick={() => {
                navigation("/signup");
              }}
              style={{ cursor: "pointer", textDecoration: "none" }}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
