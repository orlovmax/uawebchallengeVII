;(function ( $, window, document, undefined ) {
	var defaults = {
		navAnchor: 'js-anchor',
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
			aArray = [],
			i;

		// Smooth anchor scroll, targeted to our nav anchors
		// Actually this thing was modified on csstricks
		$navAnchor.on('click', function () {
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
		for(i = 0; i < $navAnchor.length; i += 1) {
			var link = $navAnchor[i],
				ahref = $(link).attr('href');
				aArray.push(ahref);
		}

		$(window).scroll($.proxy(function () {
			var windowPos = $(window).scrollTop(),
				windowHeight = $(window).height(),

				$firstSection = $(aArray[0]),
				$lastSection = $(aArray.slice(-1)[0]);

			for (i = 0; i < aArray.length; i += 1) {
				var theID = aArray[i],
				sectPos = $(theID).offset().top,
				sectHeight = $(theID).height();

				if (windowPos >= sectPos && windowPos < (sectPos + sectHeight)) {
					$navAnchor.filter("[href='" + theID + "']").addClass(this.options.activeLink);
				} else {
					$navAnchor.filter("[href='" + theID + "']").removeClass(this.options.activeLink);
				}
			}

			//highlight last nav list item on last section
			if (windowPos > $lastSection.offset().top) {
				if (!$this.find("li").filter(":last-child").find($navAnchor).hasClass(this.options.activeLink)) {
					$navAnchor.filter("." + this.options.activeLink).removeClass(this.options.activeLink);
					$this.find("li").filter(":last-child").find($navAnchor).addClass(this.options.activeLink);
				}
			}

			//highlight first nav item when first section has some top offset
			if (windowPos < $firstSection.offset().top) {
				if (!$this.find("li").filter(":first-child").find($navAnchor).hasClass(this.options.activeLink)) {
					$navAnchor.filter("." + this.options.activeLink).removeClass(this.options.activeLink);
					$this.find("li").filter(":first-child").find($navAnchor).addClass(this.options.activeLink);
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
 * filter script to 'mix' items
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		item: 'js-filterItem',
		itemHidden: 'is-hidden',
		filterLink: 'js-filterlink',
		filterSelected: 'is-active'
	};

	function MixFilter( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	MixFilter.prototype.init = function () {
		var $this = $(this.element),
			$item = $this.find('.' + this.options.item),
			$itemHidden = $('.' + this.options.itemHidden),
			$filterLink = $this.find('.' + this.options.filterLink),
			$filterSelected = $('.' + this.options.filterSelected);

		$filterLink.on('click', $.proxy(function(e){
			e.preventDefault();
			var $target = $($(e.target));

			if (!$target.hasClass(this.options.filterSelected)) {
				$filterLink.removeClass(this.options.filterSelected);
				$target.addClass(this.options.filterSelected);
				var filterVal = $target.attr('href').slice(1).toLowerCase();

				$item.each(function () {
					if (!$(this).is('[data-cat*=' + filterVal + ']')) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
			}
		}, this));
	};

	$.fn.mixFilter = function ( options ) {
		return this.each(function () {
			new MixFilter( this, options );
		});
	};

})( jQuery, window, document );

/*
 * Gall custom script
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		toggleLink: 'js-showall',
		toggleList: 'js-galllist',
		gallControls: 'js-controls',
		gallCurrent: 'js-controlsCur',
		gallTotal: 'js-controlsTot',
		gallPrev: 'js-controlsPrev',
		gallNext: 'js-controlsNext',
		openList: 'is-open'
	};

	function GallJs( element, options ) {
		this.options = $.extend( {}, defaults, options) ;
		this.element = element;
		this.init();
	}

	GallJs.prototype.init = function () {
		var $this = $(this.element),
			$toggleLink = $this.find('.' + this.options.toggleLink),
			$toggleList = $this.find('.' + this.options.toggleList),
			$gallControls = $this.find('.' + this.options.gallControls),
			$gallCurrent = $this.find('.' + this.options.gallCurrent),
			$gallTotal = $this.find('.' + this.options.gallTotal),
			$gallPrev = $this.find('.' + this.options.gallPrev),
			$gallNext = $this.find('.' + this.options.gallNext);


		$toggleLink.on('click', $.proxy(function(e){
			e.preventDefault();
			var $link = $($(e.target));

			if(!$this.hasClass(this.options.openList)){
				$link.text('Свернуть');
				$toggleList.add($this).addClass(this.options.openList);
				$gallControls.hide();
			} else {
				$link.text('Показать всех');
				$toggleList.add($this).removeClass(this.options.openList);
				$gallControls.show();

			}

		}, this));
	};

	$.fn.gallJs = function ( options ) {
		return this.each(function () {
			new GallJs( this, options );
		});
	};

})( jQuery, window, document );

/*
 * navigation script: open / clos navbar, add bg onscroll
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
	    topnav: 'js-topnav',
	    topnavBtn: 'js-topnavBtn',
	    navOpen: 'js-navOpen',
	    navClose: 'js-navClose',
	    jsNoBg: 'js-NoBg',
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
	    	$jsNoBg = $('.' + this.options.jsNoBg),
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
				windowHeight = $(window).height(),
				sectPos = $jsNoBg.offset().top,
				sectHeight = $jsNoBg.height();

			// Show topnav button, damn it, that's shame
			if (windowPos < windowHeight || (windowPos > sectPos && windowPos < sectPos + sectHeight)) {
				$topnav.removeClass(this.options.isBg);
				$topnavBtn.removeClass(this.options.isVisible);
			} else if (windowPos > windowHeight){
				$topnav.addClass(this.options.isBg);
				$topnavBtn.addClass(this.options.isVisible);
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
 * toggle content and popups
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		toggleLink: 'js-togglelink',
		toggleBg: 'js-togglebg',
		toggleCorner: 'js-togglecorner',
		toggleTarget: 'js-toggletarget',
		togglePopup: 'js-togglepopup',
		toggleClose: 'js-toggleclose',
		activeContent: 'is-visible',
		activeLink: 'is-active',
		asideCorner: 'is-corner'
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
			$togglePopup = $this.find('.' + this.options.togglePopup),
			$toggleClose = $this.find('.' + this.options.toggleClose),
			$toggleCorner = $this.find('.' + this.options.toggleCorner);


		$toggleLink.on('click', $.proxy(function(e){
			e.preventDefault();

			var catchLink = e.target;

			// Deal with images inside links... catch the link!
			while (catchLink && catchLink.nodeName !== 'A') {
			    catchLink = catchLink.parentNode;
			}
			if (catchLink) {
				var $current = $(catchLink),
					targetCheck = $current.attr('href'),
					$target = $($current.attr('href'));

				// Check what we want to toggle: popup or link target
				if($target.hasClass(this.options.togglePopup)){

					// And if this is popup - then toggle it
					$togglePopup.fadeOut().removeClass(this.options.activeContent);
					$target.fadeIn().addClass(this.options.activeContent);
				} else {
					// here we have a deal with link target so we should work also with links
					// Disable actions with selected item
					if (!$current.hasClass(this.options.activeLink)) {

						// Check for target page
						if(targetCheck !== '#all') {

							// Hide all targets and remove highlight from links
							$toggleLink.removeClass(this.options.activeLink);
							$toggleTarget.fadeOut().removeClass(this.options.activeContent);

							// Change background
							if($current.hasClass(this.options.toggleBg)) {
								var bgName = catchLink.hash.slice(1)
								$this.removeClass(removeClass)
								$this.addClass('screen_bg_' + bgName)
								// Add corner
								if(!$toggleCorner.hasClass(this.options.asideCorner)) {
									$toggleCorner.addClass('is-corner');
								}
							} else {
								$this.removeClass(removeClass)
								$this.addClass('screen_bg_none')
								// Remove corner
								if($toggleCorner.hasClass(this.options.asideCorner)) {
									$toggleCorner.removeClass('is-corner');
								}
							}

							// Show targets and highlight active link
							$current.addClass(this.options.activeLink);
							$target.fadeIn().addClass(this.options.activeContent);
						} else {
							// Show all
							$toggleLink.removeClass(this.options.activeLink);
							$current.addClass(this.options.activeLink);
							$toggleTarget.removeAttr('style').removeClass(this.options.activeContent);
							// Remove background
							$this.removeClass(removeClass).end().addClass('screen_bg_none')
							// Remove corner
							if($toggleCorner.hasClass(this.options.asideCorner)) {
								$toggleCorner.removeClass('is-corner');
							}
						}
					}
				}
			}
		}, this));

		$toggleClose.on('click', $.proxy(function(e){
			e.preventDefault();
			$togglePopup.fadeOut().removeClass(this.options.activeContent);
		}, this));
	};

	$.fn.toggleContent = function ( options ) {
		return this.each(function () {
			new ToggleContent( this, options );
		});
	};

})( jQuery, window, document );

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
