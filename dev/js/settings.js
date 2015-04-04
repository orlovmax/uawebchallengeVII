$(function() {

	/* jQuery navKit plugin init and settings */
	$('.js-nav').navKit().end().anchorScroll();

	/* jQuery anchorScroll plugin init and settings */
	$('.js-switchers').anchorScroll();

	/* jQuery toggleContent plugin init and settings */
	$('.js-toggle').each(function() {
		$(this).toggleContent();
	});

	/* jQuery gallery plugin init and settings */
	$('.js-gall').gallJs();

	/* jQuery filter plugin init and settings */
	$(".js-filter").mixFilter();

});
