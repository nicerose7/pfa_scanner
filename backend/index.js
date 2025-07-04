const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const knownPFAS = new Set([
  "pfba", "pfpea", "pfhxs", "pfos", "7:3 ftca", "nmefhpsaa", "nmefosaa",
  "nmefhxsaa", "n-etfose", "pfhxa", "pfo4da", "tfa", "pfpra", "pfhpa", "pfna",
  "pfda", "pfuna", "pfdoa", "pfta", "genx", "adona", "fts 6:2", "fts 8:2",
  "perfluoroheptanoic acid", "perfluorodecanoic acid", "pfoa", "c8", "ptfe",
  "teflon", "fluoropolymer", "fluorinated acrylate polymer"
]);

function extractIngredients(text) {
  const cleaned = text
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[^a-z0-9,\- ()\/+]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const chunks = cleaned.split(/,| and | with |\/|\+|;/g).map(s => s.trim());
  return chunks.filter(s => s.length > 2);
}

app.post("/api/analyze", async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients) return res.status(400).json({ error: "No ingredients provided" });

  try {
    const parsed = extractIngredients(ingredients);

    const response = await axios.post("http://localhost:5001/api/classify", {
      ingredients: parsed.join(","),
    });

    const results = response.data;

    // Ensure PFAS is marked (redundant if Flask already does this, but safe)
    const finalResults = results.map(r => ({
      ...r,
      is_pfas: knownPFAS.has(r.ingredient.toLowerCase())
    }));

    const isDangerous = finalResults.some(r => r.toxic || r.is_pfas); 
    const hasPFAS = finalResults.some(r => r.is_pfas);

    res.json({
      results: finalResults,
      isDangerous,
      hasPFAS,
      message: isDangerous
        ? "⚠️ Toxic or PFAS ingredients detected."
        : "✅ No toxic or PFAS ingredients found.",
    });
  } catch (err) {
    console.error("Text classification failed:", err.message);
    res.status(500).json({ error: "ML classification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
