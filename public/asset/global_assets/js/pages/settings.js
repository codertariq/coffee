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




    var _componentValidation = function() {
        if (!$().validate) {
            console.warn('Warning - validate.min.js is not loaded.');
            return;
        }

        // Initialize
        var validator = $('#settings-form').validate({
            ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
            errorClass: 'validation-invalid-label',
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
            submitHandler: function(e) {
                $('#submit').hide();
                $('#submiting').show();
                $(".ajax_error").remove();
                var submit_url = $('#settings-form').attr('action');
                //console.log(submit_url);
                //Start Ajax
                var formData = new FormData($("#settings-form")[0]);
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
            _componentValidation();
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