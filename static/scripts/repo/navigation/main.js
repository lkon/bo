define([
	'jquery'
], function(
	$
) {

	var $nav
	  , $navTabs
	  ;

	function init () {
		updateVars();
		activate();
		bindEvets();
	}

	function updateVars () {
		$nav = $('.navbar .nav');
		$navTabs = $nav.find('li');
	}


	function activate (){
		var types = $navTabs.map(function( index, element ){
			return $(element).attr('data-item')
		})
		  , i = 0
		  , len = types.length
		  , contentExists
		  ;

		for (; i < len; i++) {
			contentExists = $( "." + types[i] );
			if( contentExists ){
				$navTabs.filter(function(index){
				    return $(this).attr( 'data-item' ) == contentExists.attr('class');
				  }).addClass( 'active' );
			}
		}
	}

	function bindEvets () {
		$navTabs.click(change);
	}

	function change (e) {
		var tabName = $(this).attr('data-item')
		  , $nextTab = $('.tab.' + tabName)
		  ;

		$navTabs.removeClass('active');
		$(this).addClass('active');

		$tabs.removeClass('active');
		$nextTab.addClass('active');
	}


	return {
		init: init
	};

});
