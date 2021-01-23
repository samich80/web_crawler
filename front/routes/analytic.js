const DataUtil = require("../utils/dataUtil");
const AnalyticUtil = require("../utils/analyticUtil");

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const db = require('../config/db');

MongoClient.connect(db.url, {}, (err, database) => {
    const dbo = database.db(db.database);
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('analytic', {title: 'Analytic'});
    });

    router.get('/articles/count', function (req, res, next) {
        dbo.collection('CrawlerData').find({}).toArray((err, result) => {
            const data = DataUtil.prepareDataFromDb(result);
            const countByDate = AnalyticUtil.getArticleCountByDate(data);
            const countByMonth = AnalyticUtil.getArticleCountByMonth(data);
            const countByYear = AnalyticUtil.getArticleCountByYear(data);
            res.send({
                countByDate,
                countByMonth,
                countByYear,
            });
        })
    });
})
module.exports = router;
