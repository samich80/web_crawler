const moment = require('moment');

const parseDate = (date) => moment(date, 'LLL', 'de');
class DataUtil {
    static prepareDataFromDb(list){
        return list.map(item => ({
            ...item,
            published_date: parseDate(item.published_date),
            updated_date: parseDate(item.updated_date),
            comments: parseInt((item.comments || '').split(' ')[0]),
            scantime: moment(item.scantime),
        }));
    }
}

module.exports = DataUtil;
