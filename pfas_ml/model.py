import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import pickle

# Load merged dataset (updated filename)
df = pd.read_csv("merged_ingredients_dataset.csv")  # 🔄 Use your new dataset file here

# Preprocess
df['ingredient'] = df['ingredient'].astype(str).str.lower().str.strip()  # make sure everything is a string
df = df.dropna(subset=['ingredient', 'toxic'])  # clean missing values

# Features and labels
X_raw = df['ingredient']
y = df['toxic']

# TF-IDF vectorizer with unigrams + bigrams
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(X_raw)

# Train/test split for evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print("📊 Classification Report:\n")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
with open("toxic_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ New model trained and saved with merged data.")

