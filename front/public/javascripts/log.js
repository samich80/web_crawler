$(document).ready(() => {
    $('#logTable').DataTable( {
        ajax: '/log/list',
        "order": [[ 1, "desc" ]],
        "columns": [
            { "data": "_id" },
            { "data": "run" }
        ]
    } );
})