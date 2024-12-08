import pandas as pd
import json

def load_data(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except json.JSONDecodeError as e:
        print("Error loading JSON data: {}".format(e))
        return None
    except FileNotFoundError:
        print("File not found: {}".format(file_path))
        return None

def process_data(data):
    try:
        # Separate processing for different data types
        schedule_df = pd.json_normalize(data['schedule'])
        standings_df = pd.json_normalize(data['standings'])
        results_df = pd.json_normalize(data['results'])
        
        # Add data validation
        for df in [schedule_df, standings_df, results_df]:
            if df.empty:
                print("Warning: One or more DataFrames are empty")
                return None
        
        return {
            'schedule': schedule_df,
            'standings': standings_df,
            'results': results_df
        }
    except Exception as e:
        print("Error processing data: {}".format(e))
        return None

def save_data(dfs, base_path):
    try:
        for name, df in dfs.items():
            output_path = "{}/{}_data.csv".format(base_path, name)
            df.to_csv(output_path, index=False)
            print("Saved {} data to: {}".format(name, output_path))
    except Exception as e:
        print("Error saving data: {}".format(e))

def main():
    data_file_path = "data/api_data.json"
    output_base_path = "data"
    
    data = load_data(data_file_path)
    if data is not None:
        dfs = process_data(data)
        if dfs is not None:
            save_data(dfs, output_base_path)
    else:
        print("Data loading failed. Please check the input file.")

if __name__ == "__main__":
    main()