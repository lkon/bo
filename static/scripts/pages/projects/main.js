define([
	'jquery'
  , 'tagsinput'
  ,	'tablesorter'
  , 'repo/navigation/main'
  , 'repo/data-popup/main'
  , './datepicker.custom/main'
], function(
	$
  ,	tagsinput
  , tablesorter
  , navigation
  , popup
  , datepicker
) {

	function init () {
	    $( '.tags' ).tagsInput();
	    $( '.js-topic-data-table' ).tablesorter();
		navigation.init();
	    datepicker.init();
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