import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import resonateLogo from "../assets/resonate-horizontal-color.png";

const TopAppBar = () => {
  return (
    <AppBar position="sticky" style={{ background: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ padding: 2, flexGrow: 1 }}>
            <img alt="logo" src={resonateLogo} style={{ height: 40 }} />
          </Box>
          <Box sx={{ padding: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopAppBar;
