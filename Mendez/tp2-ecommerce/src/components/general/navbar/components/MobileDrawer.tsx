import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import type { MobileDrawerProps } from "../../../../types/NavBarTypes";

const MobileDrawer = ({ open, onClose, onNavigate, menuItems }: MobileDrawerProps) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 250 }} role="presentation">
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, alignItems: "center", backgroundColor: "#1877F2" }}>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <ArrowBackIosIcon />
            <Typography fontWeight={700}>VOLVER</Typography>
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton onClick={() => onNavigate(item.path)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;