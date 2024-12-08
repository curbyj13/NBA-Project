import pandas as pd
import json

def load_data(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except json.JSONDecodeError as e:
        print(f"Error loading JSON data: {e}")
        return None
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None

def process_data(data):
    try:
        df = pd.json_normalize(data)
        # Add data validation
        if df.empty:
            print("Warning: DataFrame is empty after processing")
            return None
        return df
    except Exception as e:
        print(f"Error processing data: {e}")
        return None

def save_data(df, file_path):
    try:
        df.to_csv(file_path, index=False)
        print(f"Cleaned data saved as: {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")

def main():
    # Use absolute or relative path consistently
    data_file_path = "data/api_data.json"
    output_file_path = "data/processed_data.csv"
    
    # Load data
    data = load_data(data_file_path)
    
    if data is not None:
        # Process data
        df_cleaned = process_data(data)
        
        if df_cleaned is not None:
            # Save processed data
            save_data(df_cleaned, output_file_path)
    else:
        print("Data loading failed. Please check the input file.")

if __name__ == "__main__":
    main()