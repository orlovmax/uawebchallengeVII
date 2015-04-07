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
