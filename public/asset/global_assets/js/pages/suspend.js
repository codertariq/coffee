$(document).ready(function(){
	$(document).on('click', '#suspend_admin', function(e){
		e.preventDefault();
		var row = $(this).data('id');
		var action = $(this).data('action');
		var msg = '';
		if (action == 'getback') {
			msg = "Activate Admin, He will be able to use this site!";
		}else{
			msg = "Once Suspend Admin, He will not be able to use this site!"
		}
		
		swal({
		  title: "Are you sure?",
		  text: msg,
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    $('#suspend-form-'+row).submit();
		  }
		});

	})
})