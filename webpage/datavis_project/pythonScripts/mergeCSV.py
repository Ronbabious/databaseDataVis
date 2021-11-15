import pandas as pd
import os

all_csv = [file_name for file_name in os.listdir(os.getcwd()) if '.csv' in file_name]
li = []
#Mac path
df = pd.read_csv(r"/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/webpage/datavis_project/CSV_files/cleanedCSV.csv")
#Windows path
#df = pd.read_csv(r"C:\Users\Mammoth\Documents\DataVis_Project\webpage\datavis_project\CSV_files\cleanedCSV.csv")

#Drop all randomly generated Columns
#df.drop(columns=['Unnamed: 0','Unnamed: 0.1','Unnamed: 0.1.1','Unnamed: 0.1.1','Unnamed: 0.1.1.1','Unnamed: 0.1.1.1.1'],axis=1,inplace=True)
#df.to_csv('test.csv')

#Used to add @ symbol every every foodName, easier cleaning after.
# df['foodName'] = df['foodName'].astype(str) + '@'
# df.to_csv("csvToBe.csv")

#Used to remove split foodName rows at the @ location and remove everything behind it along with @
# df['CarbPlusFat'] = df['CarbPlusFat'].str.split(',').str[0]
# df['F6'] = df['F6'].str.split(',').str[0]
# df['InsulinIndex'] = df['InsulinIndex'].str.split(',').str[0]
# df['InsulinogenicV2'] = df['InsulinogenicV2'].str.split(',').str[0]
# df['ND'] = df['ND'].str.split(',').str[0]
# df['NutrivoreScore'] = df['NutrivoreScore'].str.split(',').str[0]
# df['ONIscore'] = df['ONIscore'].str.split(',').str[0]
# df['Satiety'] = df['Satiety'].str.split(',').str[0]
# df['SatietyIndex'] = df['SatietyIndex'].str.split(',').str[0]
# df['cost'] = df['cost'].str.split(',').str[0]
# df['group'] = df['group'].str.split(',').str[0]
# df['popular'] = df['popular'].str.split(',').str[0]

df = df.head(40)
df.to_csv('test1CSV.csv')


# #Changing all the different names of foodNames to a consistent name.
# #df = pd.read_csv(filename, index_col=None, header= 0, parse_dates=True, infer_datetime_format=True)
# for col in df.columns:
#         # if(col == 'name'):
#         #     df.rename(columns={'name':'foodName'}, inplace=True)
#         #     df = df.iloc[:,1:]
#         #     df.to_csv(filename)
#         # if(col == 'Name'):
#         #     df.rename(columns={'Name':'foodName'}, inplace=True)
#         #     df.to_csv(filename)
#         # if(col == 'Food'):
#         #     df.rename(columns={'Food':'foodName'}, inplace=True)
#         #     df.to_csv(filename)
#         # if(col == 'Food 1'):
#         #     df.rename(columns={'Food 1':'foodName'}, inplace=True)
#         #     df.to_csv(filename)
#         # if(col == 'group'):
#         #     df.rename(columns={'group':'foodGroup'}, inplace=True)
#         # if(col == 'Group'):
#         #     df.rename(columns={'Group':'foodGroup'}, inplace=True)
#         if(col == 'Carb + Fat'):
#             df.rename(columns={'Carb + Fat' : 'CarbPlusFat'}, inplace=True)
#         if(col == 'ONI score'):
#             df.rename(columns={'ONI score' : 'ONIscore'}, inplace=True)
#         if(col == 'Satiety Index'):
#             df.rename(columns={'Satiety Index' : 'SatietyIndex'}, inplace=True)
#         if(col == 'Insulin Index'):
#             df.rename(columns={'Insulin Index' : 'InsulinIndex'}, inplace=True)
#         if(col == '% insulinogenic V2'):
#             df.rename(columns={'% insulinogenic V2' : 'InsulinogenicV2'}, inplace=True)
#         if(col == 'Nutrivore Score'):
#             df.rename(columns={'Nutrivore Score' : 'NutrivoreScore'}, inplace=True)
# df.to_csv('combinedFINAL.csv', index=False)
#Combining all the files into one CSV. 
#frame = pd.concat(li, axis=0, ignore_index=True)
#frame.to_csv('meltedFinal_csv.csv', index=False)
# df = pd.read_csv(r"/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/CSVfiles/melted_csv.csv")
# df.groupby('foodName')
# df.sort_values(by='foodName', ascending=True, inplace=True, ignore_index=True)
# df.to_csv('sortedCombined1.csv')
