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
 * filter script to 'mix' items
*/

;(function ( $, window, document, undefined ) {
    var defaults = {
        item: "js-filteritem",
        itemHidden: "is-hidden",
        filterLink: "js-filterlink",
        filterSelected: "is-active"
    };

    function MixFilter( element, options ) {
        this.options = $.extend( {}, defaults, options) ;
        this.element = element;
        this.init();
    }

    MixFilter.prototype.init = function () {
        var $this = $(this.element),
            $item = $this.find("." + this.options.item),
            $itemHidden = $("." + this.options.itemHidden),
            $filterLink = $this.find("." + this.options.filterLink),
            $filterSelected = $("." + this.options.filterSelected);

        $filterLink.on('click', $.proxy(function(e){
        	e.preventDefault();
			var $target = $($(e.target));

	        if (!$target.hasClass(this.options.filterSelected)) {
				$filterLink.removeClass(this.options.filterSelected);
				$target.addClass(this.options.filterSelected);
	        	var filterVal = $target.data("filter").toLowerCase();

	        	$item.each(function () {
					var itemVal = $(this).data("cat").toLowerCase();
					if (!$(this).is("[data-cat*=" + filterVal + "]")) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
	        }
        	return false;
        }, this));
    };

    $.fn.mixFilter = function ( options ) {
        return this.each(function () {
            new MixFilter( this, options );
        });
    };

})( jQuery, window, document );

$(".js-portfolio").mixFilter();

/*
 * Gall custom script
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		toggleLink: 'js-showall',
		toggleList: 'js-galllist',
		gallControls: 'js-controls',
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
			$gallControls = $this.find('.' + this.options.gallControls);


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

				// Disable actions with selected item
				if (!$current.hasClass(this.options.activeLink)) {

					// Check for target page
					if(targetCheck !== '#all') {

						// Hide all targets and remove highlight from links
						$toggleLink.removeClass(this.options.activeLink);

						// Check what we want to toggle: page or popup
						if($target.hasClass(this.options.toggleTarget)) {
							$toggleTarget.fadeOut().removeClass(this.options.activeContent);

							// Change background
							if($current.hasClass(this.options.toggleBg)) {
								var bgName = catchLink.hash.slice(1)
								$this.removeClass(removeClass)
								$this.addClass('screen_bg_' + bgName)
								// Add corner
								if($toggleCorner) {
									$toggleCorner.addClass('is-corner');
								}
							} else {
								$this.removeClass(removeClass)
								$this.addClass('screen_bg_none')
								// Remove corner
								if($toggleCorner) {
									$toggleCorner.removeClass('is-corner');
								}
							}
						} else {
							$togglePopup.fadeOut().removeClass(this.options.activeContent);
						}

						// Show targets and highlight active link
						$current.addClass(this.options.activeLink);
						$target.fadeIn().addClass(this.options.activeContent);
					} else {
						// Show all
						$current.addClass(this.options.activeLink);
						$toggleLink.removeClass(this.options.activeLink);
						$toggleTarget.fadeIn().removeClass(this.options.activeContent);

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
