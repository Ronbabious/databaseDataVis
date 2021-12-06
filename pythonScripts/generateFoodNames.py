import csv, json

csvFilePath = '../data/data.csv'
jsonFilePath = 'foodNames.json'

data = {}

with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        key = rows['foodName']
        
with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))