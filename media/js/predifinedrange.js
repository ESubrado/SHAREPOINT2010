$(function() {

    var start = moment().subtract(1, 'year').add(1, 'day');
    var end = moment();

    function cb(start, end) {
        $('#dateRangePicker span').html(start.format('DD MMM YYYY') + ' - ' + end.format('DD MMM YYYY'));
    }

    $('#dateRangePicker').daterangepicker({
        startDate: start,
        endDate: end,
        minDate: '01/01/2005',
        locale: {
            format: 'DD MMM YYYY'
        },
        ranges: {
           //'Today': [moment(), moment()],
           //'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           //'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'Current Month': [moment().startOf('month'), moment().endOf('month')],
           'Previous Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
           'Year to Date': [moment().subtract(1, 'year').add(1, 'day'), moment()],
           'Previous Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
        },
    }, cb);

    cb(start, end);
    
});