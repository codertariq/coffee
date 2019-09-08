/* ------------------------------------------------------------------------------
 *
 *  # Date and time pickers
 *
 *  Demo JS code for picker_date.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DateTimePickers = function() {


    //
    // Setup module components
    //

    // Daterange picker
    var _componentDaterange = function() {
        if (!$().daterangepicker) {
            console.warn('Warning - daterangepicker.js is not loaded.');
            return;
        }


        //
        // Pre-defined ranges and callback
        //

        // Initialize with options
        $('.daterange-predefined').daterangepicker({
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                minDate: moment().local().subtract(2, 'years'),
                maxDate: moment().local(),
                dateLimit: {
                    days: 90
                },
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                drops: 'down',
                applyClass: 'btn-sm bg-slate',
                cancelClass: 'btn-sm btn-light'
            },
            function(start, end) {
                $('.daterange-predefined span').html(start.format('YYYY-MM-DD') + ' &nbsp; - &nbsp; ' + end.format('YYYY-MM-DD'));
                
                var from = start.format('YYYY-MM-DD');
                var to = end.format('YYYY-MM-DD');
                $('#ajaxloader').show();
                $.ajax({
                url: '/admin/get/cash_balance/analysis',
                type: 'POST',
                data: {
                    from: from,
                    to: to,
                },
                dataType: 'Html',
                success: function(data) {
                    //console.log(data);
                    $('#report').html(data);
                    $('#ajaxloader').hide();
                },
                error: function(data) {
                    console.log(data)
                }
            });
            }
        );

        // Display date format
        $('.daterange-predefined span').html(moment().subtract(29, 'days').format('DD-MM-YYYY') + ' &nbsp; - &nbsp; ' + moment().format('DD-MM-YYYY'));
    };



    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDaterange();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DateTimePickers.init();
});

