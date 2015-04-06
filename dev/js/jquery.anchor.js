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
