import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom"; // For getting the ID from the URL
import { useHttpClient } from "../../../hooks/http-hooks"; // Import your custom hook

// Yup schema for validation
const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup.string().required("required"),
  role: yup.string().required("required"), // Dropdown validation
});

const EditUser = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { uid } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Navigate after form submission
  const { sendRequest, error } = useHttpClient(); // HTTP hook for API calls

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${uid}/profile`
        );

        setInitialValues({
          name: responseData.user.name || "",
          email: responseData.user.email || "",
          phone: responseData.user.no_telephone || "",
          role: responseData.user.role || "",
        });

        console.log(responseData.user); // Debugging log
      } catch (e) {
        console.error("Failed to fetch user data: ", e.message);
      }
    };

    fetchUser();
  }, [uid, sendRequest]);

  const handleFormSubmit = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid}/admin/update`,
        "PATCH",
        JSON.stringify({
          name: values.name,
          no_telephone: values.phone,
          role: values.role, // Ensure role is included in the request
        }),
        { "Content-Type": "application/json" }
      );

      // Navigate back to the user list page
      navigate("/users");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="Edit Local Authority" subtitle="" />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Role Dropdown */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
                error={!!touched.role && !!errors.role}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="traffic warden">Traffic Warden</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <Typography color="error" variant="caption">
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="success" variant="contained">
                Update User Information
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUser;
