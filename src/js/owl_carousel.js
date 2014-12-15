/* global jQuery */
( function( $ ){ $( function(){

	$( '.slider' ).owlCarousel( {
		singleItem: true,
		autoPlay: 6000,
		stopOnHover: true,
		navigation: true,
		pagination: false
	} );

} ); } )( jQuery );