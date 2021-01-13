# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

#описание получаемых данных от "паука"
class BravebirdItem(scrapy.item):
    title = scrapy.Field()  #поле темы
    published_date = scrapy.Field()   #поле даты
    updated_date = scrapy.Field()
    comments = scrapy.Field()
    post_location = scrapy.Field()
    
