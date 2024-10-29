import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useHttpClient } from "../../../hooks/http-hooks";

const initialValues = {
  name: "",
  nickname: "",
  email: "",
  no_telephone: "",
  area: "",
  state: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  nickname: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  no_telephone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  area: yup.string().required("required"),
  state: yup.string().required("required"),
});

const AddLocalAuthority = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const { sendRequest, error, clearError } = useHttpClient();

  const handleFormSubmit = async (values) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/local_authority/create`,
        "POST",
        JSON.stringify({
          name: values.name,
          nickname: values.nickname,
          email: values.email,
          no_telephone: values.no_telephone,
          area: values.area,
          state: values.state,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (response) {
        // Navigate if response is successful
        navigate("/local_authority");
      }

      clearError();
    } catch (e) {
      console.error("Error Fetching:: ", e.message);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={"Create Local Authority"}
        subtitle={"Create a New Local Authority"}
      />

      {/* Display API error if any */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"grid"}
              gap="30px"
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
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
                value={values.no_telephone}
                name="no_telephone"
                error={!!touched.no_telephone && !!errors.no_telephone}
                helperText={touched.no_telephone && errors.no_telephone}
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

            <Box display={"flex"} justifyContent={"end"} mt={"20px"}>
              <Button type="submit" color="secondary" variant="contained">
                Create New Local Authority
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddLocalAuthority;
