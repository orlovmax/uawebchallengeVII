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
