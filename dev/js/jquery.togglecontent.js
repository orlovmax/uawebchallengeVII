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
