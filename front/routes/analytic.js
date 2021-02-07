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

    router.get('/articles', function (req, res, next) {
        dbo.collection('CrawlerData').find({}).toArray((err, result) => {
            const data = DataUtil.prepareDataFromDb(result);
            const countByDate = AnalyticUtil.getArticleCountByDate(data);
            const countByMonth = AnalyticUtil.getArticleCountByMonth(data);
            const countByYear = AnalyticUtil.getArticleCountByYear(data);
            const countByQuarter = AnalyticUtil.getArticleCountByQuarter(data);
            const topArticlesByCommentsByWords = AnalyticUtil.getTopArticlesByCommentsByWordsCount(data);
            const topArticlesByComments = AnalyticUtil.getTopArticlesByComments(data);
            res.send({
                countByDate,
                countByMonth,
                countByYear,
                countByQuarter,
                topArticlesByCommentsByWords,
                topArticlesByComments,
            });
        })
    });

    router.get('/comments', function (req, res, next) {
        dbo.collection('CrawlerData').find({}).toArray((err, result) => {
            const data = DataUtil.prepareDataFromDb(result);
            const countByDate = AnalyticUtil.getCommentsCountByDate(data);
            const countByMonth = AnalyticUtil.getCommentsCountByMonth(data);
            const countByYear = AnalyticUtil.getCommentsCountByYear(data);
            const countByQuarter = AnalyticUtil.getCommentsCountByQuarter(data);

            res.send({
                countByDate,
                countByMonth,
                countByYear,
                countByQuarter,
            });
        })
    });
})
module.exports = router;
