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
            ajax: Base_url+'savings/datatable',
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
                data: 'ammount',
                name: 'ammount'
            }, {
                data: 'interest_rate',
                name: 'interest_rate'
            },  {
                data: 'interest',
                name: 'interest'
            },{
                data: 'duration',
                name: 'duration'
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
    var _componentLoanTypeDetails = function() {
        $(document).on('change', '#savings_type_id', function() {
            var savings_type_id = $(this).val();
            var url = Base_url+'setup/savings/ajax'; // it will get action url
            $.ajax({
                    url: url,
                    type: 'Post',
                    data: {
                        savings_type_id : savings_type_id
                    },
                    dataType: 'JSON'
                })
                .done(function(data) {
                    $('#interest_rate').val(data.savings.interest_rate);
                    $('#duration').val(data.savings.savings_duration);
                   refreshfield();
                    // hide ajax loader
                })
                .fail(function(data) {
                    console.log(data);
                    
                });

        });

    };

    var _componentDatePicker = function() {
        //console.log(estimate_time)
        var locatDate = moment.utc().format('YYYY-MM-DD');
        var stillUtc = moment.utc(locatDate).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD');
        var year = moment(stillUtc).local().format('YYYY');
        console.log(parseInt(year) + 5);
        $('.date').daterangepicker({
            "applyClass": 'bg-slate-600',
            "cancelClass": 'btn-light',
            "locale": {
                "format": 'YYYY-MM-DD'
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
                    _componentValidation();
                    _componentSelect2();
                    _componentDatePicker();
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
                ammount: {
                    number: true
                },
                interest_rate: {
                    number: true
                },interest_period: {
                    number: true
                },duration: {
                    number: true
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
                            //window.location.href = data.redirect;
                            window.open(
                              data.redirect,
                              '_blank' // <- This is what makes it open in a new window.
                            );
                            $('#submit').show();
                            $('#submiting').hide();
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
                        console.log(data)
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


    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentDatatableButtonsHtml5();
            _componentSelect2();
            _componentDatatable();
            _componentValidation();
            _componentDeleteItem();
            _componentDatePicker();
            _componentGetPaymentField();
            _componentLoanTypeDetails();
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

//change cost
$(document).on('keyup', '#ammount', function() {
    refreshfield();
});

//change cost
$(document).on('keyup', '#interest_rate', function() {
    refreshfield();
});

$(document).on('keyup', '#duration', function() {
    refreshfield();
});


function calculateInterest() {
    var ammount = parseFloat($('#ammount').val());
    var interest_rate = parseFloat($('#interest_rate').val());
    var duration = parseFloat($('#duration').val());
    if (isNaN(ammount)) {
        ammount = 0;
    }
    if (isNaN(interest_rate)) {
        interest_rate = 0;
    }
    if (isNaN(duration)) {
        duration = 0;
    }
    var total_rate = (interest_rate * duration) / (365 * 100);
    var interest = ammount * total_rate;
    if (isNaN(interest)) {
        interest = 0;
    }
    return roundToTwo(interest);
    //return total;
}


/// Craete Round Figure
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function refreshfield() {
    $('#interest').val(calculateInterest());
}