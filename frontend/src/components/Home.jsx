import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScannerImg from "../assets/scanner.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "calc(100vh - 64px)", // Subtract AppBar height (default ~64px)
        backgroundColor: "#f5faff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            PFAS Ingredient Scanner
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Upload or paste ingredients from your product to check for harmful
            chemicals like PFAS.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/scan")}>
            Start Scanning
          </Button>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={ScannerImg}
            alt="Scanner Illustration"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
