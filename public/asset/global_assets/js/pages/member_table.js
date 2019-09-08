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
            ajax: Base_url+'member/datatable',
            columns: [{
                data: 'id',
                name: 'id'
            }, {
                data: 'member_id',
                name: 'member_id'
            }, {
                data: 'type',
                name: 'type'
            },{
                data: 'area',
                name: 'area'
            }, {
                data: 'name',
                name: 'name'
            },{
                data: 'nid',
                name: 'nid'
            }, {
                data: 'mobile',
                name: 'mobile'
            }, {
                data: 'status',
                name: 'status',
                orderable: false,
                searchable: false
            }, {
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
        // Initialize
        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            dropdownAutoWidth: true,
            width: 'auto'
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
                    _componentDatatable();
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
            _componentAjaxgetPage();
            _componentDeleteItem();
            _componentChangeStatus();
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
