define([
	'jquery'
  , 'repo/renumeration/main'
], function(
	$
  , renumeration
) {
	var $btnDeleteAtAll
	  , $btnAccess
      , $overlay
      ;

	function init () {
		updateVars();
		bindEvets();
	}

	function updateVars () {
        $btnDeleteAtAll = $( '.js-user-data-table .js-deleted-data' );
		$btnAccess = $( '.js-access' );
        $overlay = $( '.js-overlay' );
	}

	function bindEvets () {
    	$btnDeleteAtAll.live( 'click', confirmUser );
		$btnAccess.live( 'click' , confirmUser );
	}

	function confirmUser (){

    	var $btn = $( this )
	      , windowHeigth = $( 'body' ).height()
	      , windowWidth = $( 'body' ).width()
    	  , $popup
	      , confirmHandle
    	  ;

    	if ( $btn.hasClass( 'js-deleted-data' ) ){
    		$popup = $( '.js-popup-confirm-delete' );
    		confirmHandle = deleteDataAtAll;
    	} else if ( $btn.hasClass( 'js-access' ) ){
    		$popup = $( '.js-popup-confirm-change' );
    		confirmHandle = toggleAccess;
    	}

    	$overlay.show();

		$popup.show()
			.css({
				 top: ( windowHeigth - $popup.height() )/2
				,left: ( windowWidth - $popup.width() )/2
			})
			.find( '.js-submit-yes' ).live( 'click', function(  ){
				$overlay.hide();
				$popup.hide();
				confirmHandle( $btn );
			})
			.end()
			.find( '.js-submit-no' ).live( 'click', function(  ){
				$overlay.hide();
				$popup.hide();
				return false;
			});
    }

    function deleteDataAtAll ( $btn ){
    	var first = $btn.closest( 'tr' ).hasClass( 'group' )
    	  , fio
    	  , last
    	  , data
    	  ;

		if ( first ){
			fio = $btn.closest( 'td' ).hasClass( 'content-table' );
			if ( fio ){
    			$btn.closest( 'tr' )
	    			.nextUntil(".group, .last").remove()
	    			.end().remove();

    			renumeration.init();
			} else {
				last = ( $btn.closest( 'tr' ).next( 'tr' ).hasClass( 'group' ) || $btn.closest( 'tr' ).next( 'tr' ).hasClass( 'last' ) ) ? true : false;
				data = $btn.closest( 'tr' ).next( 'tr' ).children( 'td' );
				if ( last ){
				  	$btn.closest( 'td' ).empty()
				  	    .next( 'td' ).empty();
				} else {
					$btn.closest( 'tr' ).children( 'td' ).each(function( index, el ){
						if ( index !== 0
						  && index !== 1){
							$(el).html( $( data[ index ] ).html() );
						}
					})
					.end().next( 'tr' ).remove();
				}
			}
    	} else {
    		$btn.closest( 'tr' ).remove();
    	}
  		/*плюс ajax-запрос на сервер об удалении*/
    }

    function toggleAccess ( $btn ){
    	var admin = $( '#admin' ).html()
    	  , moder = $( '#moder' ).html()
    	  ;

    	$btn.die( 'click' );

		if ( $btn.hasClass( 'high' ) ){
			$btn.closest( 'td' ).html( moder )
			    .find( '.ico' ).addClass( 'js-access' );

		} else if ( $btn.hasClass( 'low' ) ){
			$btn.closest( 'td' ).html( admin )
			    .find( '.ico' ).addClass( 'js-access' );
		}
		/*плюс ajax-запрос на сервер об изменении статуса*/
    }

    return {
		init: init
    };

});