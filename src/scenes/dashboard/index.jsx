import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    { field: "registrarId", headerName: "Registrar ID" },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },

    {
      field: "city",
      headerName: "City",
      flex: 1,
    },

    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Report
        </Button>
      </Box> */}

      {/* GRID & Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        m="10px 0 0 0"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Row 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },

              "& .MuitDataGrid-cell": {
                borderBottom: "none",
              },

              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },

              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },

              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },

              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            {/* rows is the data, columns is the header */}
            <DataGrid
              rows={mockDataContacts}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
