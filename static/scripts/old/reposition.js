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



        $btnToggleBlockedTopics = $( '.js-toggle-blocked-topics' );
        $btnToggleDeletedTopics = $( '.js-toggle-deleted-topics' );

        $topicDataTable = $( '.js-topic-data-table' );


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





    return{
        init: init
    };
})();

