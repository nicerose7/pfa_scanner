import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Scan = () => {
  const [ingredients, setIngredients] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", {
        ingredients,
      });
      setResults(res.data.results); // Store results for chip rendering
      navigate("/result", { state: { results: res.data.results } });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  // Get chip color and label
  const getChipProps = (item) => {
    if (item.toxic && item.is_pfas) {
      return { color: "error", variant: "filled", label: `${item.ingredient} (PFAS)` };
    } else if (item.toxic) {
      return { color: "warning", variant: "outlined", label: item.ingredient };
    } else {
      return { color: "success", variant: "outlined", label: item.ingredient };
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#f0f7ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Paste Ingredients
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Paste ingredients below. Each will be classified individually.
        </Typography>

        <TextField
          label="Ingredients"
          placeholder="Polyethylene, Perfluorooctanoic acid..."
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button variant="contained" fullWidth onClick={handleAnalyze}>
          Analyze Text
        </Button>

        {/* Ingredient Breakdown + Highlighting */}
        {results.length > 0 && (
          <>
            <Divider sx={{ my: 3 }}>Ingredient Breakdown</Divider>
            <Grid container spacing={1}>
              {results.map((item, index) => (
                <Grid item key={index}>
                  <Chip {...getChipProps(item)} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Scan;
