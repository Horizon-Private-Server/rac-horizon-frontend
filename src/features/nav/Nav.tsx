import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import useWindowDimensions from "../../components/utils/WindowDimensions";

import { NavState } from "./navSlice";
import NavItem from "./NavItem";

import horizonCircleLogo from "../../assets/img/logo.png";

const drawerWidth: number = 241;

const Nav = (props: NavState) => {

    const {header, headerAbbreviated, navItems, logo, children} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { height, width } = useWindowDimensions();
    const isMobile = width <= 1500;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box>
            <Toolbar style={{margin: "0px", padding: "0px"}}>
                {logo}
            </Toolbar>
            <Divider />
            <React.Fragment key={0}>
                <List>
                    { navItems.map((elem) => {
                        return <NavItem 
                            label={elem.label}
                            tooltip={elem.tooltip}
                            icon={elem.icon}
                            path={elem.path}
                            hidden={elem.hidden}
                        />
                    })}
                </List>
            </React.Fragment>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                        size="large"
                    >
                        {/* <MenuIcon /> */}
                        <img src={horizonCircleLogo} alt="Horizon Circle Logo" width="38px" height="38px" style={{padding: "0px", margin: "0px"}} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {isMobile ? headerAbbreviated : header}
                    </Typography>
                </Toolbar>

            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Nav;
