import pandas as pd
import os

all_csv = [file_name for file_name in os.listdir(os.getcwd()) if '.csv' in file_name]
li = []

#Changing all the different names of foodNames to a consistent name.
""" for filename in all_csv:
    df = pd.read_csv(filename, index_col=None, header= 0, parse_dates=True, infer_datetime_format=True)
    for col in df.columns:
        if(col == 'name'):
            df.rename(columns={'name':'foodName'}, inplace=True)
            df = df.iloc[:,1:]
            df.to_csv(filename)
        if(col == 'Name'):
            df.rename(columns={'Name':'foodName'}, inplace=True)
            df.to_csv(filename)
        if(col == 'Food'):
            df.rename(columns={'Food':'foodName'}, inplace=True)
            df.to_csv(filename)
        if(col == 'Food 1'):
            df.rename(columns={'Food 1':'foodName'}, inplace=True)
            df.to_csv(filename)
 """
#Combining all the files into one CSV. 
""" for filename in all_csv:
    df = pd.read_csv(filename, index_col=None, header=0, parse_dates=True, infer_datetime_format=True)
    li.append(df)

frame = pd.concat(li, axis=0, ignore_index=True)
frame.to_csv('melted_csv.csv', index=False) """