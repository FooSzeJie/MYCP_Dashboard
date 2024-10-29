import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../../hooks/http-hooks"; // Import your custom hook

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const localAuthoritySchema = yup.object().shape({
  name: yup.string().required("required"),
  nickname: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  area: yup.string().required("required"),
  state: yup.string().required("required"),
});

const EditLocalAuthority = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    nickname: "",
    email: "",
    phone: "",
    area: "",
    state: "",
  });

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { lid } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // To navigate after submission
  const { sendRequest, error } = useHttpClient(); // Custom hook for HTTP requests

  useEffect(() => {
    const fetchAuthority = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/local_authority/${lid}/profile`
        );
        setInitialValues({
          name: responseData.localAuthority.name || "",
          nickname: responseData.localAuthority.nickname || "",
          email: responseData.localAuthority.email || "",
          phone: responseData.localAuthority.no_telephone || "",
          area: responseData.localAuthority.area || "",
          state: responseData.localAuthority.state || "",
        });

        console.log(responseData);
      } catch (err) {
        console.error("Failed to fetch data:", err.message);
      }
    };

    fetchAuthority();
  }, [lid, sendRequest]);

  const handleFormSubmit = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/local_authority/${lid}/update`,
        "PATCH",
        JSON.stringify({
          name: values.name,
          nickname: values.nickname,
          email: values.email,
          no_telephone: values.phone,
          area: values.area,
          state: values.state,
        }),
        { "Content-Type": "application/json" }
      );

      // Navigate back to the listing page or show a success message
      navigate("/local_authority");
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="Edit Local Authority" subtitle="" />

      {/* Display API error if any */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={localAuthoritySchema}
        enableReinitialize // Reinitialize the form when initialValues change
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
                type="text"
                label="Nickname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nickname}
                name="nickname"
                error={!!touched.nickname && !!errors.nickname}
                helperText={touched.nickname && errors.nickname}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
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

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.area}
                name="area"
                error={!!touched.area && !!errors.area}
                helperText={touched.area && errors.area}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="success" variant="contained">
                Update Local Authority
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditLocalAuthority;
