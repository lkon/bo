define([
	'jquery'
  , 'repo/navigation/main'
  , 'repo/data-popup/main'
  , './confirm/main'
], function(
	$
  , navigation
  , popup
  , confirm
) {

	function init () {
		navigation.init();
	    popup.init();
		confirm.init();

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