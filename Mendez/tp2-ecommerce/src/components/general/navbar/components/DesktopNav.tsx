import { Box, Button } from "@mui/material";
import type {  DesktopNavProps } from "../../../../types/NavBarTypes";

const DesktopNav = ({ menuItems, onNavigate }: DesktopNavProps) => {
  return (
    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => onNavigate(item.path)}
        >
          {item.title}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;