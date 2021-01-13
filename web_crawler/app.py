#import scrapy
#from scrapy.crawler import CrawlerProcess
from pymongo import MongoClient

client = MongoClient()
client = MongoClient('mongodb://localhost:27017')

db = client['webCrawler']
CrawlerData = db.CrawlerData

for post in CrawlerData.find():
  print(post)