// Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component={Link} to="/" sx={{ color: "#fff", textDecoration: "none" }}>
            PFAS Scanner
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">Learn</Button>
            <Button color="inherit" component={Link} to="/scan">Scan</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
