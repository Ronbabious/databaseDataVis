import requests
from requests import api
from requests.exceptions import RequestException

import pandas as pd
import os
import json
import urllib

from requests.models import HTTPError
from rich import print

lookupDATA = ""

class API_REQUEST_HEADER:
    api_key1 = '0J0b7BrLYnyeD5ViIvDD3ZhGY8TtI9AMXnYaF73N'
    api_key2 = 'sESFEIb0GYvBEtbHeOoL9bwX16GLvfq8Wex20miB'
    api_key3 = 'WQCUYDMHcsS1eejpggfc7Dby5UeKNEK38cmnM5Ge'
    dataType = ["Survey (FNDDS)"]
    pagesize = 1


df = pd.read_csv(r"/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/webpage/datavis_project/CSV_files/cleanedCSV.csv")

foodName = df['foodName']
foodNameList = foodName.to_list()
Col_Protein = []
Col_Fat = []
Col_Carb = []
Col_Energy = []
counter = 0
failCounter = 0
apiCounter = 0

for food in foodNameList:
    try:
        api_url = f'https://api.nal.usda.gov/fdc/v1/foods/search?query={urllib.parse.quote(food)}&pageSize={API_REQUEST_HEADER.pagesize}&requireAllWords=True&numberOfResultsPerPage=1&api_key={API_REQUEST_HEADER.api_key1}'
        response = requests.get(api_url)
        if(counter == 990):
                API_REQUEST_HEADER.api_key1 = API_REQUEST_HEADER.api_key2
                print('Changed API from 1 to 2')
        if(counter == 1890):
                API_REQUEST_HEADER.api_key1 = API_REQUEST_HEADER.api_key3
                print('Changed API from 2 to 3')
        if(response.status_code == 200):
            jsonObject = response.json()
            #print(jsonObject)
            foodElem = jsonObject["foods"]
            #print('lookUp on :',foodElem)
            print(len(jsonObject["foods"]))
            #print('FoodLookUp On:', foodElem['description'])
            if 'servingSize' in foodElem is not False:
                print("Serving size: ", foodElem["servingSize"],foodElem["servingSizeUnit"])
            if(len(jsonObject['foods']) < 1):
                Col_Protein.append('NULL')
                Col_Fat.append('NULL')
                Col_Carb.append('NULL')
                Col_Energy.append('NULL')
            for a in jsonObject['foods']:
                for x in a['foodNutrients']:
                    if x['nutrientName'] == "Protein":
                        #print(x['nutrientName'], " = ", x['value'] )
                        Col_Protein.append(x['value'])
                    if x['nutrientName'] == "Total lipid (fat)":
                        #print(x['nutrientName'], " = ", x['value'] )
                        Col_Fat.append(x['value'])
                    if x['nutrientName'] == "Carbohydrate, by difference":
                        #print(x['nutrientName'], " = ", x['value'] )
                        Col_Carb.append(x['value'])
                    if x['nutrientName'] == "Energy":
                        if(x['unitName'] == 'KCAL'):
                            #print(x['nutrientName'], " = ", x['value'],'KCAL' )
                            Col_Energy.append(x['value'])
            counter += 1
            print('API call number: ', counter)
        else:
            failCounter += 1
            Col_Protein.append('NULL')
            Col_Fat.append('NULL')
            Col_Carb.append('NULL')
            Col_Energy.append('NULL')
            print(response, "- Fail counter : ",failCounter)
            print('failed : ', failCounter)
    except RequestException as error:
        print('Err was : ', error)
df['Protein'] = Col_Protein
df['Fat'] = Col_Fat
df['Carb'] = Col_Carb
df['Calorie'] = Col_Energy
df.to_csv('newAppenededCSV.csv')
