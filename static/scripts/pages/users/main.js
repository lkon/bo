define([
	'jquery'
  , 'repo/navigation/main'
  , 'repo/data-popup/main'
], function(
	$
  , navigation
  , popup
) {

	function init () {
		navigation.init();
	    popup.init();

		updateVars();
		bindEvets();
	}

	function updateVars () {

	}

	function bindEvets () {

	}

    return {
		init: init
    };

});