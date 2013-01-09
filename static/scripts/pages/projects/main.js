define([
	'jquery'
  , 'tagsinput'
  ,	'tablesorter'
  , 'repo/navigation/main'
  , './datepicker.custom/main'
  , './data-popup/main'
], function(
	$
  ,	tagsinput
  , tablesorter
  , navigation
  , datepicker
  , popup
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