import { Box } from "@mui/material";
import ImageTabs from "../../../general/tabs/ImageTab";
import type { ImageTabsProps } from "../../../../types/ImageTypes";

export const ProductImageGallery = ({ images }: ImageTabsProps) => (
  <Box sx={{ width: { sm: "50%" }, p: 2 }}>
    <ImageTabs images={images} />
  </Box>
);