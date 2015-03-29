$(function() {

	/* jQuery navKit plugin init and settings */
	$('.js-nav').navKit({
		state: 'closed'
	});

	/* jQuery anchorScroll plugin init and settings */
	$('.js-switchers').anchorScroll({
		state: 'closed'
	});

	/* jQuery toggleContent plugin init and settings */
	$('.js-toggle').each(function() {
		$(this).toggleContent();
	});

	/* jQuery gallery plugin init and settings */
	$('.js-gall').gallJs();

	/* jQuery filter plugin init and settings */
	$(".js-filter").mixFilter();

});
