import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import { useHttpClient } from "../hooks/http-hooks";
import { tokens } from "../theme";

const RechartsLineChart = () => {
  const [lineData, setLineData] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transaction/daily_income`
        );

        if (responseData?.dailyIncome) {
          const formattedData = responseData.dailyIncome.map((item) => ({
            date: item.date, // x-axis value
            income: item.income, // y-axis value
          }));

          setLineData(formattedData);
        } else {
          console.error("dailyIncome property missing from response data.");
        }
      } catch (error) {
        console.error("Failed to fetch transaction data:", error.message);
      }
    };

    fetchTransactions();
  }, [sendRequest]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "10px", color: colors.grey[100] }}>
        Daily Income Trends
      </Typography>
      <Box
        height="275px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : lineData.length > 0 ? (
          <LineChart
            width={500} // Fix width
            height={300} // Fix height
            data={lineData}
            margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: colors.grey[100] }}
              label={{
                value: "Date",
                position: "insideBottom",
                offset: -5,
                fill: colors.grey[100],
              }}
            />
            <YAxis
              tick={{ fill: colors.grey[100] }}
              label={{
                value: "Income ($)",
                angle: -90,
                position: "insideLeft",
                fill: colors.grey[100],
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              }}
              itemStyle={{ color: colors.grey[100] }}
              labelStyle={{ color: colors.grey[100] }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#61cdbb"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <Typography>No data available to display.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default RechartsLineChart;
