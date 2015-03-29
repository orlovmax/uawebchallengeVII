/*
 * navigation script: sticky nav, anchor smooth scrolling, selecting current nav item
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		navAnchor: 'js-anchor',
	    navLink: 'js-link',
	    navOpen: 'js-navopen',
	    navClose: 'js-navclose',
	    topnav: 'js-topnav',
	    topnavBtn: 'js-topnavbtn',
	    topnavBg: 'is-bg',
	    visible: 'is-visible',
	    activeLink: 'is-active',
	    state: 'closed'
	};

	function NavKit( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	NavKit.prototype.init = function () {
		var $this = $(this.element),
			$navAnchor = $this.find('.' + this.options.navAnchor),
	    	$navLink = $this.find('.' + this.options.navLink),
	    	$navOpen = $('.' + this.options.navOpen),
	    	$navClose = $('.' + this.options.navClose),
	    	$topnav = $('.' + this.options.topnav),
	    	$topnavBtn = $('.' + this.options.topnavBtn),
	    	cond = this.options.state,
			aArray = [],
			i;

		// Looking for condition from settings, if it closed - add appropriate classes
		// to icon, menu and container
		if (! cond || cond == "closed"){
			$this.removeClass(this.options.visible);
		} else{
		    $this.addClass(this.options.visible);
		}

		// Open main menu
		$navOpen.on('click', $.proxy(function(e){
		     e.preventDefault();
		     $this.addClass(this.options.visible);
		}, this));

		// Close main menu
		$navClose.on('click', $.proxy(function(e){
		     e.preventDefault();
		     $this.removeClass(this.options.visible);
		}, this));

		// Smooth anchor scroll, targeted to our nav anchors
		// Actually this thing was modified on csstricks
		$navAnchor.click(function () {
			if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
				location.hostname === this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
				if (target.length) {
				$("html,body").animate({
				    scrollTop: target.offset().top
				}, 1000);
				return false;
			    }
			}
		});

		//Highlight nav list item when current section visible
		//Originally this way is belong to http://www.callmenick.com
		for(i = 0; i < $navLink.length; i += 1) {
			var link = $navLink[i],
				ahref = $(link).attr('href');
				aArray.push(ahref);
		} // this for loop fills the aArray with attribute href values

		$(window).scroll($.proxy(function () {
			var windowPos = $(window).scrollTop(), // get the offset of the window from the top of page
				windowHeight = $(window).height(), // get the height of the window
				docHeight = $(document).height(),
				$firstSection = $(".screen").eq(0);

			for (i = 0; i < aArray.length; i += 1) {
				var theID = aArray[i],
				sectPos = $(theID).offset().top, // get the offset of the div from the top of page + except nav height
				sectHeight = $(theID).height(); // get the height of the div in question

				if (windowPos >= sectPos && windowPos < (sectPos + sectHeight)) {
					$navLink.filter("[href='" + theID + "']").addClass(this.options.activeLink);
				} else {
					$navLink.filter("[href='" + theID + "']").removeClass(this.options.activeLink);
				}
			}

			//highlight last nav list item on last section
			if (windowPos + windowHeight === docHeight) {
				if (!$this.find("li").filter(":last-child").find($navLink).hasClass(this.options.activeLink)) {
					$navLink.filter("." + this.options.activeLink).removeClass(this.options.activeLink);
					$this.find("li").filter(":last-child").find($navLink).addClass(this.options.activeLink);
				}
			}

			//highlight first nav item when first section has some top offset
			if (windowPos < $firstSection.offset().top) {
				if (!$this.find("li").filter(":first-child").find($navLink).hasClass(this.options.activeLink)) {
					$navLink.filter("." + this.options.activeLink).removeClass(this.options.activeLink);
					$this.find("li").filter(":first-child").find($navLink).addClass(this.options.activeLink);
				}
			}

			// Show topnav button
			if (windowPos > windowHeight) {
				$topnav.addClass(this.options.topnavBg);
				$topnavBtn.addClass(this.options.visible);
			} else {
				$topnav.removeClass(this.options.topnavBg);
				$topnavBtn.removeClass(this.options.visible);
			}
		}, this));
	};

	$.fn.navKit = function ( options ) {
		return this.each(function () {
			new NavKit( this, options );
		});
	};

})( jQuery, window, document );
