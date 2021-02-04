from pymongo import MongoClient
import pandas as pd

client = MongoClient()
client = MongoClient('mongodb://localhost:27017')

db = client['webCrawler']
LogData = db.log

db_data = [item for item in db.log.find()]
data =  pd.DataFrame(db_data)
print(data)