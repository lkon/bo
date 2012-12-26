jQuery(document).ready(function($) {
    $('.input-append').datepicker();
    $('.tags').tagsInput();

    openPopUp.init();

    var Datepicker = Datepicker || {};

    Datepicker.prototype = {};

    Datepicker.prototype.place = function(){
		var offset = this.component ? this.component.offset() : this.element.offset()
		  , DIM_X = 195;
		this.picker.css({
			top: offset.top + this.height,
			left: offset.left - DIM_X
		});
	};
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
      ;

    function init () {
        updateVars();
        bindEvents();
    }

    function updateVars () {
        $overlay = $( '.js-overlay' );
        $popup = $( '.js-popup' );
        $exit = $popup.find( '.js-exit' );
        $btnShow = $( '.js-show-popup' );
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

        $btnShow.live( 'click', function(){
        	var data = positioning( this );
	    	showPopup( data.$popup, data.pos );
        });

        $exit.live( 'click', hidePopup );
        $overlay.live( 'click', hidePopup );


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

    /**
     * Проводит измерение пространства для правильного отображения popup
     * @param  {Element} ob - i.info.js-show-popup
     * @private
     */
	function positioning ( ob ){
		var isTopic = $( ob ).closest( 'tr' ).length
	      , popupName = $( ob ).attr( 'data-popup' ) || false
	      , $popup
	      , popupHeight
	      , popupWidth
	      , windowHeigth = $( 'body' ).height()
	      , windowWidth = $( 'body' ).width()
	      , MOBILE_WIDTH = 600
	      , MOBILE_HEIGHT = 480
	      , pos = {}
	      , updateLocalVar = function( popupObject ){
	            popupHeight = popupObject.height();
	            popupWidth = popupObject.width();
	      };

	    if ( isTopic ) {
	   		$popup = $(ob).closest('td').find('.' + popupName);
	    } else {
	   		$popup = $(ob).siblings('.js-popup');
	    }

	    updateLocalVar( $popup );

        if ( windowWidth < MOBILE_WIDTH
		  || windowHeigth < MOBILE_HEIGHT ){
			  pos = {
			  	top: 25
			  	,right: 5
			  	,left: 5
			  };
		} else {
			pos = {
				left: ( windowWidth - popupWidth )/2
				,top: ( windowHeigth - popupHeight )/2
			};
		}

	    $(ob).addClass('active');
	    $(ob).parent().addClass('active');

	    return {
	    	  $popup: $popup
	    	, pos: pos
	    };
	}

    /**
     * Показывает переданный popup и скрывает все остальные
     * @param popup {Jquery}
     * @private
     */
    function showPopup ( $popup, pos ) {
        $overlay.show();

        if ( pos.right ){
	        $popup.css({
	              'top': pos.top
	            , 'right': pos.right
	            , 'left': pos.left
	            , 'width': 'auto'
	        }).show()
	        .find( '.description-form' ).css( 'width', 'auto' );
        } else {
	        $popup.css({
	              'top': pos.top
	            , 'left': pos.left
	        }).show();
        }
        $popup.addClass('active');
    }

    /**
     * Скрывает переданный popup и скрывает все остальные
     * @private
     */
    function hidePopup (e) {
        e.preventDefault();

        $overlay.hide();
        $popup.hide();
        $btnShow.add( '.tools' ).removeClass('active');
    }

    return{
        init: init
    };
})();

var topNav = (function () {

    var $nav
      , $navTabs
      , $tabs;

    function init () {
        updateVars();
        bindEvets();
    }

    function updateVars () {
        $nav = $('.navbar .nav');
        $navTabs = $nav.find('li');
        $tabs = $('.tab');
    }

    function bindEvets () {
        $navTabs.click(change);
    }

    function change (e) {
        var tabName = $(this).attr('data-item')
          , $nextTab = $('.tab.' + tabName)
          ;

        e.preventDefault();

        $navTabs.removeClass('active');
        $(this).addClass('active');

        $tabs.removeClass('active');
        $nextTab.addClass('active');
    }

    return{
        init: init
    };
})();