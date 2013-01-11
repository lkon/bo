define([
	'jquery'
], function(
	$
) {
	var $cells;

	function init () {
		updateVars();
		recount();
	}

	function updateVars () {
		$cells = $( '.num' );
	}

	function recount () {
		var i = 0
		  , len = $cells.length
		  ;

		for (; i < len; i++) {
    		$( $cells.get(i) ).text( i + 1 );
    	}
	}

    return {
		init: init
    };

});