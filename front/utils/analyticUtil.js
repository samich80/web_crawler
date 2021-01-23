const moment = require('moment');

const groupByDateFormat = (list, dateFormat) => {
    const result = {};
    let publishDate;
    list
        .filter(item => item.published_date && moment(item.published_date).isValid())
        .sort((a, b) => a.published_date < b.published_date ? -1 : (a.published_date > b.published_date ? 1 : 0))
        .forEach(item => {
        publishDate = item.published_date.format(dateFormat);
        if (!result[publishDate]) {
            result[publishDate] = {
                date: publishDate,
                count: 0,
            }
        }
        result[publishDate].count += 1;
    })
    return Object.values(result);
}

class AnalyticUtil {
    static getArticleCountByDate(list) {
        return groupByDateFormat(list, 'YYYY-MM-DD');
    }

    static getArticleCountByMonth(list) {
        return groupByDateFormat(list, 'YYYY-MM');
    }

    static getArticleCountByYear(list) {
        return groupByDateFormat(list, 'YYYY');
    }
}

module.exports = AnalyticUtil;