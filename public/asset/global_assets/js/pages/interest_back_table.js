/* ------------------------------------------------------------------------------
 *
 *  # Buttons extension for Datatables. HTML5 examples
 *
 *  Demo JS code for datatable_extension_buttons_html5.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------
var tariq = '';

var DatatableButtonsHtml5 = function() {


    //
    // Setup module components
    //

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


        // Basic initialization
        tariq = $('.content_managment_table').DataTable({
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
                    'pdfHtml5', {
                        text: 'Reload',
                        action: function(e, dt, node, config) {
                            dt.ajax.reload();
                        }
                    },
                ]
            },
            order: [0, 'desc'],
            pageLength: 25,
            processing: true,
            serverSide: true,
            ajax: Base_url + 'return/savings/interest/datatable',
            columns: [{
                data: 'id',
                name: 'id'
            }, {
                data: 'date',
                name: 'date'
            }, {
                data: 'member',
                name: 'member'
            }, {
                data: 'back_ammount',
                name: 'back_ammount'
            }, {
                data: 'back_interest',
                name: 'back_interest'
            }, {
                data: 'total_back',
                name: 'total_back'
            }, {
                data: 'received_by',
                name: 'received_by'
            },  {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            }]
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
        $('.select').select2({
            dropdownAutoWidth: true,
        });
        // Initialize
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            dropdownAutoWidth: true,
            width: 'auto'
        });
    };


    var _componentDeleteItem = function() {
        $(document).on('click', '#delete_item', function(e) {
            e.preventDefault();
            var row = $(this).data('id');
            var url = $(this).data('url');
            $('#action_menu_' + row).hide();
            $('#delete_loading_' + row).show();
            //console.log(row, url);
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, it will deleted all related Data!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        //console.log(row, url);

                        $.ajax({
                            url: url,
                            method: 'Delete',
                            contentType: false, // The content type used when sending data to the server.
                            cache: false, // To unable request pages to be cached
                            processData: false,
                            dataType: 'JSON',
                            success: function(data) {
                                //console.log(data);
                                if (data.success) {
                                    new PNotify({
                                        title: jsUcfirst(data.status),
                                        text: data.message,
                                        type: data.status,
                                    });
                                }
                                tariq.ajax.reload();
                            },
                            error: function(data) {
                                var jsonValue = $.parseJSON(data.responseText);
                                //console.log(jsonValue.Message);
                                new PNotify({
                                    title: 'Error',
                                    text: jsonValue.message,
                                    type: 'danger',
                                });
                                $('#delete_loading_' + row).hide();
                                $('#action_menu_' + row).show();
                            }
                        });
                    } else {
                        $('#delete_loading_' + row).hide();
                        $('#action_menu_' + row).show();
                    }
                });
        });
    }


    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableButtonsHtml5();
            _componentSelect2();
            _componentDatatable();
            _componentDeleteItem();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    DatatableButtonsHtml5.init();
    //console.log(tariq);
});

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//change cost
$(document).on('keyup', '#repay_ammount', function() {
    refreshfield();
});

//change cost
$(document).on('keyup', '#repay_interest', function() {
    refreshfield();
});

$(document).on('change', '#loan_id', function() {
    refreshfield();
});


function calculateTotalRepay() {
    var repay_ammount = parseFloat($('#repay_ammount').val());
    var repay_interest = parseFloat($('#repay_interest').val());
    if (isNaN(repay_ammount)) {
        repay_ammount = 0;
    }
    if (isNaN(repay_interest)) {
        repay_interest = 0;
    }
    var total_repay = repay_ammount + repay_interest;
    if (isNaN(total_repay)) {
        total_repay = 0;
    }
    return roundToTwo(total_repay);
    //return total;
}

function calculateLoanDue() {
    var total_loan_due = parseFloat($('#total_loan_due').val());
    var repay_ammount = parseFloat($('#repay_ammount').val());
    if (isNaN(repay_ammount)) {
        repay_ammount = 0;
    }
    if (isNaN(total_loan_due)) {
        total_loan_due = 0;
    }
    var loan_due = total_loan_due - repay_ammount;
    if (isNaN(loan_due)) {
        loan_due = 0;
    }
    return roundToTwo(loan_due);
    //return total;
}
function calculateInterestDue() {
    var total_interest_due = parseFloat($('#total_interest_due').val());
    var repay_interest = parseFloat($('#repay_interest').val());
    if (isNaN(total_interest_due)) {
        total_interest_due = 0;
    }
    if (isNaN(repay_interest)) {
        repay_interest = 0;
    }
    var interest_due = total_interest_due - repay_interest;
    if (isNaN(interest_due)) {
        interest_due = 0;
    }
    return roundToTwo(interest_due);
    //return total;
}
function calculateCurrentDue() {
   var total_due = parseFloat($('#total_due').val());
    var total_repay = parseFloat($('#total_repay').val());
    if (isNaN(total_due)) {
        total_due = 0;
    }
    if (isNaN(total_repay)) {
        total_repay = 0;
    }
    var total_current_due = total_due - total_repay;
    if (isNaN(total_current_due)) {
        total_current_due = 0;
    }
    return roundToTwo(total_current_due);
    //return total;
}

/// Craete Round Figure
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function refreshfield() {
    $('#total_repay').val(calculateTotalRepay());
    $('#loan_due').val(calculateLoanDue());
    $('#interest_due').val(calculateInterestDue());
    $('#current_due').val(calculateCurrentDue());
}

function getLoanDetailInfo(employee_id, loan_id) {
    $.ajax({
            url: Base_url + 'repay/loan/employee/loan_details_info',
            type: 'Post',
            data: {
                employee_id: employee_id,
                loan_id: loan_id
            },
            dataType: 'JSON'
        })
        .done(function(data) {
            console.log(data.total_interest_due);
            $('#repay_ammount').val(data.loan.loan_installment);
            $('#repay_interest').val(data.loan.interest_installment);
            $('#total_due').val(data.total_due);
            $('#total_loan_due').val(data.total_loan_due);
            $('#total_interest_due').val(data.total_interest_due);
            $('#installment_no').val(data.total_count);
            refreshfield();
        })
        .fail(function(data) {
            console.log(data);
        });
}