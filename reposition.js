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

      , $btnAccess
      , $btnHideLockProjects
      , $btnShowLockUsers
      , $userDataTable
      , INDENT_X = 37
      , INDENT_Y = 20

      , $popupConfirmDelete
      , $popupConfirmChange;

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

        $btnDelete = $( '.js-deleted-data' );


		$btnAccess = $( '.js-access' );
        $btnHideLockProjects = $( '.js-hide-blocked-projects' );
        $btnShowLockUsers = $( '.js-show-blocked-users' );
        $userDataTable = $( '.js-user-data-table' );

        $popupConfirmDelete = $( '.js-popup-confirm-delete' );
        $popupConfirmChange = $( '.js-popup-confirm-change' );
    }

    function bindEvents () {

        $btnShow.live( 'click', function(){
        	var res = measure( this );
	    	show( res.popup, res.pos );
        });

        $exit.live( 'click', hide);
        $overlay.live( 'click', hide);

        $btnLock.live( 'click', function(){
			banData( this );
        });

    	$btnUnlock.hide()
    	          .live( 'click', function(){
					 allowData( this );
    	          });

    	$btnDelete.live( 'click', function(){
    		deleteData( this );
    	});

		$btnAccess.live( 'click' , function(){
			toggleAccess( this );
		});

		$btnHideLockProjects.live( 'click',  hideLockedProjects);

		$btnShowLockUsers.live( 'click',  showLockedUsers);
    }

    function deleteData( btn ){
    	var first = $( btn ).closest( 'tr' ).hasClass( 'group' )
    	  , fio
    	  , confirm = confirmUser( $popupConfirmDelete );

		if ( confirm ){
	    	if ( first ){
				fio = $( btn ).closest( 'td' ).hasClass( 'content-table' );

				if ( fio ){
	    			$( btn ).closest( 'tr' )
	    			.nextAll( 'tr' ).each(function( index, el ){
	    				if ( $( el ).hasClass( 'group' )
	    				  || $( el ).hasClass( 'last' ) ){
	    					return false;
	    				} else {
	    					 $( el ).remove();
	    				}
	    			})
	    			.end().remove();
				} else {

				}
	    	} else {
	    		$( btn ).closest( 'tr' ).remove();
	    	}
		  /*плюс ajax-запрос на сервер об удалении*/
		} else {
			return false;
		}
    }

    function confirmUser( $popup ){
    	var confirm = false;

		$popup.show()
		.find( '.js-submit-yes' ).live( 'click', function(  ){
			confirm = true;
		})
		.end()
		.find( '.js-submit-no' ).live( 'click', function(  ){
			confirm = false;
		});

		return confirm;
    }

    function hideLockedProjects(  ){
    	$userDataTable.find( 'td.data-blocked' ).closest( 'tr' ).each( function( index, el ){
    		if ( $( el ).hasClass( 'group' ) ){

    		} else {
    			$( el ).hide();
    		}
    	});
    }

    function showLockedUsers (  ){
		$userDataTable.find( 'td.data-blocked' ).closest( 'tr' ).each( function( index, el ){
    		if ( $( el ).hasClass( 'group' ) ){

    		} else {
    			$( el ).show();
    		}
    	});
    }

    function banData ( btnLock ){
    	var $btnLock = $( btnLock )
    	  , groupEnd = false;

    	$btnLock.siblings().each(function( i, el ){
			if( $( el ).hasClass( 'js-show-popup' ) ){
				$( el ).hide();
			} else if ( $( el ).hasClass( 'js-unlocked-data' ) ){
				$( el ).show();
			}
		})
		.end().closest( 'td' ).addClass( 'data-blocked' );


    	if ( $btnLock.closest( 'td' ).hasClass( 'content-table' )
    	  && $btnLock.closest( 'tr' ).hasClass( 'group' ) ){

			$btnLock.closest( 'tr' ).addClass( 'data-blocked' )
					.nextAll( 'tr' ).each(function( i, el ){

						if ( !$( el ).hasClass( 'group' )
						  && !$( el ).hasClass( 'last' )
						  && !groupEnd){

							$( el ).addClass( 'data-blocked' )
							       .find( '.tools' ).addClass( 'tools-blocked' );
						} else {
							groupEnd = true;
						}
					})
					.end()
					.find( '.tools' ).each(function( i, el ){
						if ( !$( el ).closest( 'td' ).hasClass( 'content-table' ) ){
							$( el ).addClass( 'tools-blocked' );
						}
					});

    	} else {
			$btnLock.closest( 'td' ).siblings().each( function( i, el ){
				if( !$( el ).hasClass( 'content-table' )
				 && !$( el ).hasClass( 'num' )){
					$( el ).addClass( 'data-blocked' )
					       .find( '.tools' ).addClass( 'tools-blocked' );
				}
			});
    	}

		$btnLock.hide();
    }

    function allowData ( btnUnlock ){
    	var $btnUnlock = $( btnUnlock )
    	  , groupEnd = false;

    	$btnUnlock.siblings().each(function( i, el ){
			if( $( el ).hasClass( 'js-show-popup' ) ){
				$( el ).show();
			} else if ( $( el ).hasClass( 'js-blocked-data' ) ){
				$( el ).show();
			}
		})
		.end().closest( 'td' ).removeClass( 'data-blocked' );

		if ( $btnUnlock.closest( 'td' ).hasClass( 'content-table' )
    	  && $btnUnlock.closest( 'tr' ).hasClass( 'group' ) ){

			$btnUnlock.closest( 'tr' ).removeClass( 'data-blocked' )
					.nextAll( 'tr' ).each(function( i, el ){

						if ( !$( el ).hasClass( 'group' )
						  && !$( el ).hasClass( 'last' )
						  && !groupEnd){

							$( el ).removeClass( 'data-blocked' )
							       .find( '.tools' ).removeClass( 'tools-blocked' );
						} else {
							groupEnd = true;
						}
					})
					.end()
					.find( '.tools' ).each(function( i, el ){
						if ( !$( el ).closest( 'td' ).hasClass( 'content-table' ) ){
							$( el ).removeClass( 'tools-blocked' );
						}
					});

    	} else {
			$btnUnlock.closest( 'td' ).siblings().each( function( i, el ){
				if( !$( el ).hasClass( 'content-table' )
				 && !$( el ).hasClass( 'num' )){
					$( el ).removeClass( 'data-blocked' )
					       .find( '.tools' ).removeClass( 'tools-blocked' );
				}
			});
    	}

		$btnUnlock.hide();
    }

    function toggleAccess( btnAccess ){
    	var ADMIN = 'Администратор'
    	  , MODERATOR ='Модератор'
    	  , $btnAccess = $( btnAccess );

		if ( $btnAccess.hasClass( 'high' ) ){
			$btnAccess.removeClass( 'high' )
					  .addClass( 'low' )
					  .closest('td').get(0).firstChild.data = MODERATOR;

		} else if ( $btnAccess.hasClass( 'low' ) ){
			$btnAccess.removeClass( 'low' )
					  .addClass( 'high' )
					  .closest('td').get(0).firstChild.data = ADMIN;
		}
    }
    /**
     * Проводит измерение пространства для правильного отображения popup
     * @param  {Element} ob - i.info.js-show-popup
     * @private
     */
    function measure (ob){
		var isTopic = $(ob).closest('tr').length
	      , popupName = $(ob).attr('data-popup') || false
	      , $popup
	      , $arr
	      , popupHeight
	      , popupWidth
	      , windowHeigth = $( 'body' ).height()
	      , windowWidth = $( 'body' ).width()
	      , MOBILE_WIDTH = 600
	      , MOBILE_HEIGHT = 400
	      , dX
	      , dY
	      , INDENT = 50
	      , pos = {}
	      , updateLocalVar = function( popupObject ){
	          	$arr = popupObject.find('.arr');
	            popupHeight = popupObject.height();
	            popupWidth = popupObject.width();
	            dX = Math.floor( windowWidth - $(ob).offset().left - popupWidth - INDENT );
	            dY = Math.floor( windowHeigth - $(ob).offset().top - popupHeight - INDENT );
	      };

	    if ( isTopic ) {
	   		$popup = $(ob).closest('td').find('.' + popupName);
	   		updateLocalVar( $popup );

	        if ( windowWidth < MOBILE_WIDTH
			  || windowHeigth < MOBILE_HEIGHT
			  || ($(ob).offset().left + INDENT) < popupWidth
			){
				pos = {
					top: ( windowHeigth - popupHeight ) / 2 - INDENT_Y,
					left: ( windowWidth - popupWidth ) / 2 + INDENT_X
				};
		    } else if ( dX > 0 ){
				if ( dY > 0 ){
					$arr.addClass( 'arr-up arr-front' );
					pos = {
	                      top: $(ob).position().top + $(ob).height() + $(this).parent().position().top
	                    , left: $(this).position().left + $(this).parent().position().left
	                };
				} else{
					$arr.addClass( 'arr-down arr-front' );
					pos = {
	                      top: - ( $(ob).position().top + $(ob).height() + $(ob).parent().position().top + popupHeight + INDENT )
	                    , left: $(ob).position().left + $(ob).parent().position().left
	                };
				}
			} else {
				if ( dY > 0 ){
					$arr.addClass( 'arr-up arr-back' );
					pos = {
	                      top: $(ob).position().top + $(ob).height() + $(ob).parent().position().top
	                    , left: ( $(ob).position().left + $(ob).parent().position().left + INDENT ) - popupWidth
	                };
				} else{
					$arr.addClass( 'arr-down arr-back' );
					pos = {
	                      top: - ( $(ob).position().top + $(ob).height() + $(ob).parent().position().top/* + popupHeight + INDENT*/ )
	                    , left: ( $(ob).position().left + $(ob).parent().position().left + INDENT )  - popupWidth
	                };
				}
			}

	    } else {
	   		$popup = $(ob).siblings('.js-popup');
	        updateLocalVar( $popup );

	        if ( windowWidth < MOBILE_WIDTH
			  || windowHeigth < MOBILE_HEIGHT
			  || ($(ob).offset().left + INDENT) < popupWidth
			){
				pos = {
					top: ( windowHeigth - popupHeight ) / 2 - INDENT_Y,
					left: ( windowWidth - popupWidth ) / 2 + INDENT_X
				};

		    } else if ( dX > 0 ){
				if ( dY > 0 ){
					$arr.addClass( 'arr-up arr-front' );
					pos = {
	                      top: $(ob).offset().top + $(ob).height()
	            		, left: $(ob).offset().left
	                };
				} else{
					$arr.addClass( 'arr-down arr-front' );
					pos = {
	                      top: - ( $(ob).offset().top + $(ob).height() + popupHeight + INDENT )
	            		, left: $(ob).offset().left
	                };
				}
			} else {
				if ( dY > 0 ){
					$arr.addClass( 'arr-up arr-back' );
					pos = {
	                      top: $(ob).offset().top + $(ob).height()
	            		, left: ( $(ob).offset().left + INDENT ) - popupWidth
	                };
				} else{
					$arr.addClass( 'arr-up arr-back' );
					pos = {
	                      top:  $(ob).offset().top + $(ob).height() /* + popupHeight + INDENT */
	            		, left: ( $(ob).offset().left + INDENT ) - popupWidth
	                };
				}
			}
	    }

	    $(ob).addClass('active');
	    $(ob).parent().addClass('active');

	    return {
	    	  popup: $popup
	    	, pos: pos
	    };
    }

    /**
     * Показывает переданный popup и скрывает все остальные
     * @param popup {Jquery}
     * @private
     */
    function show ( $popup, pos ) {
        $overlay.show();

        $popup.css({
              top: pos.top + INDENT_Y
            , left: pos.left - INDENT_X
        }).show();

        $popup.addClass('active');
    }

    /**
     * Скрывает переданный popup и скрывает все остальные
     * @private
     */
    function hide (e) {
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