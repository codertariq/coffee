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
                minDate: moment().local().subtract(2, 'years').format('DD-MM-YYYY'),
                maxDate: moment().local().format('DD-MM-YYYY'),
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
                $('.daterange-predefined span').html(start.format('DD-MM-YYYY') + ' &nbsp; - &nbsp; ' + end.format('DD-MM-YYYY'));
                    $('#from').val(start.format('DD-MM-YYYY'));
                    $('#to').val(end.format('DD-MM-YYYY'));
                    //_componentAjaxReport();
            }
        );
        // Display date format
        $('.daterange-predefined span').html(moment().subtract(29, 'days').format('DD-MM-YYYY') + ' &nbsp; - &nbsp; ' + moment().format('DD-MM-YYYY'));
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
    // Basic Datatable examples
    var _componentDatatableButtonsHtml5 = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            dom: '<"datatable-header"fBl><"datatable-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'last': 'Last',
                    'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;',
                    'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'
                }
            }
        });
    };
      // Basic Datatable examples
    var _componentDatatable = function() {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            dom: '<"datatable-header"fBl><"datatable-wrap"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'last': 'Last',
                    'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;',
                    'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;'
                }
            }
        });
        // Basic initialization
       $('.managment_table').DataTable({
            buttons: {
                dom: {
                    button: {
                        className: 'btn btn-light'
                    }
                },
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            },
            
        });
    };
    // Select2 for length menu styling
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }
        // Initialize
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            dropdownAutoWidth: true,
            width: 'auto'
        });
    };



    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableButtonsHtml5();
            _componentDatatable();
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
        var field = $('#field').val();
        var from = $('#from').val();
        var to = $('#to').val();
        $('#ajaxloader').show();
        $.ajax({
            url: '/admin/get/salary/analysis',
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
                _componentDatatableButtonsHtml5();
                _componentDatatable();
            },
            error: function(data) {
                console.log(data)
            }
        });
    })
    $('#from').val(moment().subtract(29, 'days').format('DD-MM-YYYY'));
    $('#to').val(moment().format('DD-MM-YYYY'));
})