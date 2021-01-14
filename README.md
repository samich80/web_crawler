# web_crawler
web parser

Require:
Python 3.7. or above
Scrapy

Installing Scrapy:
pip3 install scrapy

Installing MongoDB driver:
pip3 install pymongo

For windows:
mongod.exe --dbpath D:\python-proj\web_crawler\db

Execution:

scrapy crawl bravebird (or scrapy crawl bravebird --loglevel="ERROR" - for less output) in project root directory

TODO:
2. site URL for scraping to settings.py


TIPs.
1. Remove all collections in MongoDB:
from pymongo import MongoClient
client = MongoClient()
client = MongoClient('mongodb://localhost:27017')
db = client['webCrawler']
CrawlerData = db.CrawlerData
CrawlerData.delete_many({})