import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 }}>
                    Danz Job Project
                </Typography>
                <Link to={'/'}>
                    <Button style={{ color: '#FFF' }} color="inherit">Login</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}