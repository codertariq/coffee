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
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                drops: 'down',
                applyClass: 'btn-sm bg-slate',
                cancelClass: 'btn-sm btn-light'
            },
            function(start, end) {
                $('.daterange-predefined span').html(start.format('YYYY-MM-DD') + ' &nbsp; - &nbsp; ' + end.format('YYYY-MM-DD'));
                    $('#from').val(start.format('YYYY-MM-DD'));
                    $('#to').val(end.format('YYYY-MM-DD'));
                    //_componentAjaxReport();
            }
        );
        // Display date format
        $('.daterange-predefined span').html(moment().subtract(29, 'days').format('YYYY-MM-DD') + ' &nbsp; - &nbsp; ' + moment().format('YYYY-MM-DD'));
    };

 var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        };

        $('.select').select2({
            dropdownAutoWidth: true,
            minimumResultsForSearch: Infinity
        });

    }
    var _componentAjaxReport = function() {
        
    }



    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDaterange();
            _componentSelect2();
        }
    }
}();



// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DateTimePickers.init();
});

$(document).ready(function(){
    $(document).on('click', '#submit', function(e){
        e.preventDefault();
        $('#submit').hide();
        $('#submiting').show();
        var url = $('#payment-form').attr('action');
        var field = $('#field').val();
        var from = $('#from').val();
        var to = $('#to').val();
        $('#ajaxloader').show();
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                field: field,
                from: from,
                to: to
            },
            dataType: 'html',
            success: function(data) {
                //console.log(data);
                $('#report').html(data);
                $('#ajaxloader').hide();
                $('#submit').show();
                $('#submiting').hide();
            },
            error: function(data) {
                console.log(data)
            }
        });
    })
    $('#from').val(moment().subtract(29, 'days').format('YYYY-MM-DD'));
    $('#to').val(moment().format('YYYY-MM-DD'));
})