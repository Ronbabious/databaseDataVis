import requests
from requests import api
from requests.exceptions import RequestException

import pandas as pd
import os
import json
import urllib
import sys

#from requests.models import HTTPError
from rich import print

#lookupDATA = ""

class API_REQUEST_HEADER:
    api_key1 = 'IwgnpBVG5FqIgnQRHyxEzKs6eTGKleoJIBrfVSBr'
    api_key2 = 'Jaq2zxo68sFgJq1xoOWb5qF7a54GP9Xsi0QxmbOB'
    api_key3 = 'xIILUVavHZRAjNHaJ1QouBqaWjUTmIK3kb3shrIA'
    dataType = ["Survey (FNDDS)"]
    pagesize = 1


df = pd.read_csv(r'C:\Users\Mammoth\Documents\datavisProject\CSVfiles\APIchanged.csv')

#foodName = df['foodName']
#foodNameList = foodName.to_list()
Col_Protein = []
Col_Fat = []
Col_Carb = []
Col_Energy = []
counter = 0
failCounter = 0
apiCounter = 0

#for index, row in df.iterrows():
#    df.at[index,'Protein'] = 10


#text = input("Ready for input --> ")
#print(urllib.parse.quote(text))
#api_url = f'https://api.nal.usda.gov/fdc/v1/foods/search?query={urllib.parse.quote(text)}&pageSize=1&requireAllWords=True&numberOfResultsPerPage=1&api_key=0J0b7BrLYnyeD5ViIvDD3ZhGY8TtI9AMXnYaF73N'
#response = requests.get(api_url)
#jsonObject = response.json()
#print(jsonObject)

for index, row in df.iterrows():
        food = df.at[index,'foodName']
        api_url = f'https://api.nal.usda.gov/fdc/v1/foods/search?query={urllib.parse.quote(food)}&pageSize={API_REQUEST_HEADER.pagesize}&requireAllWords=True&numberOfResultsPerPage=1&api_key={API_REQUEST_HEADER.api_key1}'
        response = requests.get(api_url)
        print(response)
        if(counter == 990):
                API_REQUEST_HEADER.api_key1 = API_REQUEST_HEADER.api_key2
                print('Changed API from 1 to 2')
        if(counter == 1890):
                API_REQUEST_HEADER.api_key1 = API_REQUEST_HEADER.api_key3
                print('Changed API from 2 to 3')
        if(response.status_code == 200):
            jsonObject = response.json()
            foodElem = jsonObject["foods"]
            if 'servingSize' in foodElem is not False:
                print("Serving size: ", foodElem["servingSize"],foodElem["servingSizeUnit"])
            if(len(jsonObject['foods']) < 1):
                print('Json object empty', apiCounter)
                apiCounter += 1
                #Col_Protein.append('NULL')
                #Col_Fat.append('NULL')
                #Col_Carb.append('NULL')
                #Col_Energy.append('NULL')
            for a in jsonObject['foods']:
                if "servingSize" in a is not False and "servingSizeUnit" in a is not False:
                    servingSize = str(a["servingSize"]) + str(a["servingSizeUnit"])
                else:
                    servingSize = "100g"
                for x in a['foodNutrients']:
                    if x['nutrientName'] == "Protein":
                        if 'nutrientName' in x is False:
                            print("Could find protein")
                            df.at[index,'Protein'] = 'NaN'
                        else:
                            print(x['nutrientName'], " = ", x['value'] )
                            df.at[index,'Protein'] = x['value']
                    if x['nutrientName'] == "Total lipid (fat)":
                         if 'nutrientName' in x is False:
                             print('Could not find fat')
                             df.at[index,'Fat'] = 'NaN'
                         else: 
                            print(x['nutrientName'], " = ", x['value'] )
                            df.at[index,'Fat'] = x['value']
                    if x['nutrientName'] == "Carbohydrate, by difference":
                        if 'nutrientName' in x is False:
                            print("Could find Carb")
                            df.at[index,'Carb'] = 'NaN'
                        else:
                            print(x['nutrientName'], " = ", x['value'] )
                            df.at[index,'Carb'] = x['value']
                    if x['nutrientName'] == "Energy":
                        if 'nutrientName' in x is False:
                            print('Couldnt find KCAL')
                            df.at[index,'Calorie'] = 'NaN'
                        else:
                            if(x['unitName'] == 'KCAL'):
                                print(x['nutrientName'], " = ", x['value'],'KCAL', "per", servingSize)
                                df.at[index,'Carlorie'] = x['value']
                                df.at[index,'ServingSize'] = servingSize
            counter += 1
            print('API call number: ', counter)
        else:
            failCounter += 1
            #Col_Protein.append('NULL')
            #Col_Fat.append('NULL')
            #Col_Carb.append('NULL')
            #Col_Energy.append('NULL')
            print(response, "- Fail counter : ",failCounter)
            print('failed : ', failCounter)


#df['Protein'] = pd.Series(Col_Protein)
#df['Fat'] = pd.Series(Col_Fat)
#df['Carb'] = pd.Series(Col_Carb)
#df['Calorie'] = pd.Series(Col_Energy)

print('Total amount of 500 returns: ', failCounter)
print('Total amount of empty json: ', apiCounter)
df.to_csv('newTest.csv')

