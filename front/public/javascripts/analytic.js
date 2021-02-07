const initChart = ({container, title, yAxis, data}) => Highcharts.chart(container, {
    title: {
        text: title || 'Count By date'
    },
    yAxis: {
        title: {
            text: yAxis || 'Count',
        },
        min: Math.min.apply(null, data.map(i => i.count)),
        max: Math.max.apply(null, data.map(i => i.count))
    },
    xAxis: {
        categories: (data || []).map(i => i.date)
    },
    series: [{name: 'Count', data: (data || []).map(i => i.count)}],
});

const initBarChart = ({container, title, yAxis, data}) => Highcharts.chart(container, {
    chart: {        type: 'bar'    },

    xAxis: {
        categories: data.map(i => i.title),
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Words',
        data: data.map(i=>i.wordsCount)
    }, {
        name: 'Comments',
        data: data.map(i=>i.comments)
    }]
});

const initBarChartByComments = ({container, title, yAxis, data}) => Highcharts.chart(container, {
    chart: {type: 'bar'},

    xAxis: {
        categories: data.map(i => i.title),
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Comments',
        data: data.map(i => i.comments)
    }]
});


const articleCountsInit = () => {
    $.get('/analytic/articles', response => {
        initChart({container: 'countByDateChart', data: response.countByDate});
        initChart({container: 'countByMonthChart', data: response.countByMonth});
        initChart({container: 'countByYearChart', data: response.countByYear});
        initChart({container: 'countByQuarterChart', data: response.countByQuarter});
        initBarChartByComments({container: 'topByCommentsChart', data: response.topArticlesByComments});
        initBarChart({container: 'topByCommentsByWordsChart', data: response.topArticlesByCommentsByWords});
    })
}

const commentsCountInit = () => {
    $.get('/analytic/comments', response => {
        initChart({container: 'comments-countByDateChart', data: response.countByDate});
        initChart({container: 'comments-countByMonthChart', data: response.countByMonth});
        initChart({container: 'comments-countByYearChart', data: response.countByYear});
        initChart({container: 'comments-countByQuarterChart', data: response.countByQuarter});
    })
}

$(document).ready(() => {
    articleCountsInit();
    commentsCountInit();
})