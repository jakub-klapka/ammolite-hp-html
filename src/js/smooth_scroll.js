/* global jQuery */
( function( $ ){

	$( function(){

		$("a[href*=#]").bind("click", function(e) {
			// prevent default action and bubbling
			e.preventDefault();
			// set target to anchor's "href" attribute
			var target = $( this ).attr( "href" );
			// scroll to each target
			$( target ).velocity( "scroll", {
				duration: 500
			} );
		});

	} );

} )( jQuery );