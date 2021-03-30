import pandas as pd
import csv
import json

data = []

with open('./APC_disconnection_lat_lon.csv') as csvFile:

    csv = csv.reader(csvFile)
    next(csv)
    # veh = set()
    for row in csv:
        obj = {}
        obj['calendarID'] = row[0]
        obj['vehicleNumber'] = row[1]
        obj['messageTime'] = row[2]

        lat = str(row[4])
        lon = str(row[3])
        lat = lat[:2] + '.' + lat[2:]
        lon = lon[:4] + '.' + lon[4:]

        obj['dropoffLat'] = lat
        obj['dropoffLon'] = lon
        data.append(obj)
    #     veh.add(row[1])
    
    # print(veh)

with open('./dataAPC.json', 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))