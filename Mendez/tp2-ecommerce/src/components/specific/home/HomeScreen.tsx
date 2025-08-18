import { Box, Typography } from "@mui/material";
import { useSearch } from "../../../hooks/useSearch";
import SearchHome from "./components/SearchHome";
import "../../../App.css";

const HomeScreen = () => {
  const { searchTerm, error, handleSearchTermChange, handleSubmit } = useSearch();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 600,
          textAlign: "center",
          mb: 3,
        }}
      >
        Find your product
      </Typography>

      <SearchHome
        searchTerm={searchTerm}
        error={error}
        onSearchTermChange={handleSearchTermChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default HomeScreen;