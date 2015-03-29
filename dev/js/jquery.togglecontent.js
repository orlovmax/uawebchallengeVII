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
