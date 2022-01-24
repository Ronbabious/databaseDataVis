import pandas as pd
import missingno as msno

df = pd.read_csv(r"C:\Users\Mammoth\Documents\datavisProject\pythonScripts\newAppenededCSV.csv")
msno.matrix(df)