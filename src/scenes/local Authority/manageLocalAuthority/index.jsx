import { useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import Header from "../../../components/Header";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import ConfirmDialog from "../../../components/ComfirmDialog";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../../hooks/http-hooks";

const LocalAuthority = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLocalAuthority = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/local_authority/list`
        );
        setData(responseData.localAuthority || []);
      } catch (e) {
        console.error("Error fetching data:", e.message);
      }
    };

    fetchLocalAuthority();
  }, [sendRequest]);

  const handleOpenDialog = useCallback((id, action) => {
    setSelectedId(id);
    setDialogAction(action);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
    setDialogAction("");
  }, []);

  const handleConfirm = useCallback(async () => {
    if (dialogAction === "delete") {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/local_authority/${selectedId}/delete`,
          "DELETE"
        );
        setData((prevData) =>
          prevData.filter((item) => item.id !== selectedId)
        );
      } catch (e) {
        console.error("Error deleting item:", e.message);
      }
    } else if (dialogAction === "paid") {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/local_authority/${selectedId}/paid`,
          "PATCH"
        );
        setData((prevData) =>
          prevData.map((item) =>
            item.id === selectedId ? { ...item, income: 0 } : item
          )
        );
      } catch (e) {
        console.error("Error updating income:", e.message);
      }
    }
    handleCloseDialog();
  }, [dialogAction, selectedId, sendRequest, handleCloseDialog]);

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
    { field: "no_telephone", headerName: "Phone", flex: 0.8 },
    { field: "income", headerName: "Income", flex: 0.7 },
    { field: "total_income", headerName: "Total Income", flex: 0.7 },
    { field: "area", headerName: "Area", flex: 0.8 },
    { field: "state", headerName: "State", flex: 0.7 },
    {
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap", // Allow buttons to wrap on small screens
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              component={Link}
              to={`/local_authority/edit/${id}`}
              size="small"
            />

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleOpenDialog(id, "delete")}
              size="small"
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<PaymentIcon />}
              component={Link}
              to="/paypal-payment"
              state={{
                income: params.row.income,
                authorityId: params.row.id,
                uid: "677632e24a06db9562ce8bc0",
                lid: id,
              }}
              // onClick={() => handleOpenDialog(id, "paid")}
              size="small"
            />
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
          "& .MuiDataGrid-root": { border: "none", fontSize: "14px" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
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
        onConfirm={handleConfirm}
        action={dialogAction === "delete" ? "Delete" : "Payment"}
        title={dialogAction === "delete" ? "Confirm Delete" : "Confirm Payment"}
        content={
          dialogAction === "delete"
            ? "Are you sure you want to delete this item?"
            : "Are you sure you want to initiate the payment?"
        }
      />
    </Box>
  );
};

export default LocalAuthority;
