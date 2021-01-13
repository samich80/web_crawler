import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

#Создаем класс "паука" - механизм обохoда страниц сайта
class BravebirdSpider(CrawlSpider):
    #имя паука в проекте
    name = 'bravebird'               
    #разрешенный домен, для механизма обхода страниц сайта, чтобы не выйти за пределы сайта           
    allowed_domains = ["bravebird.de"]
    # Стартовый адрес сайта
    start_urls = ['https://www.bravebird.de']

    #правила обхода сайта, можно ходить по ссылкам содержащим /blog, остальные разделы сайта не трогаем
    #callback='parse' - указываем, какую функцию вызываем для каждой страницы
    #follow=True - ходить по ссылкам на странице, т.е. углубляться внутрь сайта. 
    rules = (
        Rule(LinkExtractor(allow=('/blog')), callback='parse', follow=True),
    )

    #функция извлечения данных
    def parse(self, response):
        #селектор для DOM дерева страницы сайта, по которому мы определяем положение нужных нам данных
        SET_SELECTOR = '//div[@class="entry-header entry-header-top"]' 
        for i in response.xpath(SET_SELECTOR):
            yield {
                'title': " ".join(i.xpath('./h1//text()').extract()),  #селектор для темы
                'published_date': i.xpath('./div[@class="entry-meta entry-meta-single"]/span[@class="post-info post-info-date"]/time[@class="entry-date published"]/text()').get(),   #селектор для даты
                'updated_date': i.xpath('./div[@class="entry-meta entry-meta-single"]/span[@class="post-info post-info-date"]/time[@class="updated"]/text()').get(),
                'comments': i.xpath('./div[@class="entry-meta entry-meta-single"]/span[@class="post-info post-info-comment"]/a/text()').get(),
                'post_location': i.xpath('./div[@class="entry-meta entry-meta-single"]/span[@class="post-info post-info-location"]/text()').getall(),
            }    