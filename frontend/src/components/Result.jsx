import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.results) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography>No data to display.</Typography>
      </Container>
    );
  }

  const results = state.results;
  const toxicIngredients = results.filter((item) => item.toxic);
  const isDangerous = toxicIngredients.length > 0;

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#fefefe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        boxSizing: "border-box",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Scan Results
        </Typography>

        <Typography
          variant="body1"
          color={isDangerous ? "error" : "success.main"}
          align="center"
          sx={{ mb: 2 }}
        >
          {isDangerous
            ? "⚠️ Potentially harmful ingredients detected!"
            : "✅ No harmful PFAS or toxic ingredients found."}{" "}
          {isDangerous ? (
            <WarningAmberIcon color="error" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {isDangerous ? (
          <>
            {toxicIngredients.some((item) => item.is_pfas) && (
              <>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  🔴 PFAS ingredients detected:
                </Typography>
                <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                  {toxicIngredients
                    .filter((item) => item.is_pfas)
                    .map((item, idx) => (
                      <Grid item key={`pfas-${idx}`}>
                        <Tooltip title="PFAS: Persistent 'Forever Chemical'">
                          <Chip
                            label={`${item.ingredient} (${Math.round(item.confidence * 100)}%)`}
                            color="error"
                            variant="filled"
                            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                </Grid>
              </>
            )}

            {toxicIngredients.some((item) => !item.is_pfas) && (
              <>
                <Typography variant="body2">
                  🟡 Other toxic ingredients detected:
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                  {toxicIngredients
                    .filter((item) => !item.is_pfas)
                    .map((item, idx) => (
                      <Grid item key={`toxic-${idx}`}>
                        <Tooltip title="Toxic: Known to cause harm">
                          <Chip
                            label={`${item.ingredient} (${Math.round(item.confidence * 100)}%)`}
                            color="warning"
                            variant="outlined"
                            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
          </>
        ) : (
          <Typography align="center">No toxic ingredients found.</Typography>
        )}

        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate("/scan")}>
            Scan Another
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Result;
