import pandas as pd

# Load existing PFAS-labeled data
pfas_df = pd.read_csv("pfas_labeled_data.csv")

# Load harmful chemicals from CDPH
cdph_df = pd.read_csv("harmful_chemicals_from_cdph.csv")

# Combine datasets
combined_df = pd.concat([pfas_df, cdph_df], ignore_index=True)

# Drop duplicates — keep the more toxic (1) label if duplicates exist
combined_df = combined_df.groupby("ingredient", as_index=False)["toxic"].max()

# Optional: sort for clarity
combined_df = combined_df.sort_values("ingredient").reset_index(drop=True)

# Save merged dataset
combined_df.to_csv("merged_ingredients_dataset.csv", index=False)
print("✅ Merged dataset saved as 'merged_ingredients_dataset.csv'")
