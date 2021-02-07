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

const sumAggByDateFormat = (list, dateFormat, field) => {
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
            result[publishDate].count += item[field];
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

    static getArticleCountByQuarter(list) {
        return groupByDateFormat(list, 'Q');
    }

    static getCommentsCountByDate(list) {
        return sumAggByDateFormat(list, 'YYYY-MM-DD', 'comments');
    }

    static getCommentsCountByMonth(list) {
        return sumAggByDateFormat(list, 'YYYY-MM', 'comments');
    }

    static getCommentsCountByQuarter(list) {
        return sumAggByDateFormat(list, 'Q', 'comments');
    }

    static getCommentsCountByYear(list) {
        return sumAggByDateFormat(list, 'YYYY', 'comments');
    }

    static getTopArticlesByComments(list) {
        return list
            .sort((a, b) => a.comments < b.comments ? 1 : (a.comments > b.comments ? -1 : 0))
            .slice(0, 10)
            .map(i => ({title: i.title, wordsCount: i.words_count, comments: i.comments}))
    }

    static getTopArticlesByCommentsByWordsCount(list) {
        return list
            .filter(i => i.words_count > 0)
            .sort((a, b) => (a.comments / a.words_count) < (b.comments / b.words_count) ? 1 : ((a.comments / a.words_count) > (b.comments / b.words_count) ? -1 : 0))
            .slice(0, 10)
            .map(i => ({title: i.title, wordsCount: i.words_count, comments: i.comments}))
    }
}

module.exports = AnalyticUtil;