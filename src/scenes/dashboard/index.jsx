import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import LineChart from "../../components/LineChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const barData = [
    { country: "Emails", sent: 1245, received: 920 },
    { country: "Sales", sent: 890, received: 750 },
    { country: "Clients", sent: 570, received: 450 },
    { country: "Traffic", sent: 1350, received: 1120 },
  ];

  const pieData = [
    { id: "Emails", value: 1245, label: "Emails" },
    { id: "Sales", value: 431225, label: "Sales" },
    { id: "Clients", value: 32441, label: "Clients" },
    { id: "Traffic", value: 1325134, label: "Traffic" },
  ];

  return (
    <Box m="20px">
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Stat Boxes */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="20px"
      >
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
      </Box>

      {/* Charts Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="300px"
        gap="20px"
        mt="20px"
      >
        {/* Bar Chart */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} p="20px">
          <Typography variant="h5" sx={{ mb: "10px" }}>
            Sent vs Received
          </Typography>
          <Box height="100%">
            <ResponsiveBar
              data={barData}
              keys={["sent", "received"]}
              indexBy="country"
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              padding={0.3}
              colors={["#f47560", "#e8c1a0"]}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Category",
                legendPosition: "middle",
                legendOffset: 32,
                tickTextColor: colors.grey[100], // Custom tick text color
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Values",
                legendPosition: "middle",
                legendOffset: -40,
                tickTextColor: colors.grey[100], // Custom tick text color
              }}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Line Chart */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} p="20px">
          <LineChart />
        </Box>

        {/* Pie Chart */}
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          p="20px"
        >
          <Typography variant="h5" sx={{ mb: "10px" }}>
            Distribution Overview
          </Typography>
          <Box height="100%">
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsTextColor={colors.grey[100]} // Radial label text color
              radialLabelsLinkColor={colors.grey[100]} // Radial label link color
              sliceLabelsTextColor={colors.grey[100]} // Slice label text color
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
