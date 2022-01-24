import pandas as pd
import numpy as np
df = pd.read_json(r'C:\Users\Mammoth\Documents\datavisProject\data\newData.json')

#df['ONIscore'] = df['ONIscore'].round(2).astype(float)

for index,row in df.iterrows():
    if df.at[index,'cost'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'cost'] = round(df.at[index,'cost'], 2)

    if df.at[index,'CarbPlusFat'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'CarbPlusFat'] = round(df.at[index,'CarbPlusFat'], 2)       

    if df.at[index,'ONIscore'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'ONIscore'] = round(df.at[index,'ONIscore'], 2)

    if df.at[index,'SatietyIndex'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'SatietyIndex'] = round(df.at[index,'SatietyIndex'], 2)

    if df.at[index,'InsulinIndex'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'InsulinIndex'] = round(df.at[index,'InsulinIndex'], 2)

    if df.at[index,'ND'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'ND'] = round(df.at[index,'ND'], 2)

    if df.at[index,'NutrivoreScore'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'NutrivoreScore'] = round(df.at[index,'NutrivoreScore'], 2)

    if df.at[index,'Satiety'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'Satiety'] = round(df.at[index,'Satiety'], 2) 

    if df.at[index,'InsulinogenicV2'] == '':
        print("nothing")
    else:
        print("changed to round")
        df.at[index,'InsulinogenicV2'] = round(df.at[index,'InsulinogenicV2'], 2)
print(df)
df.to_csv('roundedNumbers.csv')