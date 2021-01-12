# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json

#приемник данных от паука
#все записываем пока в json файл
class BravebirdPipeline:
    
    #определяем, что при открытии паука, создаем файл вывода items.jl
    def open_spider(self, spider):
        self.file = open('items.jl', 'w')

     #определяем, что при закрытии паука, закрываем файл items.jl
    def close_spider(self, spider):
        self.file.close()

    #определяем, что при каждом получении строки из паука, записываем в открытый файл в формате json
    def process_item(self, item, spider):
        line = json.dumps(ItemAdapter(item).asdict()) + "\n"
        self.file.write(line)
        return item
