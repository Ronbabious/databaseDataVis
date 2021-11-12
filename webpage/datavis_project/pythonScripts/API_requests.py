import requests
from requests import api
import pandas as pd
import os
import json
import urllib
from rich import print

lookupDATA = ""

class API_REQUEST_HEADER:
    api_key = 'njjHWcSbPgo2Gnuf8mXE0sXIkFLa5QtcqMYI48fN'
    dataType = ["Survey (FNDDS)"]
    pagesize =5

df = pd.read_csv(r"/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/webpage/datavis_project/CSV_files/testCSV.csv")

foodName = df['foodName']
foodNameList = foodName.to_list()
Col_Protein = []

for food in foodNameList:
    api_url = f'https://api.nal.usda.gov/fdc/v1/foods/search?query={urllib.parse.quote(food)}&pagesize={API_REQUEST_HEADER.pagesize}&api_key={API_REQUEST_HEADER.api_key}'
    response = requests.get(api_url)
    jsonObject = response.json()
    foodElem = next(iter(jsonObject["foods"]))
    print('FoodLookUp On:', foodElem['description'])
    if 'servingSize' in foodElem is not False:
       print("Serving size: ", foodElem["servingSize"],foodElem["servingSizeUnit"])
    for x in foodElem['foodNutrients']:
        if x['nutrientName'] == "Protein":
            print(x['nutrientName'], " = ", x['value'] )
            df['Protein'] = Col_Protein
        if x['nutrientName'] == "Total lipid (fat)":
            print(x['nutrientName'], " = ", x['value'] )
        if x['nutrientName'] == "Carbohydrate, by difference":
            print(x['nutrientName'], " = ", x['value'] )
        if x['nutrientName'] == "Energy":
            print(x['nutrientName'], " = ", x['value'],'KCAL' )

df.to_csv('newCSV.csv')

        
