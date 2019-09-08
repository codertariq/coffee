 /* ------------------------------------------------------------------------------
 *
 *  # Login pages
 *
 *  Demo JS code for a set of login and registration pages
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var LoginRegistration = function () {


    //
    // Setup module components
    //

    // Uniform
    var _componentUniform = function() {
        if (!$().uniform) {
            console.warn('Warning - uniform.min.js is not loaded.');
            return;
        }

        // Initialize
        $('.form-input-styled').uniform();
    };

    // Select2
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        };

        // Basic example
        $('.form-control-select2').select2();

    }


        // Validation config
    var _componentValidation = function() {
        if (!$().validate) {
            console.warn('Warning - validate.min.js is not loaded.');
            return;
        }

        // Initialize
        var validator = $('.form-validate-jquery').validate({
            ignore: 'input[type=hidden]', // ignore hidden fields
            errorClass: 'validation-invalid-label',
            successClass: 'validation-valid-label',
            validClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            // success: function(label) {
            //     label.addClass('validation-valid-label').text('Success.'); // remove to hide Success message
            // },

            // Different components require proper error label placement
            errorPlacement: function(error, element) {
                    error.insertAfter(element);
            },
            rules: {
                first_name: {
                    minlength: 3
                },
                last_name: {
                    minlength: 3
                },
                dob: {
                    date: true
                },
                nid: {
                    number: true,
                    minlength: 17,
                    maxlength: 17,
                },
                moble: {
                    number: true,
                    minlength: 11,
                    maxlength: 11
                },
                email: {
                    email: true
                }
                
            },
              submitHandler: function(form) {
                // do other things for a valid form
                form.submit();
              }

        });
    };

    //
    // Return objects assigned to module
    //

    return {
        initComponents: function() {
            _componentUniform();
            _componentValidation();
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
    LoginRegistration.initComponents();
});

$(document).ready(function(){
    $(document).on('click', '#upload_image', function(){
        $('#upload_image_field').toggle();
        $('#delete_image').prop('checked',false);
        $.uniform.update();
        //console.log($('#upload_image_field').attr('style'));
    });
    $(document).on('click', '#delete_image', function(){
        var display = $('#upload_image_field').attr('style');
        if (display == '') {
            $('#upload_image_field').attr('style', 'display: none');
        }
        $('#upload_image').prop('checked',false);
        $.uniform.update();
        console.log($('#upload_image_field').attr('style'));
    })
});
