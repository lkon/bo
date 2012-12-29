require([
	'jquery'

  , './pages/main'
], function(
    $

  , pages
) {

    $(function() {
        runPages();
    });

    function runPages() {
        if ( !pages ) {
            return;
        }

        var autorun = $( 'body' ).attr( 'data-autorun' );
        if ( !autorun ) {
          return;
        }

        autorun = autorun.split( ' ' );

        for ( var i = 0; i < autorun.length; i++ ) {
            var page = pages[ autorun[i] ];

            if (
                page &&
                page.init &&
                typeof page.init === 'function'
            ) {
                page.init();
            }
        }
    }

});