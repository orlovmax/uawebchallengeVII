/*
 * navigation script: open / clos navbar, add bg onscroll
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
	    topnav: 'js-topnav',
	    topnavBtn: 'js-topnavBtn',
	    topnavNoBg: 'js-topnavNoBg',
	    navOpen: 'js-navOpen',
	    navClose: 'js-navClose',
	    isBg: 'is-bg',
	    isVisible: 'is-visible',
	    state: 'closed'
	};

	function NavKit( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	NavKit.prototype.init = function () {
		var $this = $(this.element),
	    	$topnav = $('.' + this.options.topnav),
	    	$topnavBtn = $('.' + this.options.topnavBtn),
	    	$topnavNoBg = $('.' + this.options.topnavNoBg),
	    	$navOpen = $('.' + this.options.navOpen),
	    	$navClose = $('.' + this.options.navClose),
	    	cond = this.options.state,
			aArray = [],
			i;

		// Looking for condition from settings, if it closed - add appropriate classes
		// to icon, menu and container
		if (! cond || cond == "closed"){
			$this.removeClass(this.options.isVisible);
		} else{
		    $this.addClass(this.options.isVisible);
		}

		// Open main menu
		$navOpen.on('click', $.proxy(function(e){
		     e.preventDefault();
		     if(!$this.hasClass(this.options.isVisible)) {
		     	$this.addClass(this.options.isVisible);
		    }
		}, this));

		// Close main menu
		$navClose.on('click', $.proxy(function(e){
		     e.preventDefault();
		     if($this.hasClass(this.options.isVisible)) {
		     	$this.removeClass(this.options.isVisible);
		     }
		}, this));

		$(window).scroll($.proxy(function () {
			var windowPos = $(window).scrollTop(),
				windowHeight = $(window).height();

			// Show topnav button
			if (windowPos > windowHeight) {
				$topnav.addClass(this.options.isBg);
				$topnavBtn.addClass(this.options.isVisible);
			} else {
				$topnav.removeClass(this.options.isBg);
				$topnavBtn.removeClass(this.options.isVisible);
			}
		}, this));
	};

	$.fn.navKit = function ( options ) {
		return this.each(function () {
			new NavKit( this, options );
		});
	};

})( jQuery, window, document );
