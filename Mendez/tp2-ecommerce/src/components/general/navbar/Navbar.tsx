import { AppBar, Toolbar, IconButton, Typography, Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useNavbar } from "../../../hooks/useNavBar";
import DesktopNav from "./components/DesktopNav";
import MobileDrawer from "./components/MobileDrawer";

const Logo = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <Box 
    onClick={() => onNavigate("/")} 
    sx={{ cursor: 'pointer', textAlign: 'center', marginInlineEnd: 3 }}
  >
    <LocalMallIcon />
    <Typography fontSize={10}>AXELO</Typography>
  </Box>
);

export default function Navbar() {
  const {
    mobileOpen,
    menuItems,
    handleDrawerToggle,
    handleDrawerClose,
    handleNavigate,
  } = useNavbar();

  return (
    <>
      <AppBar position="fixed">
        <Container sx={{ px: { xs: 0 }, width: "100%" }}>
          <Toolbar sx={{ display: "flex", justifyContent: { xs: "space-between", sm: "start" } }}>
            <Logo onNavigate={handleNavigate} />
            <DesktopNav menuItems={menuItems} onNavigate={handleNavigate} />
            
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        onNavigate={handleNavigate}
        menuItems={menuItems}
      />
    </>
  );
}