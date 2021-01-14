#import scrapy
#from scrapy.crawler import CrawlerProcess
#import sys
from pymongo import MongoClient
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from spiders.bravebird import BravebirdSpider

#bravebird
process = CrawlerProcess(get_project_settings())
process.crawl('bravebird')
process.start()

    def db_list():
        client = MongoClient()
        client = MongoClient('mongodb://localhost:27017')

        db = client['webCrawler']
        CrawlerData = db.CrawlerData

        for post in CrawlerData.find():
          print(post)