require([
   'js-error-log'
  , 'console-log'

  , 'jquery'
  , 'Modernizr'

  , './pages/__main'
  , './widgets/__main'
], function(
    jsErrorLog
  , consoleLog

  , $
  , Modernizr

  , pages
  , widgets
) {

    jsErrorLog.init();

    $(function() {
        runPages();

        if ( widgets ) {
            widgets.init();
        }
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