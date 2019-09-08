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


    // Select2 for length menu styling
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }
        $('.select').select2({
            dropdownAutoWidth: true,
        });
        $('.form-control-select2').select2();
    };

var _componentUniform = function() {
        if (!$().uniform) {
            console.warn('Warning - uniform.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.form-input-styled').uniform();
    };
    var _componentDatePicker = function() {
        //console.log(estimate_time)
        var locatDate = moment.utc().format('YYYY-MM-DD');
        var stillUtc = moment.utc(locatDate).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD');
        var year = moment(stillUtc).local().format('YYYY');
        // console.log(local);
        $('#dob, #nomenee_dob').daterangepicker({
            "applyClass": 'bg-slate-600',
            "cancelClass": 'btn-light',
            "locale": {
                "format": 'YYYY-MM-DD'
            },
            "singleDatePicker": true,
            "showDropdowns": true,
            "minYear": 1900,
            "maxYear": year,
            "timePicker": false,
            "alwaysShowCalendars": true,
            "maxDate": local,
        });
    };
    var _componentCheckMember = function() {
        $(document).on('change', '#referance_employee_id', function() {
            $('.refarance_member').remove();
           var url = $(this).data('url');
           $.ajax({
                    url: url+'/?employee_id='+$(this).val(),
                    type: 'Get',
                    dataType: 'JSON'
                })
                .done(function(data) {
                    $('#referance_employee_id').after('<div class="refarance_member text-'+data.status+'">' + data.message + '</div');
                })
                .fail(function(data) {
                    console.log(data);
                });

        });
    };var _componentSamePre = function() {
        $(document).on('change', '#same_pre', function() {
            if (this.checked) {
                $('#per_house').attr({'readonly': true, 'required': false}).val($('#pre_house').val());
                $('#per_vill').attr({'readonly': true, 'required': false}).val($('#pre_vill').val());
                $('#per_post').attr({'readonly': true, 'required': false}).val($('#pre_post').val());
                $('#per_up').attr({'readonly': true, 'required': false}).val($('#pre_up').val());
                $('#per_dist').attr({'readonly': true, 'required': false}).val($('#pre_dist').val());
            } else{
                $('#per_house').attr({'readonly': false, 'required': true}).val('');
                $('#per_vill').attr({'readonly': false, 'required': true}).val('');
                $('#per_post').attr({'readonly': false, 'required': true}).val('');
                $('#per_up').attr({'readonly': false, 'required': true}).val('');
                $('#per_dist').attr({'readonly': false, 'required': true}).val('');
            }
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
                user_password: {
                    minlength: 6
                },
                user_password_confirmation:{
                    minlength: 6,
                    equalTo: '#user_password'
                },
                per_day_salary:{
                    number: true
                }
            },
            submitHandler: function(e) {
                //$('#content_form').submit();
                $('#submit').hide();
                $('#submiting').show();
                $(".ajax_error").remove();
                var submit_url = $('#content_form').attr('action');
                //Start Ajax
                var formData = new FormData($("#content_form")[0]);
                console.log(formData);
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
                            window.location.href = data.redirect;
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

    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentSelect2();
            _componentSamePre();
            _componentValidation();
            _componentDatePicker();
            _componentCheckMember();
            _componentUniform();
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

