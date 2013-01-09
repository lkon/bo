jQuery(document).ready(function($) {
    openPopUp.init();
});

var openPopUp = (function  () {

    var $popup
      , $popupWrap
      , $exit
      , $overlay

      , $ico
      , $btnShow
      , $btnLock
      , $btnUnlock
      , $btnDelete

      , $btnDeleteAtAll
      , $btnAccess

      , $btnToggleBlockedTopics
      , $btnToggleDeletedTopics

      , $topicDataTable

      , $popupConfirmDelete
      , $popupConfirmChange
      , SHOW = 'Показать'
      , HIDE = 'Скрыть'

      , $sort
      ;

    function init () {
        updateVars();
        bindEvents();
    }

    function updateVars () {
        $popup = $( '.js-popup' );
        $btnLock = $( '.js-blocked-data' );
        $btnUnlock = $( '.js-unlocked-data' );
        $btnDelete = $( '.js-topic-data-table .js-deleted-data' );

        $btnDeleteAtAll = $( '.js-user-data-table .js-deleted-data' );
		$btnAccess = $( '.js-access' );

        $btnToggleBlockedTopics = $( '.js-toggle-blocked-topics' );
        $btnToggleDeletedTopics = $( '.js-toggle-deleted-topics' );

        $topicDataTable = $( '.js-topic-data-table' );

        $popupConfirmDelete = $( '.js-popup-confirm-delete' );
        $popupConfirmChange = $( '.js-popup-confirm-change' );
    }

    function bindEvents () {

    	$btnDelete.live( 'click', deleteTopic );
        $btnLock.live( 'click', blockTopic );
    	$btnUnlock.hide()
    	          .live( 'click', unlockTopic );

		$btnToggleBlockedTopics.toggle( showBlockedTopics, hideBlockedTopics )
								.hide();
		$btnToggleDeletedTopics.toggle( showDeletedTopics, hideDeletedTopics )
								.hide();

    	$btnDeleteAtAll.live( 'click', confirmUser );
		$btnAccess.live( 'click' , confirmUser );
    }

    function deleteTopic(){
    	$( this ).closest( 'tr' ).addClass( 'data-deleted' ).hide()
	    						.find( '.num' ).removeClass( 'num' ).text('')
	    	                    .end().find( '.tools' ).remove();
		renumeration();
		$btnToggleDeletedTopics.show()
								.find( '.action' ).text( SHOW );
    }

    function blockTopic(){
    	$( this ).hide()
		    	.siblings().each( function( i, el ){
					if( $( el ).hasClass( 'js-show-popup' ) ){
						$( el ).hide();
					} else if ( $( el ).hasClass( 'js-unlocked-data' ) ){
						$( el ).show();
					}
				})
				.end().closest( 'tr' ).addClass( 'data-blocked' ).hide()
		    						  .find( '.num' ).removeClass( 'num' ).text('');
		renumeration();
		$btnToggleBlockedTopics.show()
								.find( '.action' ).text( SHOW );
    }

    function unlockTopic (){
    	var blockedNotExist;

    	$( this ).hide()
    			.siblings().each(function( i, el ){
					if( $( el ).hasClass( 'js-show-popup' ) ){
						$( el ).show();
					} else if ( $( el ).hasClass( 'js-blocked-data' ) ){
						$( el ).show();
					}
				})
				.end().closest( 'tr' ).removeClass( 'data-blocked' )
				.find( 'td:first' ).addClass( 'num' );

		blockedNotExist = $topicDataTable.find( '.data-blocked' ).length;

		if ( !blockedNotExist ){
			$btnToggleBlockedTopics.hide()
									.find( '.action' ).text( SHOW );
		}

		renumeration();
    }

    function showBlockedTopics (){
		var blocked = $topicDataTable.find( '.data-blocked' );

		if ( blocked.length ){
			blocked.show();
			$btnToggleBlockedTopics.find( '.action' ).text( HIDE );
		} else {
			return false;
		}
    }

	function hideBlockedTopics (){
		$topicDataTable.find( '.data-blocked' ).hide();
		$btnToggleBlockedTopics.find( '.action' ).text( SHOW );
    }

    function showDeletedTopics (){
		$topicDataTable.find( '.data-deleted' ).show();
		$btnToggleDeletedTopics.find( '.action' ).text( HIDE );
    }

    function hideDeletedTopics (){
		$topicDataTable.find( '.data-deleted' ).hide();
		$btnToggleDeletedTopics.find( '.action' ).text( SHOW );
    }

    function confirmUser (){

    	var $btn = $( this )
    	  , $popup
    	  , overlay = $( '.js-overlay' )
	      , windowHeigth = $( 'body' ).height()
	      , windowWidth = $( 'body' ).width()
	      , confirmHandle
    	  ;

    	if ( $btn.hasClass( 'js-deleted-data' ) ){
    		$popup = $( '.js-popup-confirm-delete' );
    		confirmHandle = deleteDataAtAll;
    	} else if ( $btn.hasClass( 'js-access' ) ){
    		$popup = $( '.js-popup-confirm-change' );
    		confirmHandle = toggleAccess;
    	}

    	overlay.show();

		$popup.show()
			.css({
				 top: ( windowHeigth - $popup.height() )/2
				,left: ( windowWidth - $popup.width() )/2
			})
			.find( '.js-submit-yes' ).live( 'click', function(  ){
				overlay.hide();
				$popup.hide();
				confirmHandle( $btn );
			})
			.end()
			.find( '.js-submit-no' ).live( 'click', function(  ){
				overlay.hide();
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

    			renumeration();
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

    function renumeration (){
    	var $cells = $( '.num' )
    	  , len = $cells.length
    	  ;

    	for (var i = 0; i < len; i++) {
    		$( $cells.get(i) ).text( i + 1 );
    	}
    }



    return{
        init: init
    };
})();

