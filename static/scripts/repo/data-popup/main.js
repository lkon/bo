define([
	'jquery'

], function(
	$
) {
	var $overlay
      , $btnShow
      , $popup
      , $exit
      ;

	function init () {
		updateVars();
		bindEvets();
	}

	function updateVars () {
        $overlay = $( '.js-overlay' );
        $btnShow = $( '.js-show-popup' );
        $popup = $( '.js-popup' );
        $exit = $popup.find( '.js-exit' );
	}

	function bindEvets () {
		$btnShow.live( 'click', showPopup);

        $exit.live( 'click', hidePopup );
        $overlay.live( 'click', hidePopup );
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
			    , right: 5
			  	, left: 5
			  };
		} else {
			pos = {
				left: ( windowWidth - popupWidth )/2
			  , top: ( windowHeigth - popupHeight )/2
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
    function showPopup () {
    	var data = positioning( this )
    	  , pos = data.pos
    	  , $popup = data.$popup
    	  ;

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

    return {
		init: init
    };

});