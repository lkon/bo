    function sort() {

    	var $ico = $( this )
    	  , top = $ico.is( '.sort-top' )
    	  , bottom = $ico.is( '.sort-bottom' )
    	  , numTd = $ico.closest( 'td' ).prevAll( 'td' ).length
    	  , $data = $topicDataTable.find( 'tr:not(:first)' ).map( function( index, el ){
    			return $( el ).find( 'td' ).eq( numTd );
    		})
    	  , dataArray = []
    	  , re
    	  , frag = document.createDocumentFragment()
    	  ;


    	$data.each( function( index, el ){
    		dataArray[ index ] = el.get( 0 );
    	});

		switch ( numTd ){
			case 0:
				break;
			case 1:
				topicSorting();
				break;
			case 2:
				dateSorting();
				break;
			case 3:
				idSorting();
				break;
		}

		function dateSorting (){
			re = /(\d{2}):(\d{2})\s(\d{2})\.(\d{2})\.(\d{4})/;

			dataArray.sort( function( a, b ){
				var date1 = re.exec( $( a ).text() )
				  , date2 = re.exec( $( b ).text() )
				  , realDate1 = new Date( parseInt( date2[5], 10 )
								,(parseInt( date2[4], 10 ) - 1 )
								,parseInt( date2[3], 10 )
								,parseInt( date2[1], 10 )
								,parseInt( date2[2], 10 ) )
				  , realDate2 = new Date( parseInt( date1[5], 10 )
								,(parseInt( date1[4], 10 ) - 1 )
								,parseInt( date1[3], 10 )
								,parseInt( date1[1], 10 )
								,parseInt( date1[2], 10 ) )
				  ;

				if ( top ){
					$ico.removeClass( 'sort-top' ).addClass( 'sort-bottom' );
					return realDate2 - realDate1;

				} else if ( bottom ){
					$ico.removeClass( 'sort-bottom' ).addClass( 'sort-top' );
					return realDate1 - realDate2;
				}
			});
		}

		function topicSorting (){
/*			re = /(?:^\n\s+)(.+)/;

			dataArray.sort( function( a, b ){
				var topic1 = a.firstChild.data.replace(re, '$1')
				  , whs1 = topic1.indexOf(' ')
				  , word1 = topic1.slice( 0, whs1 )

				  , topic2 = b.firstChild.data.replace(re, '$1')
				  , whs2 = topic2.indexOf(' ')
				  , word2 = topic2.slice( 0, whs2 )
				  ;*/

			var re = /(?:^\n\s+)(.+)/
			  , ar = []
			  ;

			  for (var index = 0; index < dataArray.length; index++) {
			  		ar[ index ] = dataArray[ index ].firstChild.data.replace(re, '$1');
			  }



			ar.sort();

			console.log(ar);

/*			dataArray.sort( function( a,b ){
				var topic1 = a.firstChild.data.replace(re, '$1')
				  , topic2 = b.firstChild.data.replace(re, '$1')
				  ;

				if ( top ){
					$ico.removeClass( 'sort-top' ).addClass( 'sort-bottom' );
					return topic2 - topic1;

				} else if ( bottom ){
					$ico.removeClass( 'sort-bottom' ).addClass( 'sort-top' );
					return topic1 - topic2;
				}
			});*/
		}

		function idSorting (){

		}

		for (var i = 0; i < dataArray.length; i++) {
			$( frag ).append( $( dataArray[ i ] ).closest( 'tr' ) );
		}

		$topicDataTable.append( frag );

		renumeration();
    }