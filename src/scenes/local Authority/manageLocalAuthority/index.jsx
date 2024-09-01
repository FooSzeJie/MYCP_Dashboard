import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockLocalAuthority as initialData } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../../../components/ComfirmDialog"; // Import the ConfirmDialog

const LocalAuthority = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(initialData);
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

    { field: "email", headerName: "Email", flex: 1 },

    { field: "phone", headerName: "Phone Number", flex: 1 },

    { field: "area", headerName: "Area", flex: 1 },

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
              href={`/local_authority/edit/${id}`}
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
        <DataGrid
          rows={data}
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

export default LocalAuthority;
