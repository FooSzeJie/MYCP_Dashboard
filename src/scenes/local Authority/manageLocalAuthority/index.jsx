import { useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
// import { mockLocalAuthority as initialData } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../../../components/ComfirmDialog"; // Import the ConfirmDialog
import { Link } from "react-router-dom";
import { useHttpClient } from "../../../hooks/http-hooks"; // Import the custom hook for handling HTTP requests

const LocalAuthority = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { isLoading, error, sendRequest } = useHttpClient(); // Custom hook for HTTP requests

  // Fetch user data from the backend API on component mount
  useEffect(() => {
    const fetchLocalAuthority = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/local_authority/list`
        );
        setData(responseData.localAuthority); // Assuming your API response has a 'localAuthority' field
      } catch (e) {
        console.error("Error fetching data:", e.message);
      }
    };

    fetchLocalAuthority();
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
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/local_authority/${selectedId}/delete`,
        "DELETE",
        null
      );
      // Filter out the deleted item from the local data state
      setData((prevData) => prevData.filter((item) => item.id !== selectedId));
    } catch (e) {
      console.error("Error deleting item:", e.message);
    } finally {
      handleCloseDialog(); // Close the confirmation dialog
    }
  }, [selectedId, sendRequest, handleCloseDialog]);

  const columns = [
    {
      field: "sequence", // Custom field for sequence numbers
      headerName: "No.",
      flex: 0.5,
      renderCell: (params) => {
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
    { field: "nickname", headerName: "NickName", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "no_telephone", headerName: "Phone Number", flex: 1 },
    { field: "area", headerName: "Area", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },

    {
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              component={Link}
              to={`/local_authority/edit/${id}`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleOpenDialog(id)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Local Authority" subtitle="List of Local Authority" />

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
            Loading Local Authority...
          </Typography>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
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

export default LocalAuthority;
