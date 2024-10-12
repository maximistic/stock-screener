import requests
import pandas as pd
from io import StringIO

def get_nse_stocks():
    url = "https://archives.nseindia.com/content/equities/EQUITY_L.csv"
    try:
        response = requests.get(url)
        response.raise_for_status()
        df = pd.read_csv(StringIO(response.text))
        return df[['SYMBOL', 'NAME OF COMPANY']].rename(columns={
            'SYMBOL': 'Symbol',
            'NAME OF COMPANY': 'Company Name'
        })
    except requests.RequestException as e:
        print(f"Failed to fetch NSE data: {e}")
        return pd.DataFrame(columns=['Symbol', 'Company Name'])
    except pd.errors.EmptyDataError:
        print("The CSV file from NSE was empty or could not be read")
        return pd.DataFrame(columns=['Symbol', 'Company Name'])
    except KeyError as e:
        print(f"Expected columns not found in the CSV: {e}")
        return pd.DataFrame(columns=['Symbol', 'Company Name'])

def main():
    nse_stocks = get_nse_stocks()
    
    if not nse_stocks.empty:
        nse_stocks.to_csv('nse_only_archives.csv', index=False)
        print(f"Saved {len(nse_stocks)} NSE stocks to 'nse_only_archives.csv'")
    else:
        print("No NSE stock data was retrieved. Please check your internet connection and try again.")

if __name__ == "__main__":
    main()