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


df = pd.read_csv(r"C:\Users\Mammoth\Documents\datavisProject\CSVfiles\TestingAPIdata.csv")

foodName = df['foodName']
foodNameList = foodName.to_list()
Col_Protein = []
Col_Fat = []
Col_Carb = []
Col_Energy = []
counter = 0
failCounter = 0
apiCounter = 0
servingSize = ""

for food in foodNameList:
    try:
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
            if(len(jsonObject['foods']) < 1):
                print('Json object empty', apiCounter)
                apiCounter += 1
                Col_Protein.append('NULL')
                Col_Fat.append('NULL')
                Col_Carb.append('NULL')
                Col_Energy.append('NULL')
            for a in jsonObject['foods']:
                if "servingSize" in a is not False and "servingSizeUnit" in a is not False:
                    servingSize = str(a["servingSize"]) + str(a["servingSizeUnit"])
                else:
                    servingSize = "100g"
                print("Serving size: ", servingSize)
                print("API name: ", a['description'], " @@@@@ Our dataName: ", food)
                for x in a['foodNutrients']:
                    if x['nutrientName'] == "Protein":
                        if 'nutrientName' in x is False:
                            print("Could find protein")
                            Col_Protein.append(str("NaN"))
                        else:
                            print(x['nutrientName'], " = ", x['value'] )
                            Col_Protein.append(x['value'])
                    if x['nutrientName'] == "Total lipid (fat)":
                         if 'nutrientName' in x is False:
                             print('Could not find fat')
                             Col_Fat.append(str("NaN"))
                         else: 
                            print(x['nutrientName'], " = ", x['value'] )
                            Col_Fat.append(x['value'])
                    if x['nutrientName'] == "Carbohydrate, by difference":
                        if 'nutrientName' in x is False:
                            print("Could find Carb")
                            Col_Carb.append(str("NaN"))
                        else:
                            print(x['nutrientName'], " = ", x['value'] )
                            Col_Carb.append(x['value'])
                    if x['nutrientName'] == "Energy":
                        if 'nutrientName' in x is False:
                            print('Couldnt find KCAL')
                            Col_Energy.append(str("NaN"))
                        else:
                            if(x['unitName'] == 'KCAL'):
                                print(x['nutrientName'], " = ", x['value'],'KCAL', "per", servingSize)
                                Col_Energy.append(str(x['value'])+servingSize)
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

df['Protein'] = pd.Series(Col_Protein)
df['Fat'] = pd.Series(Col_Fat)
df['Carb'] = pd.Series(Col_Carb)
df['Calorie'] = pd.Series(Col_Energy)

print('Total amount of 500 returns: ', failCounter)
print('Total amount of empty json: ', apiCounter)

df.to_csv('newAppenededCSV.csv')
