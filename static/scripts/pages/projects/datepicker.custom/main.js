define([
	'jquery'
  , 'datepicker'
], function(
	$
) {
	var $calendar

	function init () {
		updateVars();
		bindEvets();
	}

	function updateVars () {
		$calendar = $( '.input-append' );

		$.fn.datepicker.Constructor.prototype.place = function(){
			var offset = this.component ? this.component.offset() : this.element.offset()
			  , DIM_X = 195;
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left - DIM_X
			});
		};
	}

	function bindEvets () {
		$calendar.datepicker();
	}

    return {
		init: init
    };

});