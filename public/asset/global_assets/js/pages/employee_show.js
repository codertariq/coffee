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
        $('.form-control-select2').select2();
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
                    // hide ajax loader
                })
                .fail(function(data) {
                    console.log(data);
                    $('.modal-body').html('<span style="color:red; font-weight: bold;"> Something Went Wrong. Please Try again later.......</span>');
                    $('#modal-loader').hide();
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
                            $('#submit').show();
                            $('#submiting').hide();
                            $('#modal_remote').modal('toggle');
                            window.location.href = window.location
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
            _componentAjaxgetPage();
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
