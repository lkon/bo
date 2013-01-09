define([
	'jquery'
], function(
	$
) {

	var $navTabs
	  ;

	function init () {
		updateVars();
		activate();
		bindEvets();
	}

	function updateVars () {
		$navTabs = $('.navbar .nav li');
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
				$navTabs.filter(function( index ){
				    return $( this ).attr( 'data-item' ) === contentExists.attr( 'class' );
				  }).addClass( 'active' );
			}
		}
	}

	function bindEvets () {
		$navTabs.click( change );
	}

	function change () {
		$navTabs.removeClass( 'active' );
		$(this).addClass( 'active' );
	}

	return {
		init: init
	};

});
