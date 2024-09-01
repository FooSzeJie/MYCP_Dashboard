import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockUsers } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ConfirmDialog from "../../../components/ComfirmDialog"; // Import the ConfirmDialog

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenDialog = useCallback((id) => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedId !== null) {
      const updatedData = data.filter((item) => item.id !== selectedId);
      setData(updatedData);
      console.log(`Deleted item with id: ${selectedId}`);
    }
    handleCloseDialog();
  }, [data, selectedId, handleCloseDialog]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

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
      field: "phone",
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
                href={`/users/edit/${id}`} // Use the id in the URL
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

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "15px",
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
          rows={mockUsers}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
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
