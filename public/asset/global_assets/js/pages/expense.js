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
            processing: true,
            serverSide: true,
            ajax: Base_url+'expense/datatable',
            columns: [{
                data: 'id',
                name: 'id'
            },{
                data: 'date',
                name: 'date'
            },{
                data: 'expense_by',
                namexpense_bye: 'expense_by'
            },{
                data: 'expense_type',
                name: 'expense_type'
            },{
                data: 'expense_ammount',
                name: 'expense_ammount'
            },{
                data: 'description',
                name: 'description'
            },{
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

    var _componentDatePicker = function() {
        //console.log(estimate_time)
        var locatDate = moment.utc().format('DD/MM/YYYY');
        var stillUtc = moment.utc(locatDate).toDate();
        var local = moment(stillUtc).local().format('MM-DD-YYYY');
        var year = moment(stillUtc).local().format('YYYY');
        console.log(parseInt(year) + 5);
        $('.date').daterangepicker({
            "applyClass": 'bg-slate-600',
            "cancelClass": 'btn-light',
            "locale": {
                "format": 'DD-MM-YYYY'
            },
            "singleDatePicker": true,
            "showDropdowns": true,
            "minYear": year,
            "maxYear": parseInt(year) + 5,
            "timePicker": false,
            "alwaysShowCalendars": true,
            "minDate": local,
            "opens": "right",
            "drops": "down"
        });
    };
        var _componentActiveDatePicker = function() {
        //console.log(estimate_time)
        var locatDate = moment.utc().format('DD-MM-YYYY');
        var stillUtc = moment.utc(locatDate).toDate();
        var local = moment(stillUtc).local().format('MM-DD-YYYY');
        var year = moment(stillUtc).local().format('YYYY');
        console.log(parseInt(year) + 5);
        $('#active_date').daterangepicker({
            "applyClass": 'bg-slate-600',
            "cancelClass": 'btn-light',
            "locale": {
                "format": 'DD-MM-YYYY'
            },
            "singleDatePicker": true,
            "showDropdowns": true,
            "minYear": year,
            "maxYear": parseInt(year) + 5,
            "timePicker": false,
            "alwaysShowCalendars": true,
            "minDate": local,
            "opens": "right",
            "drops": "up"
        });
    };

  var _componentAjaxgetPage = function() {
        $(document).on('click', '#content_managment', function(e) {
            e.preventDefault();
            var url = $(this).data('url'); // it will get action url
            //console.log(url)
            $('.modal-body').html(''); // leave it blank before ajax call
            $('#modal-loader').show(); // load ajax loader
            $.ajax({
                    url: url,
                    type: 'Get',
                    dataType: 'html'
                })
                .done(function(data) {
                    //console.log(data);
                    $('.modal-body').html('');
                    $('.modal-body').html(data); // load response
                    $('#modal-loader').hide();
                    _componentValidation();
                    _componentSelect2();
                    _componentDatePicker()
                    // hide ajax loader
                })
                .fail(function(data) {
                    console.log(data);
                    $('.modal-body').html('Something Went Wrong. Please Try again later.......');
                    $('#modal-loader').hide();
                });

        });

    };
    var _componentGetPaymentField = function() {
        $(document).on('change', '#medium', function() {
            $('#bank_loader').show();
            var method = $(this).val(); // it will get action url
            //console.log(json_encode(method));
            $.ajax({
                    url: Base_url + 'get/bank/field',
                    type: 'Post',
                    data: {
                        method_name: method
                    },
                    dataType: 'html'
                })
                .done(function(data) {
                    //console.log(data);
                    $('#bank_information').html(data);
                    _componentActiveDatePicker();
                    _componentValidation();
                    _componentSelect2();
                    // hide ajax loader
                    $('#bank_loader').hide();
                })
                .fail(function(data) {
                    //console.log(data);
                    $('#bank_loader').hide();
                    $('#bank_information').html('<span style="color:red; font-weight: bold;"> Something Went Wrong. Please Try again later.......</span>');
                });

        });
    };

    var _componentValidation = function() {
        if (!$().validate) {
            console.warn('Warning - validate.min.js is not loaded.');
            return;
        }

        // Initialize
        var validator = $('#content_form').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'text-danger',
            successClass: 'validation-valid-label',
            validClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },

            // Different components require proper error label placement
            errorPlacement: function(error, element) {

                // Unstyled checkboxes, radios
                if (element.parents().hasClass('form-check')) {
                    error.appendTo(element.parents('.form-check').parent());
                }

                // Input with icons and Select2
                else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }

                // Input group, styled file input
                else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }

                // Other elements
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                deposit_ammount: {
                    number: true
                },deposit_date: {
                    date: false
                },active_date: {
                    date: false
                }
            },
            submitHandler: function(e) {
                $('#submit').hide();
                $('#submiting').show();
                $(".ajax_error").remove();
                var submit_url = $('#content_form').attr('action');
                //Start Ajax
                var formData = new FormData($("#content_form")[0]);
                $.ajax({
                    url: submit_url,
                    type: 'POST',
                    data: formData,
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
                            $('#submit').show();
                            $('#submiting').hide();
                            $('#modal_remote').modal('toggle');
                            //var table = $('.patient_managment_table').DataTable();
                            tariq.ajax.reload();
                        } else {
                            const errors = data.message
                                // console.log(errors)
                            var i = 0;
                            $.each(errors, function(key, value) {
                                const first_item = Object.keys(errors)[i]
                                const message = errors[first_item][0]
                                $('#' + first_item).after('<div class="ajax_error" style="color:red">' + value + '</div');
                                new PNotify({
                                    title: 'Error',
                                    text: value,
                                    type: 'danger',
                                });
                                i++;
                            });
                            $('#submit').show();
                            $('#submiting').hide();
                        }
                    },
                    error: function(data) {
                        var jsonValue = $.parseJSON(data.responseText);
                        //console.log(jsonValue.Message);
                        new PNotify({
                            title: 'Error',
                            text: jsonValue.message,
                            type: 'danger',
                        });
                        $('#submit').show();
                        $('#submiting').hide();
                    }
                });
            }

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

    var _componentChangeStatus = function() {
        $(document).on('click', '#change_status', function(e) {
            e.preventDefault();
            var row = $(this).data('id');
            var url = $(this).data('url');
            var status = $(this).data('status');
            if (status == 1) {
                msg = 'Change Status Form Online To Offline';
            } else {
                msg = 'Change Status Form Offline To Online';
            }
            $('#action_menu_' + row).hide();
            $('#delete_loading_' + row).show();
            //console.log(row, url);
            swal({
                    title: "Are you sure?",
                    text: msg,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        //console.log(row, url);

                        $.ajax({
                            url: url,
                            method: 'Put',
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
            _componentAjaxgetPage();
            _componentSelect2();
            _componentDatatable();
            _componentValidation();
            _componentDeleteItem();
            _componentChangeStatus();
            _componentDatePicker();
            _componentGetPaymentField();
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

