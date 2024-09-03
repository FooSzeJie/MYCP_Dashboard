import { useState, useCallback, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../../../components/ComfirmDialog"; // Import the ConfirmDialog
import { Link } from "react-router-dom";
import { useHttpClient } from "../../../hooks/http-hooks"; // Import the custom hook for handling HTTP requests

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]); // State to store fetched user data
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { isLoading, error, sendRequest } = useHttpClient(); // Custom hook for HTTP requests

  // Fetch user data from the backend API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/list`
        );
        setData(responseData.users); // Assuming your API response has a 'users' field
      } catch (e) {
        console.error("Error fetching users:", e.message);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  const handleOpenDialog = useCallback((id) => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedId !== null) {
      try {
        // await sendRequest();
        // `${process.env.REACT_APP_BACKEND_URL}/users/${selectedId}`,
        // "DELETE"
        // const updatedData = data.filter((item) => item.id !== selectedId);
        // setData(updatedData); // Update state after deletion
        console.log(`Deleted item with id: ${selectedId}`);
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    }
    handleCloseDialog();
  }, [selectedId, handleCloseDialog]);

  const columns = [
    {
      field: "sequence", // Custom field for sequence numbers
      headerName: "No.",
      flex: 0.5,
      renderCell: (params) => {
        // Calculate the sequence number based on the row index in the row models
        const rowIndex = Array.from(params.api.getRowModels().keys()).indexOf(
          params.id
        );
        return rowIndex + 1;
      },
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "no_telephone",
      headerName: "Phone Number",
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}

            {role === "traffic warden" && <SecurityOutlinedIcon />}

            {role === "user" && <LockOpenOutlinedIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
      cellClassName: "name-column--cell",
    },

    {
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row; // Get the id from the row data
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<EditIcon />}
                component={Link} // Use Link component
                to={`/users/edit/${id}`} // Use 'to' prop for navigation
              >
                Edit
              </Button>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleOpenDialog(id)} // Open dialog with the id
              >
                Delete
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of Users" />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "15px",
          },

          "& .MuiDataGrid-cell": {
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
        {/* Display loading state */}
        {isLoading ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Loading users...
          </Typography>
        ) : (
          <DataGrid
            rows={data} // Use fetched data for rows
            columns={columns}
            getRowId={(row) => row._id} // Use _id as the row identifier
            slots={{ toolbar: GridToolbar }}
          />
        )}
      </Box>

      <ConfirmDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this item?"
      />
    </Box>
  );
};

export default Users;
