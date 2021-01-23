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

const articleCountsInit = () => {
    $.get('/analytic/articles/count', response => {
        console.error(response);
        console.error({container: 'countByDateChart', data: response.countByDate});
        initChart({container: 'countByDateChart', data: response.countByDate});
        initChart({container: 'countByMonthChart', data: response.countByMonth});
        initChart({container: 'countByYearChart', data: response.countByYear});
    })
}

$(document).ready(() => {
    articleCountsInit();
})