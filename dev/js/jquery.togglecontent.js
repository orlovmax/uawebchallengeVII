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
