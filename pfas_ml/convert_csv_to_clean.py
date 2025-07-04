import pandas as pd

# Load the CSV file you downloaded (update filename if needed)
df = pd.read_csv("cscpopendata.csv")  # or whatever your actual filename is

# Check if 'ChemicalName' column exists
if "ChemicalName" not in df.columns:
    print("❌ 'ChemicalName' column not found. Please check column names:")
    print(df.columns)
    exit()

# Extract unique, cleaned chemical names
chemicals = df["ChemicalName"].dropna().str.lower().str.strip().unique()

# Create clean DataFrame
clean_df = pd.DataFrame({
    "ingredient": chemicals,
    "toxic": 1
})

# Save to new CSV
clean_df.to_csv("harmful_chemicals_from_cdph.csv", index=False)
print("✅ Cleaned and saved to 'harmful_chemicals_from_cdph.csv'")

