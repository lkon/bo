define([
	'jquery'
  , 'tagsinput'
  ,	'tablesorter'
  , './datepicker.custom/main'
  , 'repo/navigation/main'

], function(
	$
  ,	tagsinput
  , tablesorter
  , datepicker
  , navigation
) {

	function init () {
	    $( '.tags' ).tagsInput();
	    $( '.js-topic-data-table' ).tablesorter();
	    datepicker.init();
		navigation.init();
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