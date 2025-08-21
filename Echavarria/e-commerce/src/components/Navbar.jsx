import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        🛍️24hsShop
                    </Link>
                </Typography>
                {/* <IconButton 
                    component={Link} 
                    to="/"
                    target="_blank"
                    sx={{ filter:'invert(1)' }}
                >
                    <img 
                        src={FacebookIcon} 
                        alt="Facebook" 
                        style={{ width: '24px', height: '24px' }} 
                    />
                </IconButton> */}
                {/* <IconButton 
                    component={Link} 
                    to="/"
                    target="_blank"
                    sx={{ filter:'invert(1)' }}
                >
                    <img 
                        src={InstagramIcon} 
                        alt="Instagram" 
                        style={{ width: '24px', height: '24px' }} 
                    />
                </IconButton>
                <IconButton 
                    component={Link} 
                    to="/"
                    target="_blank"
                    sx={{ filter:'invert(1)' }}
                >
                    <img 
                        src={WhatsAppIcon} 
                        alt="Whatsapp" 
                        style={{ width: '24px', height: '24px' }} 
                    />
                </IconButton> */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;