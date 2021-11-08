import pandas as pd

df = pd.read_csv(r'/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/fromJSONtoCSV.csv')
df = df.drop(['Unnamed: 0','Unnamed: 0.1', 'Unnamed: 0.1.1'], axis=1)
df.to_csv('columnsRemoved.csv')