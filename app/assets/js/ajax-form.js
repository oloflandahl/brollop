$(function() {

	// Get the form.
	var $form = $('#rsvp-form');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$form.submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		if (!$form.valid()) {
			return false;
		}

		// Serialize the form data.
		var formData = $form.serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $form.attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'alert-success' class.
			$(formMessages).removeClass('alert alert-danger');
			$(formMessages).addClass('alert alert-success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#cname').val('');
			$('#cemail').val('');
			$('#cevents').val('');
			$('#cguests').val('');
			$('#cguestinfo').val('');
			$('#cmessage').val('');

			$('#form-fields').slideUp();
			
    	$('#rsvp-mail').hide();
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'alter-danger' class.
			$(formMessages).removeClass('alert alert-success');
			$(formMessages).addClass('alert alert-danger');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Det gick inte att skicka anmälan.');
			}
		});

	});

});
