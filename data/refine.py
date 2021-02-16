import pandas as pd
import csv
import json

# Remove columns: Pick-up County (4), Pick-up state (7), Drop-off County (12), Drop-off State (15), Last 3 columns (19-21)
# Develop 3 different JSON files: Pick-up, Drop-off, Passenger info along with pick-ups and drop-offs
data = []

with open('./pickupdropoff.csv') as csvFile:

    csv = csv.reader(csvFile)
    next(csv)
    for row in csv:
        obj = {}
        obj['customerId'] = row[0]
        obj['tripStatus'] = row[1]
        obj['reqPickupTime'] = row[2]
        obj['pickupCity'] = row[3]
        obj['pickupLat'] = row[5]
        obj['pickupLon'] = row[6]
        obj['pickupAddress'] = row[9] + ' ' + row[8]
        obj['pickupZipcode'] = row[10]
        obj['dropoffCity'] = row[11]
        obj['dropoffLat'] = row[13]
        obj['dropoffLon'] = row[14]
        obj['dropoffAddress'] = row[17] + ' ' + row[16]
        obj['dropoffZipcode'] = row[18]
        data.append(obj)

with open('./data.json', 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
                
        
