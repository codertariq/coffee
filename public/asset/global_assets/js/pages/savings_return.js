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
        $('.managment_table').DataTable();
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
        var locatDate = moment.utc().format('YYYY-MM-DD');
        var stillUtc = moment.utc(locatDate).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD');
        var year = moment(stillUtc).local().format('YYYY');
        //console.log(parseInt(year) + 5);
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
                        method_name: method,
                        type: 'single'
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
    var _componentGetSavingsField = function() {
        $(document).on('change', '#member_id', function() {
            var member_id = $(this).val(); // it will get action url
            //console.log(json_encode(method));
            $.ajax({
                    url: Base_url + 'return/savings/savings',
                    type: 'Post',
                    data: {
                        member_id: member_id,
                        name: 'savings_type_id'
                    },
                    dataType: 'html'
                })
                .done(function(data) {
                    //console.log(data);
                    $('#all_savings').html(data);
                    _componentValidation();
                    _componentSelect2();
                    // hide ajax loader
                })
                .fail(function(data) {
                    //console.log(data);
                    $('#all_loan').html('<span style="color:red; font-weight: bold;"> Something Went Wrong. Please Try again later.......</span>');
                });

        });
    };
    var _componentGetSavingsDetails = function() {
        $(document).on('change', '#savings_type_id', function() {
            console.log('Tariq');
           $('#savings_loader').show();
            var member_id = $('#member_id').val();
            var savings_type_id = $(this).val();
            $.ajax({
                    url: Base_url + 'return/savings/savings_details',
                    type: 'Post',
                    data: {
                        member_id: member_id,
                        savings_type_id: savings_type_id
                    },
                    dataType: 'html'
                })
                .done(function(data) {
                    //console.log(data);
                    getSavingsDetailInfo(member_id, savings_type_id);
                    $('#savings_details').html(data);
                    _componentDatatable();
                    _componentSelect2();
                    $('#savings_loader').hide();
                    // hide ajax loader
                })
                .fail(function(data) {
                    //console.log(data);
                    $('#loan_details').html('<span style="color:red; font-weight: bold;"> Something Went Wrong. Please Try again later.......</span>');
                    $('#loan_loader').hide();
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
                repay_ammount: {
                    number: true
                },
                repay_interest: {
                    number: true
                },
                active_date: {
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
            _componentSelect2();
            _componentDatatable();
            _componentValidation();
            _componentDeleteItem();
            _componentChangeStatus();
            _componentDatePicker();
            _componentGetPaymentField();
            _componentGetSavingsField();
            _componentGetSavingsDetails();
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
$(document).on('keyup', '#back_ammount', function() {
    var total_savings = parseFloat($('#total_savings').val());
    var back_ammount = parseFloat($(this).val());
    if (back_ammount > total_savings) {
        swal({
            title: "What?",
            text: 'You Can not Permitted To Back more Than Savings Ammount',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        $(this).val(total_savings);
    }
    refreshfield();
});

//change cost
$(document).on('keyup', '#back_interest', function() {
    //console.log('back_interest');
    var total_savings_interest = parseFloat($('#total_savings_interest').val());
    var back_back = parseFloat($(this).val());
    if (back_back > total_savings_interest) {
        swal({
            title: "Are You Sure?",
            text: 'You are going to pay more than Calculated Interest.',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                    if (willDelete) {
                        $('#total_back').val(calculateTotalBack());
                        $('#savings_ammount').val(calculateTotalSavings());
                        $('#savings_interest').val(calculateSavingsInterest());
                    } else {
                        refreshfield();
                    }
        });
    } else{
        $('#total_back').val(calculateTotalBack());
        $('#savings_ammount').val(calculateTotalSavings());
        $('#savings_interest').val(calculateSavingsInterest());
    }
    
});

$(document).on('change', '#savings_type_id', function() {
    refreshfield();
});


function calculateTotalBack() {
    var back_ammount = parseFloat($('#back_ammount').val());
    var back_interest = parseFloat($('#back_interest').val());
    if (isNaN(back_ammount)) {
        back_ammount = 0;
    }
    if (isNaN(back_interest)) {
        back_interest = 0;
    }
    var total_back = back_ammount + back_interest;
    if (isNaN(total_back)) {
        total_back = 0;
    }
    return roundToTwo(total_back);
    //return total;
}

function calculateTotalSavings() {
    var total_savings = parseFloat($('#total_savings').val());
    var back_ammount = parseFloat($('#back_ammount').val());
    if (isNaN(total_savings)) {
        total_savings = 0;
    }
    if (isNaN(back_ammount)) {
        back_ammount = 0;
    }
    var savings = total_savings - back_ammount;
    if (isNaN(savings)) {
        savings = 0;
    }
    return roundToTwo(savings);
    //return total;
}
function calculateSavingsInterest() {
    var total_savings_interest = parseFloat($('#total_savings_interest').val());
    var back_interest = parseFloat($('#back_interest').val());
    if (isNaN(total_savings_interest)) {
        total_savings_interest = 0;
    }
    if (isNaN(back_interest)) {
        back_interest = 0;
    }
    var savings_interest = total_savings_interest - back_interest;
    if (isNaN(savings_interest)) {
        savings_interest = 0;
    }
    return roundToTwo(savings_interest);
    //return total;
}

function calculateBackInterest() {
    var total_savings_duration = parseFloat($('#total_savings_duration').val());
    var back_ammount = parseFloat($('#back_ammount').val());
    var savings_interest_rate = parseFloat($('#savings_interest_rate').val());
    var savings_duration = parseFloat($('#savings_duration').val());
    if (isNaN(total_savings_duration)) {
        total_savings_duration = 0;
    }
    if (isNaN(back_ammount)) {
        back_ammount = 0;
    }
    if (isNaN(savings_duration)) {
        savings_duration = 0;
    }
    var interest_rate = (savings_interest_rate * savings_duration) / (100 * total_savings_duration)
    var back_interest = back_ammount * interest_rate;
    if (isNaN(back_interest)) {
        back_interest = 0;
    }
    return roundToTwo(back_interest);
    //return total;
}

/// Craete Round Figure
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function refreshfield() {
    $('#total_back').val(calculateTotalBack());
    $('#back_interest').val(calculateBackInterest());
    $('#savings_ammount').val(calculateTotalSavings());
    $('#savings_interest').val(calculateSavingsInterest());
}

function getSavingsDetailInfo(member_id, savings_type_id) {
    $.ajax({
            url: Base_url + 'return/savings/savings_details_info',
            type: 'Post',
            data: {
                member_id: member_id,
                savings_type_id: savings_type_id
            },
            dataType: 'JSON'
        })
        .done(function(data) {
            //console.log(data);
             //console.log(data.interest);
            $('#back_ammount').val(data.total_savings_ammount);
            $('#back_interest').val(roundToTwo(data.interest));
            $('#total_savings_interest').val(roundToTwo(data.interest));
            $('#total_savings').val(data.total_savings_ammount);
            $('#savings_duration').val(data.savings_duration);
            $('#total_savings_duration').val(data.savings.savings_duration);
            $('#savings_interest_rate').val(data.savings.interest_rate);
            $('#installment_no').val(data.total_count);
            refreshfield();
            console.log($('#back_interest').val());
        })
        .fail(function(data) {
            console.log(data);
        });
}