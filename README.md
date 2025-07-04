Frontend :	React, Material-UI (MUI), Axios
Backend : API	Node.js, Express.js
ML Model :  API	Python, Flask, scikit-learn, pickle


Model: Logistic Regression (scikit-learn)

Vectorizer: TF-IDF (unigram + bigram)

Training Data: Merged dataset of cosmetic ingredients with toxicity labels (PFAS and non-toxic entries)

Metrics:

Precision: 0.73

Recall: 0.71

F1-Score: 0.68

PFAS ingredients are detected using a curated list and flagged separately even if the ML model doesn’t classify them as toxic.

Installation:

Backend (Flask ML Server):
cd ml-backend
pip install -r requirements.txt
python model.py     # Train model
python app.py       # Start Flask server at localhost:5001

Node.js API Server :
cd node-backend
npm install
node index.js       # Starts Express server at localhost:5000

Frontend :
cd frontend
npm install
npm run dev         # Vite dev server at localhost:5173

 Future Improvements :
 Integrate BioBERT or SciBERT for more robust ingredient embeddings
 Add an ingredient education panel with sources (INCI, PubChem)
 Save scan history to localStorage or MongoDB
 Deploy via Docker, Render, or Vercel
