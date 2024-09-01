import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom"; // For getting the ID from the URL
import { mockUsers } from "../../../data/mockData"; // Import mock data

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  role: yup.string().required("required"),
});

const EditUser = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { uid } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // To navigate after submission

  useEffect(() => {
    console.log("ID from params:", uid); // Log the ID
    console.log("Mock data:", mockUsers); // Log the mock data

    const user = mockUsers.find(
      (item) => item.id === parseInt(uid, 10) // or just `item.id === id` if they are strings
    );

    if (user) {
      console.log("Fetched data:", user); // Log the fetched data
      setInitialValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    } else {
      console.log("No matching data found for ID:", uid); // Log if no data is found
    }
  }, [uid]);

  const handleFormSubmit = (values) => {
    console.log("Updated values:", values); // Log the updated values

    // Find the index of the item in mockUsers
    const index = mockUsers.findIndex((item) => item.id === parseInt(uid, 10));

    if (index !== -1) {
      // Update the mock data
      mockUsers[index] = {
        ...mockUsers[index],
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
      };

      console.log("Updated mock data:", mockUsers[index]); // Log the updated item

      // Navigate back to the listing page or show a success message
      navigate("/local_authority"); // Adjust this path as necessary
    } else {
      console.log("Failed to update: No matching data found for ID:", uid);
    }
  };

  return (
    <Box m="20px">
      <Header title={"Edit Local Authority"} subtitle={""} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
                onChange={handleChange} // Updates the values
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name} // Display error messages
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange} // Updates the values
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email} // Display error messages
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange} // Updates the values
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone} // Display error messages
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange} // Updates the values
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role} // Display error messages
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display={"flex"} justifyContent={"end"} mt={"20px"}>
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
