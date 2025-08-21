import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { SearchHomeProps } from "../../../../types/HomeTypes";

const styles = {
  formContainer: {
    display: "flex",
    gap: 1,
    width: "100%",
    maxWidth: 1000,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    p: 1,
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      bgcolor: "white",
      borderRadius: 2,
      pr: 0,
    },
  },
  button: {
    height: "56px",
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 600,
    px: 3,
    bgcolor: "#0070f3",
    "&:hover": { bgcolor: "#005bb5" },
  },
};

const SearchHome = ({ searchTerm, error, onSearchTermChange, onSubmit }: SearchHomeProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={styles.formContainer}>
      <TextField
        fullWidth
        placeholder="Search for products..."
        variant="outlined"
        size="medium"
        value={searchTerm}
        onChange={onSearchTermChange}
        error={!!error}
        helperText={error}
        sx={styles.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={styles.button}>
        Search
      </Button>
    </Box>
  );
};

export default SearchHome;