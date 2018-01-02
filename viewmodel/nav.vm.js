$(document).ready(function () {
	var viewModel = kendo.observable({
		message: '',
	});

	if ($(document).find('body').length > 0 && $(document).find('body')[0].id !== 'product-page') {
	    COMM.getWelcomeMessage(function (r) {
	        viewModel.set('message', r[0].message);
	    });
	}

	kendo.bind($("#navbar"), viewModel);
 });