# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

#описание получаемых данных от "паука"
class BravebirdItem(scrapy.item):
    title = scrapy.Field()  #поле темы
    date = scrapy.Field()   #поле даты
    time = scrapy.Field()   #поле времени
