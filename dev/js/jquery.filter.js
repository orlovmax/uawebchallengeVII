/*
 * filter script to 'mix' items
*/

;(function ( $, window, document, undefined ) {
	var defaults = {
		item: 'js-filterItem',
		itemHidden: 'is-hidden',
		filterLink: 'js-filterlink',
		filterSelected: 'is-active',
		toggleLink: 'js-showall',
		toggleList: 'js-galllist',
		openList: 'is-open',
		gallControls: 'js-controls',
		gallCurrent: 'js-counterCur',
		gallTotal: 'js-counterTot',
		gallPrev: 'js-controlsPrev',
		gallNext: 'js-controlsNext'
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
			$filterSelected = $('.' + this.options.filterSelected),
			$toggleLink = $this.find('.' + this.options.toggleLink),
			$toggleList = $this.find('.' + this.options.toggleList),
			$gallControls = $this.find('.' + this.options.gallControls),
			$gallCurrent = $gallControls.find('.' + this.options.gallCurrent),
			$gallTotal = $gallControls.find('.' + this.options.gallTotal),
			$gallPrev = $gallControls.find('.' + this.options.gallPrev),
			$gallNext = $gallControls.find('.' + this.options.gallNext);

		// Total count of speakers in gallery
		$gallTotal.text($item.length);

		// Sort speakers by category
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

				// Hide toggle link when number of speakers in a row is shorter than 6
				// Yep, this is magick number and my shame...
				if ($item.filter(':visible').length <= 6){
					$toggleLink.hide();
				} else {
					$toggleLink.show();
				}
			}

			// Set total count of chosen filtered items
			$gallTotal.text($item.filter(':visible').length);
		}, this));

		// Show all speakers or hde them
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

	$.fn.mixFilter = function ( options ) {
		return this.each(function () {
			new MixFilter( this, options );
		});
	};

})( jQuery, window, document );
