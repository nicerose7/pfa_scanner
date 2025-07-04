from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
with open("toxic_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Known PFAS list (same as frontend)
known_pfas = set([
    "pfba", "pfpea", "pfhxs", "pfos", "7:3 ftca", "nmefhpsaa", "nmefosaa",
    "nmefhxsaa", "n-etfose", "pfhxa", "pfo4da", "tfa", "pfpra", "pfhpa", "pfna",
    "pfda", "pfuna", "pfdoa", "pfta", "genx", "adona", "fts 6:2", "fts 8:2",
    "perfluoroheptanoic acid", "perfluorodecanoic acid", "pfoa", "c8", "ptfe",
    "teflon", "fluoropolymer", "fluorinated acrylate polymer"
])

@app.route("/api/classify", methods=["POST"])
def classify():
    try:
        data = request.get_json()
        ingredients = data.get("ingredients", "")

        if not ingredients:
            return jsonify({"error": "No input provided"}), 400

        # Tokenize
        tokens = [i.strip().lower() for i in ingredients.split(",") if i.strip()]
        if not tokens:
            return jsonify({"error": "No valid ingredients provided"}), 400

        # Predict
        X_input = vectorizer.transform(tokens)
        probs = model.predict_proba(X_input)

        results = []
        for ing, prob in zip(tokens, probs):
            confidence = float(prob[1])
            is_pfas = ing in known_pfas
            is_toxic = confidence >= 0.5 or is_pfas  # ← Force toxic=True for PFAS
            results.append({
                "ingredient": ing,
                "confidence": round(confidence, 3),
                "toxic": is_toxic,
                "is_pfas": is_pfas
            })

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
