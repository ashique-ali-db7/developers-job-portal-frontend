import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { adminSignin } from "../../../Api/AdminApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function AdminLogin() {
    const [errorMessage,setErrorMessage] = useState("");
    const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    adminSignin(data,(result)=>{
        if(result.token){
            localStorage.setItem("adminToken", JSON.stringify(result.token));
          navigation('/admin/dashboard')
        }else{
           setErrorMessage(result);
        }
    });
  };

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
            <Typography component="h1" color="red" variant="h5">
            {errorMessage}
          </Typography>
          <Typography component="h1" variant="h5">
            ADMIN SIGN IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              {...register("name", { required: true })}
              autoComplete="email"
              autoFocus
            />
            {errors.name && (
              <span className="error-message">This field is required</span>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password", { required: true })}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="error-message">This field is required</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
