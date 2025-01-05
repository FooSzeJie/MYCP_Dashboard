import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useHttpClient } from "../hooks/http-hooks";

const PayPalPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { income, authorityId: passedAuthorityId, uid } = location.state || {};
  const [money, setMoney] = useState(income || ""); // Prefilled payment amount
  const [authorityId, setAuthorityId] = useState(passedAuthorityId || ""); // Prefilled authority ID
  const [approvalLink, setApprovalLink] = useState(""); // To store PayPal approval link
  const { isLoading, error, sendRequest } = useHttpClient(); // Custom HTTP hook

  const handlePay = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/transaction/${uid}/paypal/local_authority`,
        "POST",
        JSON.stringify({ money, authority_id: authorityId }),
        { "Content-Type": "application/json" }
      );

      if (responseData.approvalLink) {
        handleClearIncome(); // Call the backend to clear income
        setApprovalLink(responseData.approvalLink);
        window.open(responseData.approvalLink, "_blank"); // Redirect to PayPal in a new tab
      } else {
        console.error("PayPal approval link missing in response.");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err.message);
    }
  };

  const handleClearIncome = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/local_authority/${authorityId}/paid`,
        "PATCH"
      );
      console.log("Income cleared successfully.");
    } catch (err) {
      console.error("Failed to clear income:", err.message);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("success")) {
      alert("Payment successful!");
      handleClearIncome(); // Call the backend to clear income
      navigate("http://localhost:3000/local_authority", { replace: true }); // Redirect to Local Authority page
    }
    if (queryParams.get("cancel")) {
      alert("Payment cancelled.");
      navigate("http://localhost:3000/local_authority", { replace: true });
    }
  }, [location, navigate, handleClearIncome]);

  return (
    <Box sx={{ m: "20px" }}>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        PayPal Payment
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          label="Payment Amount (MYR)"
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "grey" } }}
        />
        {/* 
        <TextField
          label="Local Authority ID"
          type="text"
          value={authorityId}
          onChange={(e) => setAuthorityId(e.target.value)}
          fullWidth
          InputLabelProps={{ style: { color: "grey" } }}
        /> */}

        {isLoading ? (
          <Typography variant="h6" align="center">
            Processing Payment...
          </Typography>
        ) : (
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
            onClick={handlePay}
          >
            Pay with PayPal
          </Button>
        )}

        {error && (
          <Typography color="error" align="center">
            Error: {error}
          </Typography>
        )}

        {approvalLink && (
          <Typography color="success" align="center">
            <a href={approvalLink} target="_blank" rel="noopener noreferrer">
              Click here to complete the payment
            </a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PayPalPayment;
