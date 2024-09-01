import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to log in.");
      }

      onLogin(responseData.token);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      padding="20px"
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#f5576c",
          }}
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f093fb",
          }}
        >
          Please login to your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Alert>
        )}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="20px" mt="20px">
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "16px",
                      color: "black",
                      "& fieldset": {
                        borderColor: "#f093fb",
                      },
                      "&:hover fieldset": {
                        borderColor: "#f5576c",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#f5576c",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "grey",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "16px",
                      color: "black",
                      "& fieldset": {
                        borderColor: "#f093fb",
                      },
                      "&:hover fieldset": {
                        borderColor: "#f5576c",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#f5576c",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "grey",
                    },
                  }}
                />
              </Box>

              <Box display="flex" justifyContent="center" mt="30px">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#f5576c",
                    padding: "10px 20px",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#f093fb",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
