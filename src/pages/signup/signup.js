import React, { useState } from "react";

import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { deepPurple } from "@mui/material/colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"; // Import Firebase auth module
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const Signup = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Lo successfully:", response);
      Navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 4, sm: 8 },
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginTop: 1,
              marginBottom: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight={600}>
              Sign Up
            </Typography>

            <Box component="form" noValidate sx={{ mt: 3, width: "100%" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="password"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: deepPurple[500],
                  "&:hover": { backgroundColor: deepPurple[700] },
                }}
              >
                Sign Up
              </Button>

              {/* Link to Login */}
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link href="/Signup" variant="body2">
                      Sign in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
