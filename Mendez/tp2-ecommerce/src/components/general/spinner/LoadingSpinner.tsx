import { Box, CircularProgress } from "@mui/material";
import type { LoadingSpinnerProps } from "../../../types/LoadersTypes";

const LoadingSpinner = ({
  size = 60,
  color = "#ffffff",
  fullHeight = true,
}: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        height: fullHeight ? "calc(90vh - 64px)" : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={size} sx={{ color }} />
    </Box>
  );
};

export default LoadingSpinner;
