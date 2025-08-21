import { Box, Chip, Pagination } from "@mui/material";
import ProductList from "./components/ProductList";
import { useProducts } from "../../../hooks/useProducts"; 

const paginationStyles = {
  display: "flex",
  justifyContent: "center",
  mb: 1,
  "& .MuiPaginationItem-root": {
    color: "#ffffff", 
    border: "1px solid rgba(255,255,255,0.4)", 
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "rgba(255,255,255,0.2)", 
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "#1976d2", 
    color: "#ffffff", 
    borderColor: "#1976d2",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#1565c0", 
    },
  },
};

const ProductsScreen = () => {
  const {
    products,
    isLoading,
    page,
    pageCount,
    searchTerm,
    handlePageChange,
    handleDeleteFilter,
  } = useProducts();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, px: 2 }}>
      <Box display="flex" marginBlockStart={2}>
        {searchTerm && (
          <Chip
            label={`Filtro: ${searchTerm}`}
            onDelete={handleDeleteFilter}
            color="primary"
          />
        )}
      </Box>

      <Box sx={{ flexGrow: 1, py: 1 }}>
        <ProductList products={products} isLoading={isLoading} />
      </Box>

      {!isLoading && pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          size="medium"
          sx={paginationStyles}
        />
      )}
    </Box>
  );
};

export default ProductsScreen;