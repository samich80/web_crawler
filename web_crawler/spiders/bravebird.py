import scrapy


class BravebirdSpider(scrapy.Spider):
    name = 'bravebird'
    allowed_domains = ['bravebird.de']
    start_urls = ['https://www.bravebird.de/']

    def parse(self, response):
        test_filter = response.xpath('//div[@class="contentbox-content"]/h2/a/text()').extract()
        for items in zip(test_filter):
            print(items[0])
