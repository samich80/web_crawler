import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor


class BravebirdSpider(CrawlSpider):
    name = 'bravebird'
    allowed_domains = ["bravebird.de"]
    start_urls = ['https://www.bravebird.de']

    rules = (
        Rule(LinkExtractor(allow=('/blog')), callback='parse', follow=True),
    )

    def parse(self, response):
        SET_SELECTOR = '//div[@class="entry-header entry-header-top"]'
        for i in response.xpath(SET_SELECTOR):
            yield {
                'title': " ".join(i.xpath('./h1//text()').extract()),
                'date': i.xpath('./div/span/time/text()').extract()[0],
                'time': i.xpath('./div/span/time/text()').extract()[1],
            }    