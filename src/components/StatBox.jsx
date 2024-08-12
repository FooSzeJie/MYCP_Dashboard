import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width={"100%"} m={"0 30px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          {icon}

          <Box display={"flex"}>
            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography
            variant={"h4"}
            fontWeight={"bold"}
            color={colors.grey[100]}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
