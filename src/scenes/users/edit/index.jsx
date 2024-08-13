import React from 'react'

const editUser = () => {
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        phone: "",
        area: "",
      });
    
      const isNonMobile = useMediaQuery("(min-width: 600px)");
      const { lid } = useParams(); // Get the ID from the URL
      const navigate = useNavigate(); // To navigate after submission
    
      useEffect(() => {
        console.log("ID from params:", lid); // Log the ID
        console.log("Mock data:", mockLocalAuthority); // Log the mock data
    
        const authority = mockLocalAuthority.find(
          (item) => item.id === parseInt(lid, 10) // or just `item.id === id` if they are strings
        );
    
        if (authority) {
          console.log("Fetched data:", authority); // Log the fetched data
          setInitialValues({
            name: authority.name || "",
            email: authority.email || "",
            phone: authority.phone || "",
            area: authority.area || "",
          });
        } else {
          console.log("No matching data found for ID:", lid); // Log if no data is found
        }
      }, [lid]);
    
      const handleFormSubmit = (values) => {
        console.log("Updated values:", values); // Log the updated values
    
        // Find the index of the item in mockLocalAuthority
        const index = mockLocalAuthority.findIndex((item) => item.id === parseInt(lid, 10));
    
        if (index !== -1) {
          // Update the mock data
          mockLocalAuthority[index] = {
            ...mockLocalAuthority[index],
            name: values.name,
            email: values.email,
            phone: values.phone,
            area: values.area,
          };
    
          console.log("Updated mock data:", mockLocalAuthority[index]); // Log the updated item
    
          // Navigate back to the listing page or show a success message
          navigate("/local_authority"); // Adjust this path as necessary
        } else {
          console.log("Failed to update: No matching data found for ID:", lid);
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
                    label="Area"
                    onBlur={handleBlur}
                    onChange={handleChange} // Updates the values
                    value={values.area}
                    name="area"
                    error={!!touched.area && !!errors.area}
                    helperText={touched.area && errors.area} // Display error messages
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
    
                <Box display={"flex"} justifyContent={"end"} mt={"20px"}>
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

export default editUser