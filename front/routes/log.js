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
        res.render('log', {title: 'Log'});
    });

    router.get('/list', function (req, res, next) {
        dbo.collection('log').find({}).toArray((err, data) => {
            res.send({
                data,
            });
        })
    });


})
module.exports = router;
