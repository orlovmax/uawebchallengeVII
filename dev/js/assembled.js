;(function ( $, window, document, undefined ) {
	var defaults = {
		navAnchor: 'js-anchor',
	    navLink: 'js-link',
	    activeLink: 'is-active',
	};

	function AnchorScroll( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	AnchorScroll.prototype.init = function () {
		var $this = $(this.element),
			$navAnchor = $this.find('.' + this.options.navAnchor),
	    	$navLink = $this.find('.' + this.options.navLink),
			aArray = [],
			i;

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
				$firstSection = $("section").eq(0);
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
		}, this));
	};

	$.fn.anchorScroll = function ( options ) {
		return this.each(function () {
			new AnchorScroll( this, options );
		});
	};

})( jQuery, window, document );

/*
 * navigation script: sticky nav, anchor smooth scrolling, selecting current nav item
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		navAnchor: 'js-anchor',
	    navLink: 'js-link',
	    navOpen: 'js-navopen',
	    navClose: 'js-navclose',
	    openNav: 'is-visible',
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
	    	cond = this.options.state,
			aArray = [],
			i;

		// Looking for condition from settings, if it closed - add appropriate classes
		// to icon, menu and container
		if (! cond || cond == "closed"){
			$this.removeClass(this.options.openNav);
		} else{
		    $this.addClass(this.options.openNav);
		}

		// Open main menu
		$navOpen.on('click', $.proxy(function(e){
		     e.preventDefault();
		     $this.addClass(this.options.openNav);
		}, this));

		// Close main menu
		$navClose.on('click', $.proxy(function(e){
		     e.preventDefault();
		     $this.removeClass(this.options.openNav);
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
				$firstSection = $("section").eq(0);
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
		}, this));
	};

	$.fn.navKit = function ( options ) {
		return this.each(function () {
			new NavKit( this, options );
		});
	};

})( jQuery, window, document );


function removeClass (index, classNames) {
	var current_classes = classNames.split(" "), // change the list into an array
			classes_to_remove = []; // array of classes which are to be removed

	$.each(current_classes, function (index, class_name) {
		// if the classname begins with bg add it to the classes_to_remove array
		if (/screen_bg.*/.test(class_name)) {
			classes_to_remove.push(class_name);
		}
	});
	// turn the array back into a string
	return classes_to_remove.join(" ");
}

/*
 * toggle toggler
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		toggleLink: 'js-togglelink',
		toggleBg: 'js-togglebg',
		toggleTarget: 'js-toggletarget',
		toggleClose: 'js-toggleclose',
		activeContent: 'is-visible',
		activeLink: 'is-active'
	};

	function ToggleContent( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	ToggleContent.prototype.init = function () {
		var $this = $(this.element),
			$toggleLink = $this.find('.' + this.options.toggleLink),
			$toggleTarget = $this.find('.' + this.options.toggleTarget),
			$toggleClose = $this.find('.' + this.options.toggleClose)


		$toggleLink.on('click', $.proxy(function(e){
			e.preventDefault();
			var $current = $(e.target),
				$target = $($current.attr('href')),
				bgName = e.target.hash.slice(1);

			// Disable actions with selected item
			if (!$current.hasClass(this.options.activeLink)) {
				// Hide all targets and remove highlight from links
				$toggleLink.removeClass(this.options.activeLink);
				$toggleTarget.fadeOut().removeClass(this.options.activeContent);

				// Show targets and highlight active link
				$current.addClass(this.options.activeLink);
				$target.fadeIn();

				// Change background
				if($current.hasClass(this.options.toggleBg)) {
					$this.removeClass(removeClass)
					$this.addClass('screen_bg_' + bgName)
				}
			}
		}, this));

		$toggleClose.on('click', $.proxy(function(e){
			e.preventDefault();
			$toggleTarget.fadeOut().removeClass(this.options.activeContent);
		}, this));
	};

	$.fn.toggleContent = function ( options ) {
		return this.each(function () {
			new ToggleContent( this, options );
		});
	};

})( jQuery, window, document );

$(function() {

	/* jQuery navKit plugin init and settings
	*
	* navAnchor: "js-anchor"	anchor class name link for smooth scrolling
	* navLink: "js-link"		link class name for hightlight on current section
	* navOpen: "js-navopen"	    icon class name for toggling navbar
	* navClose: "js-navclose"	icon class name for toggling navbar
	* openNav: 'is-visible',    class name for visible menu
	* activeLink: "is-active"	class name of active and highlighted link
	* state: "closed"			default state of navbar
	 */
	$('.js-nav').navKit({
		state: 'closed'
	});

	/* jQuery anchorScroll plugin init and settings
	*
	* navAnchor: "js-anchor"	anchor class name link for smooth scrolling
	* navLink: "js-link"		link class name for hightlight on current section
	* activeLink: "is-active"	class name of active and highlighted link
	 */
	$('.js-switchers').anchorScroll({
		state: 'closed'
	});

	/* jQuery tabToggle plugin init and settings
	*
	* toggleLink: "js-togglelink"      class name of tab menu item
	* toggleTarget: "js-toggletarget"  target page
	* activeTab: "is-visible"    helper class to show target page
	* activeLink: "is-active"    helper class to highlight tab link

	 */
	$('.js-toggle').toggleContent();
});
