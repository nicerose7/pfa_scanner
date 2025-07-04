import pandas as pd

# Load original
df = pd.read_csv("pfas_labeled_data.csv")

# Add more non-toxic ingredients
extra_safe_ingredients = [
    "niacinamide", "zinc oxide", "rosehip oil", "argan oil", "cetearyl alcohol",
    "xanthan gum", "sorbitol", "citric acid", "sodium citrate", "sodium benzoate",
    "tocopherol", "lactic acid", "hyaluronic acid", "calendula extract",
    "bisabolol", "squalane", "squalene", "lecithin", "betaine", "glucose",
    "beta-glucan", "caprylic/capric triglyceride", "potassium sorbate",
    "ethylhexylglycerin", "magnesium sulfate", "panthenol", "aloe vera", "jojoba oil",
    "vitamin e", "coconut oil", "sunflower oil", "avocado oil", "olive oil",
    "castor oil", "carrot seed oil", "green tea extract", "chamomile extract",
    "water", "glycerin", "propylene glycol"
]

# Create DataFrame
new_df = pd.DataFrame({"ingredient": extra_safe_ingredients, "toxic": 0})

# Combine and drop duplicates
combined_df = pd.concat([df, new_df]).drop_duplicates(subset=["ingredient"])

# Save back
combined_df.to_csv("pfas_labeled_data.csv", index=False)

print(f"✅ Added {len(new_df)} non-toxic ingredients.")
